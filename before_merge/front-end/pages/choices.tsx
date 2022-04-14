import React, { useState } from 'react';
import { Image, Button, Space, Modal } from 'antd';
import { List, Card, Spin } from 'antd';
import Item from 'antd/lib/list/Item';
import { useMyContext } from './ContextProvider';
import axios from 'axios';


const Choose = (props: any) => {
    let context: any = useMyContext();
    
    const [isModalVisible, setIsModalVisible] = useState(props.isModalVisible);
    console.log("HERE");
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };

    // add event for button
    const handleClick = (e: any) => {
        props.isModalVisible
    };


    //create close for component
    const handleClose = (e: any) => {
        props.onClose(e);
    };

    const data = [
        {
            title: '    Map1',
            render: (res) =>
                <Space>
                    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </Space>,

        },
        {
            title: '    Map2',
            render: (res) =>
                <Space>
                    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </Space>,

        },
        {
            title: '    Map3',
            render: (res) =>
                <Space>
                    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </Space>,

        },
        {
            title: '    Map4',
            render: (res) =>
                <Space>
                    <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                </Space>,
        },
    ];

    return (
        <>
            {isModalVisible &&  <Modal title="Choose A Map to play " visible={true} onOk={handleOk} maskClosable={true} mask={true} onCancel={handleCancel}
                footer={[
                ]}>
                <div style={{ padding: "24px", width: "100%", height: "100%" }}>
                    {/* <Space  >
                    <Spin size="large" id="example" />-> RUUYUUUUUUUULES
                </Space> */}
                </div>
                <div>
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Card title={
                                    <Space direction="vertical">
                                        {item.title}
                                        <Button type="primary" onClick={() => {
                                            axios.get("http://192.168.63.100:3000/game/matchmaking/" + localStorage.getItem("id") + '/' + item.title)
                                                .then(res => {
                                                    if (res.data.length !== 0) {
                                                        context.setShowCanvas(
                                                            {
                                                                show: true,
                                                                gameInfo: res.data
                                                            }
                                                        )
                                                    }
                                                }
                                                )


                                        }}>
                                            Play
                                        </Button>
                                    </Space>
                                }
                                >
                                    {item.render(item)}
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </Modal>
            }
        </>
    );
};

export default Choose;