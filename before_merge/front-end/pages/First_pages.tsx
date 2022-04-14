import exp from "constants";
import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import _Canvas from "./page1";
import "antd/dist/antd.css";
import { Card, Avatar, Badge, Result, Row, Col, Space, Modal, List } from "antd";
import { ArrowLeftOutlined, PlayCircleOutlined, ArrowRightOutlined, DislikeOutlined, FlagOutlined, LikeOutlined, FieldNumberOutlined, EnvironmentOutlined, InfoCircleFilled, ArrowUpOutlined, ArrowDownOutlined, HeartOutlined, PauseCircleOutlined } from "@ant-design/icons";
import Canvas from "./Game";
import axios from "axios";
import MatchLive from "./live_match";
import Leaderboard from "./leaderboard";
import { MyProvider, useMyContext } from "./ContextProvider";
const { Meta } = Card;

import { Button, notification, Image, Comment } from 'antd';
import { Content } from "antd/lib/layout/layout";
import Choose from "./choices";
import moment from "moment";
// const DemoBox = props => <p className={`height-${props.value}`} >{props.children}</p>;


const contentStyle = {
    height: '30%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    fontSize: '2em',
    background: 'transparent',
    margin: '5%% auto',
    zIndex: '2',
};

const datas = [
    {
        title: 'Map1',
        render: (res) =>
            <Space>
                <Image src="/default.png" />
            </Space>,

    },
    {
        title: 'Map2',
        render: (res) =>
            <Space>
                <Image src="/map1.png" />
            </Space>,

    },
    {
        title: 'Map3',
        render: (res) =>
            <Space>
                <Image src="map3.png" />
            </Space>,

    },
    {
        title: 'Map4',
        render: (res) =>
            <Space>
                <Image src="map4.png" />
            </Space>,
    },
];

