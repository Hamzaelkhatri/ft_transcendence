import exp from "constants";
// import ReactDOM from "react-dom";
import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import _Canvas from "./page1";
import "antd/dist/antd.css";
// import "./index.css";
import { Card, Avatar } from "antd";
import { ArrowLeftOutlined, HeartOutlined, PauseCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, PlayCircleOutlined, ArrowRightOutlined, TrophyOutlined, DislikeOutlined, FlagOutlined, LikeOutlined, FieldNumberOutlined, EnvironmentOutlined, InfoCircleFilled } from "@ant-design/icons";
import { height } from "@mui/system";
import Canvas from "./Game";
import axios from "axios";
const { Meta } = Card;

import { Button, notification, Carousel } from 'antd';

const contentStyle = {
    height: '30%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    fontSize: '2em',
    background: 'transparent',
    margin: '10% auto',
    zIndex: '2',

};


const Next_page = () => {
    // console.log("Next page");

    /*
    {
"id": 5,
"name": "Hamza Elkhatri",
"email": "hello3@student.1337.ma",
"token": "448022e392ccddce7f5090df071789fd0472dc4b42b876b525d82f3e02ef175b",
"created_at": "2022-02-27T20:48:07.487Z",
"updated_at": "2022-02-27T20:48:07.487Z",
"deleted_at": "2022-02-27T20:48:07.487Z",
"is_online": true,
"image": "https://cdn.intra.42.fr/users/helkhatr.jpg",
"is_verified": true,
"country": "moroccan",
"level": 0,
"wins": 0,
"loses": 0,
"quit": 0
}
*/
    const [data, setData] = useState([]);
    const [oneTime, setOneTime] = useState(0);
    const [oneTime1, setOneTime1] = useState(0);
    const [GameInfo, setGameInfo] = useState([]);

    const close = () => {
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };
    const [ShowCanva, setShowCanva] = useState(false);
    const onclick = (key: string) => {
        axios.get("http://localhost:3000/game/invited/confirm/" + localStorage.getItem("id") + '/' + GameInfo['id']).then(res => {
            setShowCanva(true);
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
                <Button type="danger" size="small" onClick={() => notification.close(key)}>
                    Cancel
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
            onClose: close,
        });
    };

    useEffect(() => {
        const inter = setInterval(() => {
            if (oneTime1 == 0) {

                axios.get("http://localhost:3000/game/is_invited/" + localStorage.getItem("id"))
                    .then(res => {
                        if (res.data.length !== 0) {
                            setOneTime1(1);
                            console.log(res.data);
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
    }, []);
    axios.get("http://localhost:3000/user/random")
        .then(res => {
            if (oneTime === 0) {
                setData(res.data);
                setOneTime(1);
            }
        });

    return (
        <div>
            {ShowCanva ? <Canvas /> : null}
            {!ShowCanva && <Card
                style={{ padding: "1%", width: "20%", height: "auto", left: "10%", top: "15%", position: "absolute", zIndex: "2", borderRadius: "3%", background: "white" }}
                cover={
                    <img
                        alt="example"
                        // src={data['image']}
                        src="https://joeschmoe.io/api/v1/random"
                        style={{ width: "100%", height: "auto", borderRadius: "1%" }}
                    />
                }

                actions={[
                    <ArrowLeftOutlined key="previous" onClick={() => {
                        setOneTime(0);
                    }
                    }
                    />,
                    <PlayCircleOutlined key="play" onClick={() => {
                        // {<Canvas />}

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
                                <li>
                                    <InfoCircleFilled /> : Online
                                </li>
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

                        //add text here

                    }




                />


            </Card>
            }
            {!ShowCanva &&
                <Card
                    style={{ padding: "4%", width: '50%', height: "68%", left: "40%", top: "27%", position: "absolute", zIndex: "1", borderRadius: "3%", background: "white" }}
                // cover={
                //     <img
                //         alt="example"
                //         // src="./images/logo.png"
                //     />
                // }
                // actions={[
                //     // <EditOutlined key="edit" />,
                //     <ArrowLeftOutlined key="previous" />,
                //     <PlayCircleOutlined key="play" />,
                //     // <EllipsisOutlined key="ellipsis" />,
                //     <ArrowRightOutlined key="next" />
                // ]}
                >
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title="Card title"
                        description="This is the description"

                    />
                </Card>



            }
            {ShowCanva && <Carousel 
            beforeChange={(current) => {
                if(current === 3)
                {
                    setShowCanva(false);
                }
                // console.log(current);
            }}
            autoplay={false} >
                <div>
                    <h3 style={contentStyle}> Welcome to an  online Ping Pong Match   </h3>

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
                    <h3 style={contentStyle}>Good Luck !<HeartOutlined/>  </h3>
                    <div className="wrapper">

                        <div className="ping"> </div>
                        <div className="ping"></div>
                        <div className="ball "></div>
                    </div>

                    <div className="button" >

                    </div>
                </div>
            </Carousel >}

        </div >
    )
}

export default Next_page;