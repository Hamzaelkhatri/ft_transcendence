<div className="ant-col { xs: 8, sm: 16, md: 24, lg: 32 }" style={{ position: "absolute", top: "15%", zIndex: "999", left: "5%", borderRadius: "10%" }}>
{!context.ShowCanvas.show &&
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
                        axios.post("http://localhost:3000/game/invite",
                            {
                                "username1": localStorage.getItem("usual_full_name"),
                                "username2": data['name']
                            })
                            .then(res => {
                                if (res.data.length !== 0) {
                                    setData(res.data);
                                    context.setShowCanvas(
                                        {
                                            show: true,
                                            gameInfo: res.data
                                        }
                                    )
                                    setOneTime(1);
                                }
                            });
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
}
</div>
<div className="ant-col { xs: 10, sm: 16, md: 24, lg: 32 }" style={{ position: "absolute", zIndex: "999", textAlign: "right" }}>
{!context.ShowCanvas.show &&
    <div style={{ width: "40%", height: "auto" }}>
        <MatchLive />
    </div>
}
</div>
{/* <div className="ant-col { xs: 10, sm: 16, md: 24, lg: 32 }" style={{ top: "-200px", zIndex: "999", left: "55%" }}>
{!context.ShowCanvas.show &&
    <div style={{ width: "80%", height: "auto" }}>
        <Leaderboard />
    </div>
}
</div> */}
{
//make Canvas in center of the screen
<div>
    {context.ShowCanvas.show && <Canvas data={context.ShowCanvas['gameInfo']} />}
</div>
}

{!context.ShowCanvas.show && <Button size="large" type="primary"
style={{ zIndex: "999" }}
onClick={() => {
    setIsModalVisible(true);
}}>
Random Match
</Button>
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
                            axios.get("http://localhost:3000/game/matchmaking/" + localStorage.getItem("id") + '/' + item.title)
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