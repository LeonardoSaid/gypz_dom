import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../../actions/userActions';
import { cpfMask } from '../../utils/masks';
import { validateCPF } from '../../utils/validators';
import { Input, Form, Button, Row, Col, Space, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import './Login.css';

const { Title } = Typography;

export const Login = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(props.logout, []);

    const onFinish = async (values) => {
        setLoading(true);
        const loginResponse = await props.login(values);
        if (!loginResponse)
            props.history.push('/home');
        else
            notification.error({
                message: 'Erro',
                description: 'Não foi possível autenticar com as credenciais providenciadas'
            });
        setLoading(false);
    };

    return (
        <div className="login-wrapper">
            <a href="https://github.com/gypzlab/tech_challenge">
                <Title level={2} className="login-title"><Space><GithubOutlined />GYPZ Tech Challenge</Space></Title>
            </a>
            <Title level={4} className="login-subtitle">Login</Title>

            <Form
                form={form}
                layout="vertical"
                name="login-form"
                onFinish={onFinish}
                hideRequiredMark
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item
                                name="cpf"
                                rules={[{ required: true, message: 'Digite um CPF válido', validator: validateCPF }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="CPF"
                                    prefix={<UserOutlined />}
                                    maxLength={14}
                                    onChange={(e) => form.setFieldsValue({ cpf: cpfMask(e.target.value) })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Digite a senha' }]}
                            >
                                <Input.Password size="large" placeholder="Senha" prefix={<LockOutlined />} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-submit-btn" loading={loading} size="large">
                                    Entrar
                                </Button>
                            </Form.Item>
                            <Space style={{ float: 'right', fontSize: 16 }}>
                                <span>Não é cliente?</span>
                                <Link to='/register'><span>Registrar</span></Link>
                            </Space>
                        </Col>
                    </Row>
                </Space>
            </Form>
        </div>
    );
}

export default connect(null, { login, logout })(Login);