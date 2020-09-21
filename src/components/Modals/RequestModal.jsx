import React from 'react';
import { Modal, Button, Row, Col, Descriptions, Result, notification } from 'antd';
import { UndrawImage } from '../index';
import { createCard } from '../../services/card';
import moment from 'moment';

const initialState = {
    loading: false,
    current: 1,
    title: 'Antes de prosseguir, por favor confira se seus dados estão ok'
};

class RequestModal extends React.Component {

    state = initialState;

    handleCardRequest = async () => {
        try {
            this.setState({ loading: true });
            const jsonResponse = await createCard(this.props.token);
            if (jsonResponse.hasOwnProperty('status')) {
                if (jsonResponse.status)
                    this.setState({ current: 2, loading: false, title: null });
                else
                    this.setState({ current: 3, loading: false, title: null });
            }
            this.setState({ loading: false });
            this.props.fetchData();
        } catch (e) {
            notification.error({ message: 'Erro', description: 'Não foi possível realizar esta operação, tente novamente mais tarde.' });
        }
    }

    handleCancel = () => {
        this.props.hideModal("request");
        this.setState({ ...initialState });
    }

    render() {
        return (
            <Modal
                title={this.state.title}
                visible={this.props.visible}
                width={window.innerWidth > 1366 ? "55%" : "75%"}
                onCancel={this.handleCancel}
                footer={(this.state.current === 1) ? <Button type="primary" loading={this.state.loading} onClick={this.handleCardRequest}>Solicitar Cartão</Button> : null}
            >
                {
                    (this.state.current === 1)
                        ?
                        <Row>
                            <Col span={14}>
                                {
                                    (this.props.userData) &&
                                    <Descriptions bordered size="small" column={4}>
                                        <Descriptions.Item label="CPF" span={4}>{this.props.userData.cpf}</Descriptions.Item>
                                        <Descriptions.Item label="Nome" span={2}>{this.props.userData.first_name}</Descriptions.Item>
                                        <Descriptions.Item label="Sobrenome" span={2}>{this.props.userData.last_name}</Descriptions.Item>
                                        <Descriptions.Item label="E-mail" span={4}>{this.props.userData.email}</Descriptions.Item>
                                        <Descriptions.Item label="Data de Nascimento" span={2}>{moment(this.props.userData.birth_date).format('DD/MM/YYYY')}</Descriptions.Item>
                                        <Descriptions.Item label="Renda" span={2}>{`$${this.props.userData.salary}`}</Descriptions.Item>
                                    </Descriptions>
                                }
                            </Col>
                            <Col span={10} style={{ textAlign: 'center' }}>
                                <UndrawImage name="request" width="65%" />
                            </Col>
                        </Row>
                        : (this.state.current === 2)
                            ? <Result
                                title="Sucesso"
                                subTitle="Seu cartão de crédito foi aprovado e você já pode conferir os detalhes na página principal."
                                icon={<UndrawImage name="confirmation" width="30%" />}
                            />
                            : <Result
                                title="Negado"
                                subTitle="Infelizmente não podemos aprovar seu cartão de crédito no momento."
                                icon={<UndrawImage name="cancel" width="30%" />}
                            />
                }
            </Modal>
        );
    }
}

export default RequestModal;