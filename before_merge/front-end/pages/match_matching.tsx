import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';
import { Spin } from 'antd';


const Dialog = (props: any) => {
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

    // showModal();

    return (
        <>
                <Modal title="Waiting for a match" visible={true} onOk={handleOk} maskClosable={false} mask={true} onCancel={handleCancel}
                    footer={[
                    ]}>
                    <Space >
                        <Spin size="large"></Spin>
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