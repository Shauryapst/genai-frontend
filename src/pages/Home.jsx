import React from 'react'
import CustomCard from '../components/CustomCard';
import { Col, Layout, Row, Typography } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const projectList = [
    {
        title: "Ask a Question",
        description: `Have a query? \n Enter your question below, and get an immediate response. \nEach question is independent, ensuring clear and concise answers without the influence of previous inquiries.`,
        link: "/askaquestion",
    },
    {
        title: "Image Content Generation",
        description: "Upload an image and get a detailed summary of its content. Our advanced AI analyzes your image and provides an accurate description of what it contains. Perfect for quick insights and understanding of visual data.",
        link: "/imgcontentgeneration",
    },
    {
        title: "Test",
        description: "Test",
        link: "/test",
    },
    {
        title: "Test",
        description: "Test",
        link: "/test",
    },
    {
        title: "Test",
        description: "Test",
        link: "/test",
    },
];

const Home = () => {
    return (
        <Layout>
            <Header style={{ paddingLeft: 24}}>
                <Title level={4} style={{color: 'white', padding: 0}}>List of All Application</Title>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <Row gutter={[40, 40]} justify="start">
                    {projectList.map((project) => (
                        <Col>
                            <CustomCard
                                title={project.title}
                                description={project.description}
                                link={project.link}
                            />
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    )
}

export default Home