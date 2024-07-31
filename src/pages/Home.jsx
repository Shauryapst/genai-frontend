import React from 'react'
import CustomCard from '../components/CustomCard';
import { Col, Layout, Row } from "antd";
const { Content} = Layout;
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
        title: "PDF Chat Bot",
        description: "This application allows you to interact with PDF documents in a conversational manner. Upload your PDF file and ask questions about its content. The bot will provide answers based on the text within the document.",
        link: "/pdfchatbot",
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