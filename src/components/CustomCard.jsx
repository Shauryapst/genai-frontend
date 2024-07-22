import React from 'react'
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const CustomCard = ({ title, description, link }) => {
    const navigate = useNavigate();
    return (
        <Card
            title={title}
            bordered={true}
            hoverable={true}
            style={{
                width: 300,
                borderColor : 'black'
            }}
            onClick={() => {
                console.log(link);
                if (link) {
                    navigate(link);
                }
            }}
        >
            <p>{description}</p>
        </Card>
    )
}
CustomCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string
};

CustomCard.defaultProps = {
    link: ''
};

export default CustomCard