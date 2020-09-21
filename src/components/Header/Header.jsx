import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export const Header = (props) => {

    const currentLocation = (props.currentLocation === "/")
        ? "/home"
        : props.currentLocation;

    return (
        <Layout.Header>
            <Row justify="space-between">
                <Col xxl={12} xl={13}></Col>
                <Col xxl={10} xl={11}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[currentLocation]} style={{ float: 'right' }}>
                        <Menu.Item key="/home"><Link to='/home'>Página Principal</Link></Menu.Item>
                        <Menu.Item key="/profile"><Link to='/profile'>Editar Dados</Link></Menu.Item>
                        <Menu.Item icon={<LogoutOutlined />} key="/login"><Link to='/login'>Sair</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col xxl={2} xl={0}></Col>
            </Row>
        </Layout.Header>
    );
}

export default Header;