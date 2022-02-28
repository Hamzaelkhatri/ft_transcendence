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
import { Axios } from "axios";
import Canvas from "./Game";
const { Meta } = Card;


const Next_page = () => {
    // console.log("Next page");

    return (
        <>
            <Card

                style={{ padding: "1%", width: "20%", height: "auto", left: "10%", top: "27%", position: "absolute", zIndex: "2", borderRadius: "3%", background: "white" }}
                cover={
                    <img
                        alt="example"
                        src="https://joeschmoe.io/api/v1/random"
                        style={{ width: "100%", height: "auto", borderRadius: "1%" }}
                    />
                }

                actions={[
                    <ArrowLeftOutlined key="previous" onClick={() => {
                        // Axios.get("http://10.12.3.14:3000/user/").then((res) => {
                        // }
                    }
                    }
                    />,
                    <PlayCircleOutlined key="play" onClick={() => {
                        // {<Canvas />}
                    }} />,
                    <ArrowRightOutlined key="next" onClick={() => {

                    }} />

                ]}

            >
                <Meta
                    title="User Name"
                    description={
                        <ul>
                            <i id="icons">
                                <li>
                                    <InfoCircleFilled /> : Online

                                </li>
                                <li>
                                    <EnvironmentOutlined /> :  Morocco
                                </li>
                                <li>
                                    <FieldNumberOutlined /> : Level 2
                                </li>
                                <li>
                                    <LikeOutlined /> : wins 10 Matchs
                                </li>

                                <li>
                                    <DislikeOutlined /> : lost 5 Matchs
                                </li>
                                <li>
                                    <FlagOutlined /> : Quit 1 Match
                                </li>
{/* 
                                <li>
                                    <TrophyOutlined /> :Rank 12 world wide
                                </li> */}

                            </i>


                        </ul>

                        //add text here

                    }




                />


            </Card>
            <Card
                style={{ padding: "4%", width: 1500, height: 1000, left: "40%", top: "20%", position: "absolute", zIndex: "1", borderRadius: "3%", background: "white" }}
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