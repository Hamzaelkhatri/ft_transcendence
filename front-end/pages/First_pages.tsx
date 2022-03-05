import exp from "constants";
import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import _Canvas from "./page1";
import "antd/dist/antd.css";
import { Card, Avatar, Badge } from "antd";
import { ArrowLeftOutlined, PlayCircleOutlined, ArrowRightOutlined, DislikeOutlined, FlagOutlined, LikeOutlined, FieldNumberOutlined, EnvironmentOutlined, InfoCircleFilled } from "@ant-design/icons";
import Canvas from "./Game";
import axios from "axios";
import MatchLive from "./live_match";
import Leaderboard from "./leaderboard";

const { Meta } = Card;

import { Button, notification, Carousel } from 'antd';

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


const Next_page = () => {

    const [data, setData] = useState([]);
    const [oneTime, setOneTime] = useState(0);
    const [oneTime1, setOneTime1] = useState(0);
    const [GameInfo, setGameInfo] = useState([]);
    const close = (key: string) => {
        axios.get("http://localhost:3000/game/invited/reject/" + localStorage.getItem("id") + "/" + GameInfo['id']).then(res => {
            notification.close(key);
        });
    };
    const [ShowCanvas, setShowCanvas] = useState(false);
    const onclick = (key: string) => {
        axios.get("http://localhost:3000/game/invited/confirm/" + localStorage.getItem("id") + '/' + GameInfo['id']).then(res => {
            setShowCanvas(true);
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
            message: data.user1.name + ' invited you to play a game',
            description:
                'Do you want to play with ' + data.user1.name + '?',
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

                axios.get("http://localhost:3000/game/is_invited/" + localStorage.getItem("id"))
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.length !== 0) {
                            setOneTime1(1);
                            // console.log(res.data);
                            setGameInfo(res.data);
                            openNotification(res.data);
                            clearInterval(inter);
                        }
                    });
            }
            else {
                clearInterval(inter);
            }
        }, 1000);
    }, [GameInfo]);
    axios.get("http://localhost:3000/user/random")
        .then(res => {
            if (oneTime === 0) {
                setData(res.data);
                setOneTime(1);
            }
        });
    return (
        <div className="ant-row">
            <div className="ant-col ant-col-xs-28 ant-col-xl-24" style={{ top: "150px" }}>
                {!ShowCanvas &&
                    <Card
                        style={{ padding: "1%", width: "20%", height: "auto", left: "20%", top: "15%", position: "absolute", zIndex: "2", borderRadius: "3%", background: "white" }}
                        cover={
                            // <img
                            //     alt="example"
                            //     // src={data['image']}
                            //     src="https://joeschmoe.io/api/v1/random"
                            //     style={{ width: "100%", height: "auto", borderRadius: "1%" }}
                            // />
                            <center>
                                {/* <Badge status="success" > */}
                                {/* <Badge text="Online" color="#87d068" placement='start'> */}
                                <Badge.Ribbon text="online" style={{ backgroundColor: '#87d068' }} placement='start' />,
                                <Avatar shape="square" size={200} src="https://joeschmoe.io/api/v1/random" />
                                {/* </Badge> */}

                                {/* </Badge> */}
                            </center>
                        }
                        actions={[<ArrowLeftOutlined key="previous" onClick={() => { setOneTime(0); }
                        } />,
                        <PlayCircleOutlined key="play" onClick={() => {
                            axios.post("http://localhost:3000/game/invite",
                                {
                                    "username1": localStorage.getItem("usual_full_name"),
                                    "username2": data['name']
                                })
                                .then(res => {
                                    if (oneTime === 0) {
                                        setData(res.data);
                                        setOneTime(1);
                                    }
                                });
                        }} />,
                        <ArrowRightOutlined key="next" onClick={() => {
                            setOneTime(0);

                        }} />

                        ]}

                    >
                        <Meta
                            title={data['name']}
                            description={
                                <ul>
                                    <i id="icons">
                                        {/* <li>
                                        </li> */}
                                        <li>
                                            <EnvironmentOutlined /> :  {data['country']}
                                        </li>
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
                }
            </div>
            <div className="ant-col ant-col-xs-28 ant-col-xl-24" style={{ top: "150px"  }}>
                {!ShowCanvas &&
                    <div style={{ position: "absolute", top: "15%", left: "50%", zIndex: "2" ,width:"40%" , height:"auto"}}>
                        <MatchLive />
                    </div>
                }
            </div>
            <div className="ant-col ant-col-xs-28 ant-col-xl-24" >
                {!ShowCanvas &&
                    <div >
                        {/* <Leaderboard /> */}
                    </div>
                }
            </div>

            {/* {ShowCanvas && <Carousel
                beforeChange={(current) => {
                    if (current === 3) {
                        setShowCanvas(true);
                    }
                }}
                autoplay={false} >
                <div>
                    <h3 style={contentStyle}> Welcome to an online Ping Pong Match   </h3>

                </div>
                <div>
                    <h3 style={contentStyle}>Rules:
                        <li>
                            When the game starts you can  PAUSE  it by clicking the Space key .
                        </li>
                        <li>
                            The game PAUSES 10 seconds if You did not start The Game 10 seconds You Lose.
                        </li>
                        <li>
                            If Quit the Game , we will wait for ypu ti joinn in 10 seconds otherwise You Lose.
                        </li>
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>To Play  You gonna use 2 keys :
                        <li>
                            You Press  < ArrowUpOutlined /> key to Move Up.
                        </li>
                        <li>
                            You Press  <ArrowDownOutlined /> key to Move Up.
                        </li>
                        <li> You Press  The Space Key to PAUSE or TO Continue the Game <PauseCircleOutlined /> </li>
                    </h3>
                </div>
                <div>
                    <h3 style={contentStyle}>Good Luck !<HeartOutlined />  </h3>
                </div>
            </Carousel >} */}
            {/* {ShowCanvas && <Canvas />} */}
            {
                //make Canvas in center of the screen
                <div className="ant-col ant-col-xs-28 ant-col-xl-24" style={{ top: "20%", position: "absolute", zIndex: "2", left: "50%", transform: "translate(-50%,0)" }}>
                    {ShowCanvas && <Canvas data={GameInfo} />}
                </div>
            }
            {/* {ShowCanvas && <Canvas />} */}

        </div >
    )
}

export default Next_page;