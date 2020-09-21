import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { cpfMask } from '../../utils/masks';
import { validateCPF, validatePassword } from '../../utils/validators';
import { Input, Form, Button, Row, Col, Space, Typography, DatePicker, InputNumber, notification } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { register } from '../../services/user';
import moment from 'moment';

const { Title } = Typography;

export const Register = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

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
        const jsonResponse = await register(payload);
        if(jsonResponse) {
            notification.success({ message: 'Sucesso!', description: 'Você já pode fazer login na plataforma.' });
            props.history.push('/login');
        } else {
            notification.error({ message: 'Erro', description: 'Não foi possível realizar esta operação, tente novamente mais tarde.' });
        }
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
        <div className="login-wrapper">
            <a href="https://github.com/gypzlab/tech_challenge">
                <Title level={2} className="login-title"><Space><GithubOutlined />GYPZ Tech Challenge</Space></Title>
            </a>
            <Title level={4} className="login-subtitle">Registrar</Title>

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
                            name="cpf"
                            rules={[{ required: true, message: 'Digite um CPF válido', validator: validateCPF }]}
                        >
                            <Input
                                size="large"
                                placeholder="CPF"
                                maxLength={14}
                                onChange={(e) => form.setFieldsValue({ cpf: cpfMask(e.target.value) })}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" align="middle">
                    <Col span={10}>
                        <Form.Item
                            name="firstName"
                            rules={[{ required: true, message: 'Digite seu nome' }]}
                        >
                            <Input size="large" placeholder="Nome" />
                        </Form.Item>
                    </Col>
                    <Col span={9} offset={1}>
                        <Form.Item
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

                <Row justify="center" align="middle" gutter={8}>
                    <Col span={10}>
                        <Form.Item
                            name="birthDate"
                            rules={[{ required: true, message: 'Digite sua data de nascimento' }]}
                        >
                            <DatePicker size="large" placeholder="Data de Nascimento" format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="salary"
                            rules={[{ required: true, message: 'Digite sua renda' }]}
                        >
                            <InputNumber size="large" placeholder="Renda" style={{ width: '100%' }} min={0} decimalSeparator="," precision={2} step={5} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" align="middle" gutter={8}>
                    <Col span={10}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, validator: validatePassword }]}
                        >
                            <Input.Password size="large" placeholder="Senha" />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
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
                                Enviar
                                </Button>
                        </Form.Item>
                    </Col>
                    <Link to='/login'><span style={{ float: 'right', fontSize: 16 }}>Já possui uma conta?</span></Link>
                </Row>
            </Form>
        </div>
    );
}

export default Register;