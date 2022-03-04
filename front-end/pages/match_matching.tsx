import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import { Spin } from 'antd';


const Dialog = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Waiting for a match" visible={isModalVisible} onOk={handleOk} maskClosable={false} mask={true} onCancel={handleCancel}
                footer={[]}
            >
                <Space >
                <Spin size="large"></Spin>
                Waiting for a match
            </Space>
            {/* <Space>        
                <div>
                    <div className="wrapper">

                        <div className="ping"> </div>
                        <div className="ping"></div>
                        <div className="ball "></div>
                    </div>

                    <div className="button" >

                    </div>
                </div>
            </Space> */}
        </Modal>
        </>
    );
};

export default Dialog;