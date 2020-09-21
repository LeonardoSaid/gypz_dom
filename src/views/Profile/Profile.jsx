import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { cpfMask } from '../../utils/masks';
import { validateCPF, validatePassword } from '../../utils/validators';
import { Layout, Card, Row, Col, Form, DatePicker, Input, InputNumber, Button, notification } from 'antd';
import { Header, Footer } from '../../components/index';
import { getCurrentUser, updateCurrentUser } from '../../services/user';
import moment from 'moment';

export const Profile = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const jsonResponse = await getCurrentUser(props.token);
            form.setFieldsValue({
                cpf: jsonResponse.cpf,
                firstName: jsonResponse.first_name,
                lastName: jsonResponse.last_name,
                email: jsonResponse.email,
                salary: jsonResponse.salary,
                birthDate: moment(jsonResponse.birth_date)
            })
        } catch (e) {
            notification.error({ message: 'Erro', description: 'Não foi possível realizar esta operação, tente novamente mais tarde.' });
        }
    }

    const onFinish = async (values) => {
        setLoading(true);
        const payload = {
            cpf: values.cpf,
            password: values.password,
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            salary: values.salary,
            birth_date: moment(values.birthDate).format('YYYY-MM-DD HH:mm')
        }
        const jsonResponse = await updateCurrentUser(props.token, payload);
        if (jsonResponse) {
            notification.success({ message: 'Sucesso!', description: 'Seus dados foram atualizados.' });
        } else {
            notification.error({ message: 'Erro', description: 'Não foi possível realizar esta operação, tente novamente mais tarde.' });
        }
        fetchData();
        setLoading(false);
    };

    const validatePasswordConfirm = (rule, value) => {
        const typedPassword = form.getFieldValue('password');
        if (value !== typedPassword) {
            return Promise.reject("Digite a mesma senha");
        }
        return Promise.resolve();
    };

    const validateEmailConfirm = (rule, value) => {
        const typedEmail = form.getFieldValue('email');
        if (value !== typedEmail) {
            return Promise.reject("Digite o mesmo e-mail");
        }
        return Promise.resolve();
    };

    return (
        <Layout>
            <Header currentLocation={props.history.location.pathname} />
            <Layout.Content style={{ padding: '24px 16px' }}>
                <Card style={{ width: '80%', margin: '0 auto', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                    <Row justify="center">
                        <Col span={10}>
                            <Form
                                form={form}
                                layout="vertical"
                                name="register-form"
                                onFinish={onFinish}
                                hideRequiredMark
                            >
                                <Row justify="center" align="middle">
                                    <Col span={20}>
                                        <Form.Item
                                            label="CPF"
                                            name="cpf"
                                            rules={[{ required: true, message: 'Digite um CPF válido', validator: validateCPF }]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="CPF"
                                                maxLength={14}
                                                onChange={(e) => form.setFieldsValue({ cpf: cpfMask(e.target.value) })}
                                                disabled
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="center" align="middle">
                                    <Col span={10}>
                                        <Form.Item
                                            label="Nome"
                                            name="firstName"
                                            rules={[{ required: true, message: 'Digite seu nome' }]}
                                        >
                                            <Input size="large" placeholder="Nome" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={9} offset={1}>
                                        <Form.Item
                                            label="Sobrenome"
                                            name="lastName"
                                            rules={[{ required: true, message: 'Digite seu sobrenome' }]}
                                        >
                                            <Input size="large" placeholder="Sobrenome" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="center" align="middle">
                                    <Col span={20}>
                                        <Form.Item
                                            label="E-mail"
                                            name="email"
                                            rules={[{ required: true, message: 'Digite um e-mail válido' }]}
                                        >
                                            <Input type="email" size="large" placeholder="E-mail" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="center" align="middle">
                                    <Col span={20}>
                                        <Form.Item
                                            name="confirmEmail"
                                            rules={[{ required: true, message: 'Digite o mesmo e-mail', validator: validateEmailConfirm }]}
                                        >
                                            <Input type="email" size="large" placeholder="Confirmar E-mail" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="center" align="middle">
                                    <Col span={10}>
                                        <Form.Item
                                            label="Data de Nascimento"
                                            name="birthDate"
                                            rules={[{ required: true, message: 'Digite sua data de nascimento' }]}
                                        >
                                            <DatePicker size="large" placeholder="Data de Nascimento" format="DD/MM/YYYY" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={9} offset={1}>
                                        <Form.Item 
                                            label="Renda"
                                            name="salary"
                                            rules={[{ required: true, message: 'Digite sua renda' }]}
                                        >
                                            <InputNumber size="large" placeholder="Renda" style={{ width: '100%' }} min={0} decimalSeparator="," precision={2} step={5} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="center" align="middle">
                                    <Col span={9}>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, validator: validatePassword }]}
                                        >
                                            <Input.Password size="large" placeholder="Senha" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10} offset={1}>
                                        <Form.Item
                                            name="confirmPassword"
                                            rules={[{ required: true, validator: validatePasswordConfirm }]}
                                        >
                                            <Input.Password size="large" placeholder="Confirmar Senha" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row justify="center" align="middle">
                                    <Col span={20}>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-submit-btn" loading={loading} size="large">
                                                Atualizar
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Layout.Content>
            <Footer />
        </Layout>
    );
}

const mapStateToProps = state => ({
    token: state.user.token,
});

export default connect(mapStateToProps)(Profile);