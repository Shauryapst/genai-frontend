import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Layout, message, Space, Upload } from "antd";
import apiHelper from "../helpers/api.helper";
import Markdown from "../components/Markdown";
import { v4 as uuidv4 } from 'uuid';
const { Header, Sider, Content } = Layout;
const { Dragger } = Upload;


const PdfChatBot = () => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [textResponse, setTextResponse] = useState();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [sessionUUID, setSessionUUID] = useState(sessionStorage.getItem("sessionUUID"));

    useEffect(()=>{
        if (!sessionUUID) {
            let uuidd = uuidv4();
            setSessionUUID(uuidd)
            sessionStorage.setItem("sessionUUID", uuidd);
        }
    },[])

    const handleClick = async () => {
        let config = {
            url: '/v1/ask/pdf',
            method: 'POST',
            payload: {
                question,
                'sessionId' : sessionUUID
            }
        };
        const response = await apiHelper.sendLocal(config);
        setAnswer(response.data.answer);
        setQuestion('');
    };

    const handleBeforeUpload = (file) => {
        setFileList(fileList => [...fileList, file]);
        return false;
    };
    const handleUpload = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('sessionId', sessionUUID);
        fileList.forEach((file) => {
            formData.append('pdfFiles', file);
        });

        const response = await apiHelper.sendLocal({
            url: "/v1/upload/pdf",
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            payload: formData
        });
        if (response.status && response.status === 200) {
            message.success('Files has been uploaded');
        } else {
            message.error('Error occured');
        }
        setLoading(false);
    };
    const handleRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
        message.success(`${file.name} file deleted successfully.`);
    };

    const props = {
        name: "file",
        multiple: true,
        accept: "application/pdf",
        fileList,
        beforeUpload: handleBeforeUpload,
        onRemove: handleRemove
    };

    return (
        <Flex wrap style={{ padding: 0, backgroundColor: 'transparent' }}>
            <Layout style={{ height: '100%' }}>
                <Sider width="20%" style={{
                    backgroundColor: 'transparent',
                }} >
                    <Dragger {...props} style={{ height: '100%' }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                    <Button type="primary"
                        onClick={handleUpload}
                        disabled={fileList.length === 0}
                        loading={loading}
                        style={{
                            marginTop: 16,
                        }}>UPLOAD</Button>
                </Sider>
                <Layout >

                    <Header className="pdfbot-header" style={{ backgroundColor: 'transparent', padding: '0px' }} >
                        <Space direction='vertical' size="middle" style={{ width: '100%', padding: '10px' }}>
                            <Space.Compact style={{ width: '100%' }}>
                                <Input
                                    placeholder="Ask a question"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                                <Button type="primary" onClick={handleClick}>Submit</Button>
                            </Space.Compact>
                        </Space>
                    </Header>
                    <Content >
                        <Markdown text={answer} />
                    </Content>
                </Layout>
            </Layout>
        </Flex>
    );
};


export default PdfChatBot