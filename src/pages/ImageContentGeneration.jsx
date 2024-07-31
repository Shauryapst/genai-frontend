import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Input, message, Space, Upload } from "antd";
import apiHelper from "../helpers/api.helper";
import Markdown from "../components/Markdown";
const { Dragger } = Upload;

const ImageContentGeneration = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [fileList, setFileList] = useState([]);
    const [imgFile, setImgFile] = useState();
    const [textResponse, setTextResponse] = useState();
    const [question, setQuestion] = useState();

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const props = {
        name: "file",
        multiple: false,
        accept: "image/png",
        fileList,
    };
    const handleChange = (info) => {
        if (info.fileList.length > 0) {
            setImgFile(info.fileList[0].originFileObj);
            getBase64(info.fileList[0].originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                message.success(`${info.file.name} file selected successfully.`);
            });
        }
    };
    const handleBeforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        setLoading(true);
        setFileList([file]);
        return false;
    };
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('question', question);
        formData.append('image', imgFile);
        const response = await apiHelper.sendLocal({
            url: "/v1/upload/image",
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            payload: formData
        });
        if (response.status && response.status === 200) {
            console.log(response);
            setTextResponse(response.data.answer);
        } else {
            message.error('Error occured');
        }
        setLoading(false);
    };
    const handleRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setImageUrl('')
        setFileList(newFileList);
        setImgFile()
        message.success(`${file.name} file deleted successfully.`);
    };
    return (
        <>
            <Flex vertical={true} gap='middle' justify='center' align="center">
                <Dragger
                    {...props}
                    fileList={fileList}
                    beforeUpload={handleBeforeUpload}
                    onChange={handleChange}
                    onRemove={handleRemove}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                {imageUrl && <Image width='50%' height='50%' src={imageUrl} />}
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={loading}
                    style={{
                        marginTop: 16,
                    }}
                >
                    {loading ? "Uploading" : "Generate Content"}
                </Button>
                
                <Space direction='vertical' size="middle" style={{ width: '100%', padding: '10px' }}>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            placeholder="Ask a question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </Space.Compact>
                </Space>
                <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #e8e8e8' }}>
                    <Markdown text={textResponse} />
                </div>

            </Flex>

        </>
    );
};
export default ImageContentGeneration;
