import React from 'react';
import { Modal, Row, Col, Typography } from 'antd';
import { UndrawImage } from '../index';

const { Title, Paragraph } = Typography;

export const AboutModal = (props) => {

    const handleCancel = () => {
        props.hideModal("about");
    }
    return (
        <Modal
            visible={props.visible}
            width={window.innerWidth > 1366 ? "55%" : "75%"}
            onCancel={handleCancel}
            footer={null}
        >
            <Row>
                <Col span={14}>
                    <Typography>
                        <Title level={3}>Como funciona a análise de crédito?</Title>
                        <Paragraph>
                            Com os dados que você colocou ao cadastrar em nosso sistema, coletamos várias outras informações disponíveis no mercado que
                            nos ajudam a entender seu perfil de consumo. Com esses dados, nosso sistema gera automaticamente uma pontuação interna e determina
                            se você está elegível para nosso cartão de crédito no momento.
                            </Paragraph>
                        <Paragraph>
                            Estamos sempre evoluindo nossos estudos de consumo e critérios de aprovação. Isso quer dizer que, daqui a um tempo, sua análise pode mudar.
                            Por isso, recomendamos que você faça outro pedido se não conseguir o cartão de primeira.
                            </Paragraph>
                    </Typography>
                </Col>
                <Col span={10} style={{ textAlign: 'center' }}>
                    <UndrawImage name="info" width="75%" />
                </Col>
            </Row>
        </Modal>
    );
}

export default AboutModal;