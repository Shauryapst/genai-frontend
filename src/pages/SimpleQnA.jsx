import { Input, Button, Space, Row, Col } from 'antd';
import React, { useState } from 'react';
import apiHelper from '../helpers/api.helper';
import ReactMarkdown from 'react-markdown'

const SimpleQnA = () => {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState([]);

    const handleClick = async () => {
 

        let config = {
            url: '/v1/ask',
            method: 'POST',
            payload: {
                question
            }
        };

        const response = await apiHelper.sendLocal(config);
        setConversation(prevConversation => [{ isAnswer: false, text: question }, { isAnswer: true, text: response.data.answer }, ...prevConversation ]);
        setQuestion('');
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #e8e8e8' }}>
                <Row gutter={[16, 16]}>
                    {conversation.map((entry, index) => (
                        <Col
                            key={index}
                            span={24}
                            style={{
                                border: '1px solid #e8e8e8',
                                padding: '10px',
                                backgroundColor: entry.isAnswer ? '#f9f9f9' : '#e6f7ff',
                                whiteSpace: 'pre-wrap' // This will respect newlines and other whitespace characters
                            }}
                        >
                            <p>{entry.isAnswer ? 'Answer: ' : 'Question: '}</p>
                            <ReactMarkdown>{entry.text}</ReactMarkdown>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default SimpleQnA;
