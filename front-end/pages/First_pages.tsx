import exp from "constants";
// import ReactDOM from "react-dom";
import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import _Canvas from "./page1";
import "antd/dist/antd.css";
// import "./index.css";
import { Card, Avatar } from "antd";
import { ArrowLeftOutlined, PlayCircleOutlined, ArrowRightOutlined, TrophyOutlined, DislikeOutlined, FlagOutlined, LikeOutlined, FieldNumberOutlined, EnvironmentOutlined, InfoCircleFilled } from "@ant-design/icons";
import { height } from "@mui/system";
import Canvas from "./Game";
import axios from "axios";
const { Meta } = Card;

import { Button, notification } from 'antd';


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

    const close = () => {
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };

    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Confirm
            </Button>
        );
        notification.open({
            message: 'Notification Title',
            description:
                'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
            btn,
            key,
            onClose: close,
        });
    };
    const [data, setData] = useState([]);
    const [oneTime, setOneTime] = useState(0);
    const [oneTime1, setOneTime1] = useState(0);

    // const result = () => {
    // if (data.length === 0) {
    // fetch only one time



    // const res = fetch("http://localhost:3000/user/random",
    //     {
    //         method: "GET"
    //     }).then(res => res.json())
    //     .then(res => {
    //         // console.log(data.length);
    //         if (oneTime === 0)
    //         {
    //             setData(res);
    //             // console.log(data);
    //             // data.forEach(element => {
    //             //     console.log(element)
    //             // });
    //             console.log(data['id']);
    //             setOneTime(1);
    //         }
    //     });

    useEffect(() => {
    axios.get("http://localhost:3000/game/is_invited/" + localStorage.getItem("id"))
        .then(res => {
            if (res.data.length !== 0) {
                openNotification();
                setOneTime1(1);
            }
        });
    }, []);
    axios.get("http://localhost:3000/user/random")
        .then(res => {
            if (oneTime === 0) {
                setData(res.data);
                setOneTime(1);
            }
        });

    return (
        <>
            <Card
                style={{ padding: "1%", width: "20%", height: "auto", left: "10%", top: "27%", position: "absolute", zIndex: "2", borderRadius: "3%", background: "white" }}
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
        </>
    )
}

export default Next_page;