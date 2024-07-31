import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';

const TreeRouting = () => {
    const [breadcrumbData, setBreadcrumbData] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('breadcrumbData');
        if (data) {
            setBreadcrumbData(JSON.parse(data));
        }
    }, []);

    return (
        <Breadcrumb>
            {breadcrumbData.map((item, index) => (
                <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default TreeRouting;
