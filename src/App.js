import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SimpleQnA from "./pages/SimpleQnA";
import ImageContentGeneration from "./pages/ImageContentGeneration";
import PdfChatBot from "./pages/PdfChatBot";
import { Button, Layout, Typography } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
    const location = useLocation();
    const [title, setTitle] = useState("");

    useEffect(() => {
        let sessionUUID = sessionStorage.getItem("sessionUUID");
        if (!sessionUUID) {
            sessionUUID = uuidv4();
            sessionStorage.setItem("sessionUUID", sessionUUID);
        }
        const path = location.pathname;
        switch (path) {
            case "/":
                setTitle("Home");
                break;
            case "/askaquestion":
                setTitle("Simple QnA");
                break;
            case "/imgcontentgeneration":
                setTitle("Image Content Generation");
                break;
            case "/pdfchatbot":
                setTitle("PDF Chat Bot");
                break;
            default:
                setTitle("");
        }
    }, [location]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    width: "100%",
                    justifyContent: "space-between"
                }}
            >
                <Button href="/">{<HomeOutlined />}</Button>
                <Title level={4} style={{ color: "white", padding: 0 }}>
                    {title}
                </Title>
            </Header>
            <Content style={{ padding: '0px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/askaquestion" element={<SimpleQnA />} />
                    <Route path="/imgcontentgeneration" element={<ImageContentGeneration />} />
                    <Route path="/pdfchatbot" element={<PdfChatBot/>} />
                </Routes>
            </Content>
        </Layout>
    );
};

const MainApp = () => (
    <Router>
        <App />
    </Router>
);

export default MainApp;
