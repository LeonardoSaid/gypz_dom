import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../actions/modalActions';
import { Layout, Card, Row, Col, List, Button, Avatar, Space, Divider, notification, Result, Popconfirm } from 'antd';
import { Header, Footer, UndrawImage, AboutModal, RequestModal } from '../../components/index';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllUserCards, deleteCard } from '../../services/card';
import { getCurrentUser } from '../../services/user';
import moment from 'moment';

function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return -1;
        } else if (a[prop] < b[prop]) {
            return 1;
        }
        return 0;
    }
}

const StatusAvatar = (props) =>
    (props.status)
        ? <Avatar icon={<CheckOutlined />} style={{ backgroundColor: '#52c41a' }} />
        : <Avatar icon={<CloseOutlined />} style={{ backgroundColor: '#ff4d4f' }} />

export const Home = (props) => {

    const [data, setData] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchData();
        fetchUserData();
    }, []);

    const fetchData = async () => {
        try {
            const jsonResponse = await getAllUserCards(props.token);
            if (Array.isArray(jsonResponse))
                setData(jsonResponse.sort(GetSortOrder("created_at")))
        } catch (e) {
            notification.error({ message: 'Erro', description: 'Não foi possível carregar os dados, tente novamente mais tarde.' });
        }
    }

    const fetchUserData = async () => {
        try {
            const jsonResponse = await getCurrentUser(props.token);
            setUserData(jsonResponse);
        } catch (e) {
            notification.error({ message: 'Erro', description: 'Falha em carregar os dados do usuário. Tente novamente mais tarde.' });
        }
    }

    async function handleDeleteCard (id) {
        try {
            const jsonResponse = await deleteCard(props.token, id);
            if(jsonResponse.error) {
                notification.error({ message: 'Erro', description: 'Falha ao excluir cartão. Tente novamente mais tarde.' });
            } else {
                notification.success({ message: 'Sucesso', description: 'Cartão removido com sucesso!' });
            }
            fetchData();
        } catch (e) {
            notification.error({ message: 'Erro', description: 'Falha em carregar os dados do usuário. Tente novamente mais tarde.' });
        }
    }

    return (
        <Layout>
            <Header currentLocation={props.history.location.pathname} />
            <Layout.Content style={{ padding: '24px 16px' }}>
                <Card
                    style={{ width: '80%', margin: '0 auto', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                    headStyle={{ border: 0 }}
                    title="Aqui você pode gerenciar seus cartões ou solicitar outro"
                    extra={
                        <Space style={{ float: 'right' }}>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => props.showModal("request")}>Solicitar Cartão</Button>
                            <Button type="secondary" onClick={() => props.showModal("about")}>Sobre</Button>
                        </Space>
                    }
                >
                    <Row justify="center" gutter={16}>
                        <Col span={8} style={{ textAlign: 'center' }} >
                            <UndrawImage name="filler" width="60%" />
                        </Col>
                        <Col span={16}>
                            {data && data.length > 0 ?
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item
                                            actions={[
                                                <Popconfirm title="Tem certeza? Este cartão será bloqueado!" okText="Sim" cancelText="Não" onConfirm={() => handleDeleteCard(item.id)}>
                                                    <Button danger>Excluir</Button>
                                                </Popconfirm>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={<StatusAvatar status={item.status} />}
                                                title={item.limit ? `Cartão aprovado com $${item.limit} de limite de crédito` : 'Cartão reprovado'}
                                                description={[
                                                    <span>{`Solicitado em ${moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}`}</span>,
                                                    <Divider type="vertical" />,
                                                    <span>{`Score: ${item.score}`}</span>
                                                ]}
                                            />
                                        </List.Item>
                                    )}
                                />
                                : <Result
                                    title="Nenhuma solicitação encontrada"
                                    subTitle="Peça um cartão pelo botão Solicitar Cartão acima!"
                                    status="info"
                                />}
                        </Col>
                    </Row>
                </Card>

                <RequestModal userData={userData} visible={props.visibleRequest} hideModal={props.hideModal} fetchData={fetchData} token={props.token} />
                <AboutModal visible={props.visibleAbout} hideModal={props.hideModal} />

            </Layout.Content>
            <Footer />
        </Layout>
    );
}

const mapStateToProps = state => ({
    token: state.user.token,
    visibleRequest: state.modal.visibleRequest,
    visibleAbout: state.modal.visibleAbout
});

const mapDispatchToProps = {
    showModal,
    hideModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);