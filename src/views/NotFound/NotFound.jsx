import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Oops! Esta página não existe."
            extra={<Link to='/home'><Button type="primary">Voltar</Button></Link>}
        />
    );
}

export default NotFound;