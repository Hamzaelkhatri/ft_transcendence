import exp from "constants";
// import ReactDOM from "react-dom";
import React from "react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import _Canvas from "./page1";
import "antd/dist/antd.css";
// import "./index.css";
import { Card, Avatar } from "antd";
import { ArrowLeftOutlined, PlayCircleOutlined, ArrowRightOutlined} from "@ant-design/icons";
import { height } from "@mui/system";


const { Meta } = Card;


const Next_page = () => {
    // console.log("Next page");

    return (
        <>
            <_Canvas />

            <div id="User_card">
                {/* ReactDOM.render( */}
                <Card
                    style={{padding:"40px", width:400, left: "70%", top: "28%" , position: "absolute", zIndex: "1",  borderRadius: "10px 100px / 70px" , background: "rgba(0,0,0,0.5)"}}
                    cover={
                        <img
                            alt="example"
                            src="./images/logo.png"
                            width='10%'
                            height="10%"
                        />
                    }
                    actions={[
                        // <EditOutlined key="edit" />,
                        <ArrowLeftOutlined key="previous" />,
                        <PlayCircleOutlined key="play" />,
                        // <EllipsisOutlined key="ellipsis" />,
                        <ArrowRightOutlined key="next" />
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
                {/* document.getElementById("container") */}
            </div>
            {/* <Card sx={{ maxWidth: 310 }}>
                    <CardMedia
                        component="img"
                        height="100"
                        image="/images/profile.png"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
          */}
        </>
    )
}

export default Next_page;