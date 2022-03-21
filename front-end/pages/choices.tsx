import React, { useState } from 'react';
import { Image , Button, Space, Modal } from 'antd';
import { List, Card, Spin } from 'antd';



const Choose = (props: any) => {
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
    const data = [
        {
            title: 'Title 1',

        },
        {
            title: 'Title 2',

        },
        {
            title: 'Title 3',
  
        },
        {
            title: 'Title 4',
            render: (res) =>
            <Space>
            <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/> 
            </Space> ,
        },
    ];

return (
    <>
        <Modal title="Choose A Map to play " visible={true} onOk={handleOk} maskClosable={false} mask={true} onCancel={handleCancel}
            footer={[
            ]}>
            <div style={{ padding: "24px", width: "100%", height: "100%" }}>
                <Space  >
                    <Spin size="large" id="example" />
                </Space>
            </div>
            <div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card title={<Button type="primary">
                                Play
                            </Button>}>
                            {/* {Item} */}
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
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

export default Choose;