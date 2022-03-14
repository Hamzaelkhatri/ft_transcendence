<div>
            {ShowCanvas ? <Canvas /> : null}
            {/* {!ShowCanvas && <Card
                style={{ padding: "1%", width: "20%", height: "auto", left: "10%", top: "15%", position: "absolute", zIndex: "2", borderRadius: "3%", background: "white" }}
                cover={
                    <img
                        alt="example"
                        // src={data['image']}
                        src="https://joeschmoe.io/api/v1/random"
                        style={{ width: "100%", height: "auto", borderRadius: "1%" }}
                    />
                }
                actions={[<ArrowLeftOutlined key="previous" onClick={() => { setOneTime(0); }
                } />,
                <PlayCircleOutlined key="play" onClick={() => {
                    axios.post("http://10.12.6.12:3000/game/invite",
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
                    setOneTime(0);}} />]}> */}
            {/* <Meta
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
                        </ul>}/>
            </Card>
            }
            {!ShowCanvas &&
                <div style={{ position: "absolute", top: "15%", left: "37%", zIndex: "2" }}>
                    <MatchLive />
                </div>
            }
            {ShowCanvas && <Carousel
                beforeChange={(current) => {
                    if (current === 3) {
                        setShowCanvas(true);

                    }
                    // console.log(current);
                }}
                autoplay={false} >
                    /** this is just animation */
                {/* <div className="wrapper">

                    <div className="ping"> </div>
                    <div className="ping"></div>
                    <div className="ball "></div>
                </div>
                <div className="button" > */}
                {/* </div> */}
                // <div>
                //     <h3 style={contentStyle}> Welcome to an  online Ping Pong Match   </h3>

                // </div>
                // <div>
                //     <h3 style={contentStyle}>Rules:
                //         <li>
                //             When the game starts you can  PAUSE  it by clicking the Space key .
                //         </li>
                //         <li>
                //             The game PAUSES 10 seconds if You did not start The Game 10 seconds You Lose.
                //         </li>
                //         <li>
                //             If Quit the Game , we will wait for ypu ti joinn in 10 seconds otherwise You Lose.
                //         </li>
                //     </h3>
                // </div>
                // <div>
                //     <h3 style={contentStyle}>To Play  You gonna use 2 keys :
                //         <li>
                //             You Press  < ArrowUpOutlined /> key to Move Up.
                //         </li>
                //         <li>
                //             You Press  <ArrowDownOutlined /> key to Move Up.
                //         </li>
                //         <li> You Press  The Space Key to PAUSE or TO Continue the Game <PauseCircleOutlined /> </li>
                //     </h3>
                // </div>
                // <div>
                //     <h3 style={contentStyle}>Good Luck !<HeartOutlined />  </h3> */}
                {/* <div id="count-down">
                    <div id="count-down-1">1</div>
                    <div id="count-down-2">2</div>
                    <div id="count-down-3">3</div>
                </div> */}
                // </div>
            // </Carousel >}
        // </div >