const Next_page = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [oneTime, setOneTime] = useState(0);
    const [oneTime1, setOneTime1] = useState(0);
    // const [GameInfo, setGameInfo] = useState([]);
    const [choosable, setChoosable] = useState(false);

    let context: any = useMyContext();

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
    };


    //create close for component
    const handleClose = (e: any) => {
    };

    const close = (key: string) => {
        axios.get("http://192.168.63.100:3000/game/invited/reject/" + localStorage.getItem("id") + "/" + context.ShowCanvas.gameInfo['id'],
        ).then(res => {
            notification.close(key);
        });
    };
    // const [ShowCanvas, setShowCanvas] = useState(false);
    const onclick = (key: string) => {
        console.log(context.ShowCanvas.gameInfo);

        axios.get("http://192.168.63.100:3000/game/invited/confirm/" + localStorage.getItem("id") + '/' + context.ShowCanvas.gameInfo['id']).then(res => {
            console.log(res.data);
            context.setShowCanvas(
                {
                    gameInfo: res.data,
                    show: true
                }
            )
            notification.close(key);
        });
    };
    const openNotification = (data: any) => {
        const key = `open${Date.now()}`;
        const btn = (
            <div>
                <Button type="primary" size="small" onClick={() => onclick(key)}>
                    Confirm
                </Button>
                <span> </span>
                <Button type="danger" size="small" onClick={() => close(key)}>
                    Reject
                </Button>
            </div>
        );
        notification.open({
            message: ' invited you to play a game',
            description:
                'Do you want to play with ge:',
            btn,
            key,
            style: {
                zIndex: 3,
            },
            duration: 100,
            // onClose: close,
        });
    };
    useEffect(() => {
        const inter = setInterval(() => {
            if (oneTime1 == 0) {

                axios.get("http://192.168.63.100:3000/game/is_invited/" + localStorage.getItem("id")

                )
                    .then(res => {
                        if (res.data['id'] !== undefined) {
                            setOneTime1(1);
                            context.setShowCanvas(
                                {
                                    show: false,
                                    gameInfo: res.data
                                }
                            );
                            console.log('here', context.ShowCanvas.gameInfo);
                            context.ShowCanvas.gameInfo = res.data;
                            openNotification(res.data);
                            clearInterval(inter);
                        }
                    });
            }
            else {
                clearInterval(inter);
            }
        }, 1000);
    }, [context.ShowCanvas.gameInfo]);
    axios.get("http://192.168.63.100:3000/user/random")
        .then(res => {
            if (oneTime === 0) {
                setData(res.data);
                setOneTime(1);

            }
        });
    return (
        <Content style={{ padding: '3%' }}>
            <div>
                {context.ShowCanvas.show && <Canvas data={context.ShowCanvas['gameInfo']} />}
            </div>
            {!context.ShowCanvas.show &&
                <Row justify="center" align="top" gutter={[48, 32]}>
                    <Col span={18} push={6} style={{ background: 'white' }} >
                        {/* <div className="ant-col { xs: 10, sm: 16, md: 24, lg: 32 }"> */}
                        {!context.ShowCanvas.show &&
                            <div style={{ width: "auto", height: "auto" }}>
                                <MatchLive />
                            </div>
                        }
                        {/* </div> */}
                    </Col>
                    <Col span={6} pull={18} style={{ background: 'transparent' }}>
                        <Card
                            style={{ width: "auto", height: "auto" }}
                            cover={
                                <center>
                                    <Badge.Ribbon text="online" style={{ backgroundColor: '#87d068', width: "auto", height: "auto" }} placement='start' />
                                    <Avatar shape="square" style={{ width: "auto", height: "auto", borderRadius: "20px" }} src="https://joeschmoe.io/api/v1/random" />
                                </center>
                            }
                            actions={
                                [
                                    <ArrowLeftOutlined key="previous" onClick={() => { setOneTime(0); }} />,
                                    <PlayCircleOutlined
                                        key="play" onClick={() => {
                                            
                                        }} />,
                                    <ArrowRightOutlined key="next" onClick={() => { setOneTime(0) }} />]}
                        >
                            <Meta
                                title={data['name']}
                                description={
                                    <ul>
                                        <i id="icons" style={{ width: "auto", height: "auto", margin: "auto", borderRadius: "20px" }}>
                                            <li>
                                                <FieldNumberOutlined /> : Level {data['level']}
                                            </li>
                                            <li>
                                                <LikeOutlined /> : wins {data['wins']} Matchs
                                            </li>

                                            <li>
                                                <DislikeOutlined /> : lost {data['loses']} Matchs
                                            </li>
                                            <li>
                                                <FlagOutlined /> : Quit {data['quit']} Match
                                            </li>

                                        </i>


                                    </ul>
                                }
                            />
                        </Card>
                    </Col>

                </Row>
            }
            {!context.ShowCanvas.show &&
                <Row justify="center" align="top" gutter={[48, 32]}>

                    <Col span={18} push={6} style={{ background: 'transparent' }}>

                        <div style={{ background: 'white' }}>
                            {!context.ShowCanvas.show &&
                                <div style={{ width: "auto", height: "auto" }}>
                                    <Leaderboard />
                                </div>
                            }
                        </div>
                    </Col>
                    <Col span={6} pull={18} style={{ background: 'transparent' }} >
                        {!context.ShowCanvas.show && <Button size="large" type="primary"
                            style={{ width: "100%", height: "auto", zIndex: "999" }}
                            onClick={() => {
                                setIsModalVisible(true);
                            }}>
                            Random Match
                        </Button>
                        }

                    </Col>
                </Row>
            }
            {isModalVisible && <Modal title="Choose A Map To Play" visible={true} onOk={handleOk} maskClosable={true} mask={true} onCancel={handleCancel} style={{ top: "10%", width: "100%", height: "100%" }}
                footer={[
                ]}>
                <div style={{ padding: "24px", width: "100%", height: "100%" }}>
                    <Space>
                        <Comment content={
                            <div style={{ textAlign: "center", fontSize: "25px", fontFamily: "Ro" }} >
                                <h3 >
                                    Rules:
                                </h3>
                                <li>You Press [< ArrowUpOutlined /> or W] key to Move Up  </li>
                                <li>You Press [<ArrowDownOutlined />  or S] key to Move Down </li>
                                <li>You Press [P] key to Pause the Game</li>
                                <li>You can get back to play just click [P] </li>
                                <li>If you Quit the Game , it will Pause </li>
                                <li>Good Luck <HeartOutlined /> </li>
                            </div>
                        }
                        />
                    </Space>
                </div>
                <div>
                    <List
                        grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
                        dataSource={datas}
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
                                                    setIsModalVisible(false);
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

        </Content >
    )
}



export default Next_page;