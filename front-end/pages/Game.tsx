import Avatar from 'antd/lib/avatar/avatar';
import React, { useRef, useEffect, useContext } from 'react'
import { Socket, io } from 'socket.io-client';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import Dialog from './match_matching';
import axios from "axios";
import { useMyContext } from './ContextProvider';
import { Result } from 'antd';
import Choose from './choices';

export class player {
    score: number;
    paddle_x: number;
    paddle_y: number;
    paddle_width: number;
    paddle_height: number;
    paddle_speed: number;
    ctx: CanvasRenderingContext2D;
    color: string;
    constructor(
        score: number,
        paddle_x: number,
        paddle_y: number,
        paddle_width: number,
        paddle_height: number,
        paddle_speed: number,
        ctx: CanvasRenderingContext2D,
        color: string
    ) {
        this.score = score;
        this.paddle_x = paddle_x;
        this.paddle_y = paddle_y;
        this.paddle_width = paddle_width;
        this.paddle_height = paddle_height;
        this.paddle_speed = paddle_speed;
        this.ctx = ctx;
        this.color = color;
    }

    draw_padle() {
        this.ctx.beginPath();
        this.ctx.rect(
            this.paddle_x,
            this.paddle_y,
            this.paddle_width,
            this.paddle_height
        );
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    public get _paddle_x() {
        return this.paddle_x;
    }

    public get _paddle_y() {
        return this.paddle_y;
    }

    public set _Paddle_x(value: number) {
        this.paddle_x = value;
    }

    public set _Paddle_y(value: number) {
        this.paddle_y = value;
    }

    public get _paddle_height() {
        return this.paddle_height;
    }
    public set _score(value: number) {
        this.score += value;
    }

    public get _score() {
        return this.score;
    }

    Tojson() {
        return (JSON.stringify(this));
    }

    ToJson() {
        return (
            {
                "paddle_x": this.paddle_x,
                "paddle_y": this.paddle_y,
                "paddle_width": this.paddle_width,
                "paddle_height": this.paddle_height,
                "paddle_speed": this.paddle_speed,
                "ctx": this.ctx,
                "color": this.color,
            });
    }
}

export class ball {
    ball_x: number;
    ball_y: number;
    ball_radius: number;
    velocity_x: number;
    velocity_y: number;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    color: string;
    constructor(
        ctx: CanvasRenderingContext2D,
        ball_x: number,
        ball_y: number,
        ball_radius: number,
        velocity_x: number,
        velocity_y: number,
        color: string,
        canvas: HTMLCanvasElement
    ) {
        this.ball_x = ball_x;
        this.ball_y = ball_y;
        this.ball_radius = ball_radius;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.ctx = ctx;
        this.color = color;
        this.canvas = canvas;
    }

    draw_ball() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball_x, this.ball_y, this.ball_radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    calculate_coordinates_of_ball_on_paddle(Player: player) {
        var paddle_center = Player.paddle_y + Player.paddle_height / 2;
        var ball_center = this.ball_y + this.ball_radius;
        var distance = paddle_center - ball_center;
        var y_coordinate_of_ball_on_paddle = distance / Player.paddle_height * (this.canvas.height - 41);
        return y_coordinate_of_ball_on_paddle;
    }


    bar_collision(Bar: player) {
        if (this._ball_x + this.velocity_x < Bar.paddle_x + Bar.paddle_width && this._ball_x + this.velocity_x > Bar.paddle_x && this.ball_y + this.velocity_y > Bar.paddle_y && this.ball_y + this.velocity_y < Bar.paddle_y + Bar.paddle_height) {
            this.velocity_x = -this.velocity_x;
            this.velocity_x += 0.5;
        }
    }

    bot(p: player) {
        var y_coordinate_of_ball_on_paddle = this.calculate_coordinates_of_ball_on_paddle(p);
        if (y_coordinate_of_ball_on_paddle + 10 < this.ball_y + this.ball_radius) {
            p.paddle_y += 8;
        }
        else if (y_coordinate_of_ball_on_paddle > this.ball_y + this.ball_radius) {
            p.paddle_y -= 8;
        }
        if (p.paddle_y + p._paddle_height + 40 > this.canvas.height) {
            p.paddle_y = this.canvas.height - p._paddle_height - 41;
        }
        this.bar_collision(p);
    }


    public get _ball_x() {
        return this.ball_x;
    }

    public get _ball_y() {
        return this.ball_y;
    }

    public get _velocity_x() {
        return this.velocity_x;
    }

    public get _velocity_y() {
        return this.velocity_y;
    }

    public set _ball_x(value) {
        this.ball_x = value;
    }

    public set _ball_y(value) {
        this.ball_y = value;
    }

    public set _velocity_x(value) {
        this.velocity_x = value;
    }

    public set _velocity_y(value) {
        this.velocity_y = value;
    }

    public get _ball_radius() {
        return this.ball_radius;
    }
    json: string = "";

    Json() {
        this.json = '{';
        this.json += '"x": ' + this.ball_x + ',';
        this.json += '"y": ' + this.ball_y + ',';
        this.json += '"radius": ' + this.ball_radius + ',';
        this.json += '"color": "' + this.color + '",';
        this.json += '"dx": ' + this.velocity_x + ',';
        this.json += '"dy": ' + this.velocity_y + '';
        this.json += '}';
        return this.json;
    }
}
// const context = useMyContext();
var finished = false;
export class Game {

    gameid: number = 0;
    canvas: HTMLCanvasElement;
    ctx: any;
    paddle_right: player;
    paddle_left: player;
    uppress: boolean;
    downpress: boolean;
    center_rec: player;
    uppress1: boolean;
    downpress1: boolean;
    _ball: ball = null;
    socket: Socket;
    sender: string;
    myId: string;
    player: number;
    email1: string;
    email2: string;
    data: any;
    pause: boolean;
    windos: any;
    gamePlay: GPEXPORT;
    time: number;
    bar: player;

    constructor(canvas: HTMLCanvasElement, data: any, socket: Socket) {

        this.canvas = canvas;
        if (canvas != null) {
            this.canvas.style.backgroundColor = "black";
            this.canvas.width = 800;
            this.windos = window;
            this.canvas.height = 400;
            this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
            this.uppress = false;
            this.downpress = false;
            this.uppress1 = false;
            this.data = data;
            this.email1 = this.data['user1']['email'];
            this.pause = false;
            this.email2 = this.data['user2']['email'];
            this.gameid = this.data['id'];
            this.downpress1 = false;
            this.paddle_left = new player(0, 10, this.canvas.height / 2, 10, 80, 5, this.ctx, "white");
            this.paddle_right = new player(0, this.canvas.width - 20, (this.canvas.height) / 2, 10, 80, 5, this.ctx, "white");
            this.center_rec = new player(0, this.canvas.width / 2, 0, 1, this.canvas.height, 0, this.ctx, "white");

            if (this.data.map == "map3") {
                this.bar = new player(0, this.canvas.width / 2, 0, 10, 120, 0, this.ctx, "red");
            }
            this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 8, 6, -6, "red", canvas);
            if (this.email1 === localStorage.getItem('email') || this.email2 === localStorage.getItem('email')) {
                document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
                document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
                document.addEventListener('click', this.homeClick.bind(this), false);
            }
            this.socket = socket;
            this.player = 0;
            this.paddle_left.score = 0;
            this.paddle_right.score = 0;

            this.socket.on('DataToClient', (msg) => {
                if (msg.gameid === this.gameid) {
                    this.paddle_right.paddle_x = msg.paddle.paddle_x;
                    this.paddle_right.paddle_y = msg.paddle.paddle_y;
                }
            });

            this.socket.on('DataToClient2', (msg) => {
                if (msg.gameid === this.gameid) {
                    this.paddle_left.paddle_x = msg.paddle.paddle_x;
                    this.paddle_left.paddle_y = msg.paddle.paddle_y;

                }
            });

            // this.canvas

            this.socket.on('BallClient', (msg) => {
                if (msg.gameid === this.gameid) {
                    this._ball.ball_x = msg.ball_x;
                    this._ball.ball_y = msg.ball_y;
                    this._ball.velocity_x = msg.velocity_x;
                    this._ball.velocity_y = msg.velocity_y;
                    this.paddle_left.score = msg.score1;
                    this.paddle_right.score = msg.score2;
                    if ((this.paddle_left.score >= 10 || this.paddle_right.score >= 10)) {
                        axios.post('http://localhost:3000/game/finish/' + this.gameid + '/' + (msg.score1 > msg.score2 ? this.data['user1']['id'] : this.data['user2']['id']),
                            {
                                map: this.gamePlay.finish(),
                            })
                            .then(res => {
                            });
                    }
                }
            });

            this.socket.on('PauseClient', (msg) => {
                // console.log('PauseClient', msg);
                // if (msg.gameid === this.gameid) {
                //     this.pause = !this.pause;
                // }
            });
            let img = new Image();
            img.src = this.data['user2']['image'];
            img.onload = () => {
                this.ctx.drawImage(img, this.canvas.width - 70, this.canvas.height - 38, 34, 34);
            }

            let img1 = new Image();
            img1.src = this.data['user1']['image'];
            img1.onload = () => {
                this.ctx.drawImage(img1, 50, this.canvas.height - 38, 34, 34);
            }
            this.time = 0;
            this.gamePlay = new GPEXPORT(this._ball, this.paddle_left, this.paddle_right, this.time);
            this.timer();
            // console.log("GAMEPLAY",JSON.parse());
            setTimeout(() => {
                this.start();
            }, 3000);
        }
        else {
            // alert("Can't find the canvas");
        }
    }

    timer() {
        this.gamePlay.CreateJson(this.time);
        this.time++;
        if (this.paddle_left.score < 10 && this.paddle_right.score < 10) {
            setTimeout(() => {
                this.timer();
            }, 100);
        }
        // else
        //     document.body.innerHTML = 
    }

    onunload() {
        console.log("[" + this.gameid + "]" + "onunload");
    }

    receiveMessage(data: any) {
        // console.(data);
    }

    keyDownHandler(e: KeyboardEvent) {
        if (e.key === "ArrowUp" || e.key === "Up") {
            this.uppress = true;

        }
        if (e.key === "w" || e.key === "KeyW") {
            this.uppress1 = true;

        }
        if (e.key === "ArrowDown" || e.key === "Down") {
            this.downpress = true;
        }
        if (e.key === "s" || e.key === "KeyS") {
            this.downpress1 = true;
        }
    }

    keyUpHandler(e: KeyboardEvent) {
        if (e.key === "ArrowUp" || e.key === "Up") {
            this.uppress = false;

        }
        if (e.key === "w" || e.key === "KeyW") {
            this.uppress1 = false;
        }
        if (e.key === "ArrowDown" || e.key === "Down") {
            this.downpress = false;
        }
        if (e.key === "s" || e.key === "KeyS") {
            this.downpress1 = false;
        }
        if (e.key === "p" || e.key === "KeyP" || e.key === " ") {
            this.socket.emit('PauseServer',
                {
                    gameid: this.gameid,
                    // pause: this.pause,
                });
        }
    }

    keyhook() {

        if (this.email1 === localStorage.getItem('email')) {
            if (this.uppress === true) {
                this.paddle_left.paddle_y -= 4;
                if (this.paddle_left.paddle_y < 0) {
                    this.paddle_left.paddle_y = 0;
                }
                this.socket.emit('DataToServer2',
                    {
                        paddle: this.paddle_left.ToJson(),
                        gameid: this.gameid,
                    }); // push a mesage to the array
            }
            if (this.downpress) {

                this.paddle_left.paddle_y += 4;
                if (this.paddle_left.paddle_y + this.paddle_left._paddle_height + 40 > this.canvas.height) {
                    this.paddle_left.paddle_y = this.canvas.height - this.paddle_left._paddle_height - 41;
                }
                this.socket.emit('DataToServer2',
                    {
                        paddle: this.paddle_left.ToJson(),
                        gameid: this.gameid,
                    });

            }
        }
        if (this.email2 === localStorage.getItem('email')) {
            if (this.uppress1) {
                this.paddle_right.paddle_y -= 4;

                if (this.paddle_right._paddle_y < 0) {
                    this.paddle_right.paddle_y = 0;
                }
                this.socket.emit('DataToServer',
                    {
                        paddle: this.paddle_right.ToJson(),
                        gameid: this.gameid,
                    }); // push a mesage to the array

            }
            if (this.downpress1) {

                this.paddle_right.paddle_y += 4;
                if (this.paddle_right._paddle_y + this.paddle_right._paddle_height + 40 > this.canvas.height) //
                {
                    this.paddle_right.paddle_y = this.canvas.height - this.paddle_right._paddle_height - 41;
                }
                this.socket.emit('DataToServer',
                    {
                        paddle: this.paddle_right.ToJson(),
                        gameid: this.gameid,
                    }) // push a mesage to the array
            }
        }
    }

    collisionDetection() {
        if (this._ball.ball_y + this._ball._velocity_y < this._ball._ball_radius) {
            this._ball._velocity_y *= -1;
        }
        else if (
            this._ball.ball_y + this._ball._velocity_y + 40 >
            this.canvas.height - this._ball._ball_radius
        ) {
            this._ball._velocity_y *= -1;
        }

        if (this._ball.ball_x + this._ball._velocity_x + 5 > this.canvas.width - this._ball._ball_radius - this.paddle_right.paddle_width) {
            if (
                this._ball.ball_y > this.paddle_right._paddle_y &&
                this._ball.ball_y < this.paddle_right._paddle_y + this.paddle_right._paddle_height + 8
            ) {
                this._ball._velocity_x = -this._ball._velocity_x;
            } else if (this._ball.ball_x + this._ball._velocity_x < this.canvas.width - this._ball.ball_radius) {
                this.paddle_right._score = 1;
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_x = 4;
                this._ball._velocity_y = -4;
            }
        }
        if (
            this._ball.ball_x + this._ball._velocity_x - 5 <
            this._ball._ball_radius + this.paddle_left.paddle_width
        ) {
            if (
                this._ball.ball_y > this.paddle_left._paddle_y &&
                this._ball.ball_y < this.paddle_left._paddle_y + this.paddle_left._paddle_height + 8
            ) {
                this._ball._velocity_x = -this._ball._velocity_x;
            } else if (this._ball.ball_x + this._ball._velocity_x < 10 - this._ball.ball_radius) {
                this.paddle_left._score = 1;
                this._ball.ball_x = this.canvas.width / 2;
                this._ball.ball_y = this.canvas.height - this.paddle_right._paddle_height;
                this._ball._velocity_y = -4;
                this._ball._velocity_x = -4;
            }
        }
    }

    draw_footer() {
        this.ctx.beginPath();
        this.ctx.rect(0, this.canvas.height - 40, this.canvas.width, 1);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height - 40);
        this.paddle_left.draw_padle();
        this.paddle_right.draw_padle();
        this._ball.draw_ball();
        this.center_rec.draw_padle();
        if (this.data.map == "map3") {
            this.bar.draw_padle();
        }
    }

    show_score() {
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.paddle_right._score, this.canvas.width / 2 - 100, 30);
        this.ctx.fillText(this.paddle_left.score, this.canvas.width / 2 + 100, 30);
    }

    //home click

    // home(event: any) {
    //     const circle = new Path2D();
    //     // circle.arc(150, 75, 50, 0, 2 * Math.PI);
    //     // this.ctx.beginPath();
    //     // console.log("home");
    //     circle.arc(this.canvas.width / 2, this.canvas.height / 2 + 100, 50, 0, Math.PI * 2);
    //     this.ctx.fillStyle = "white";

    //     this.ctx.fill(circle);
    //     if (this.ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
    //         // change color of cercles
    //         this.ctx.fillStyle = "white";
    //         this.ctx.fill(circle);
    //         this.ctx.stroke(circle);
    //         // console.log("here");
    //     }
    //     else {
    //         this.ctx.fillStyle = 'red';
    //     }
    //     // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.ctx.fill(circle);
    //     this.ctx.fillStyle = "white";
    //     this.ctx.fillText("Home", this.canvas.width / 2 - this.ctx.measureText("Home").width / 2, this.canvas.height / 2 + 112);
    //     this.ctx.beginPath();
    // }

    draw_winner(name: string) {
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("The WINNER is " + name, this.canvas.width / 2 - this.ctx.measureText("The WINNER is " + name).width / 2, this.canvas.height / 2);
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2 + 100, 50, 0, Math.PI * 2);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Home", this.canvas.width / 2 - this.ctx.measureText("Home").width / 2, this.canvas.height / 2 + 112);
        this.pause = true;
    }


    homeClick(e: MouseEvent) {
        const circle = new Path2D();
        // circle.arc(150, 75, 50, 0, 2 * Math.PI);
        // this.ctx.beginPath();
        circle.arc(this.canvas.width / 2, this.canvas.height / 2 + 100, 50, 0, Math.PI * 2);
        this.ctx.fillStyle = "Black";

        this.ctx.fill(circle);
        if (this.ctx.isPointInPath(circle, e.offsetX, e.offsetY)) {
            this.socket.emit('GameOverServer', {
                idgame: this.data.idgame,
                idUser: localStorage.getItem('id')
            });

        }
        // else {
        // this.ctx.fillStyle = 'red';
        // }
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // this.ctx.fill(circle);
        // this.ctx.fillStyle = "white";
        // this.ctx.fillText("Home", this.canvas.width / 2 - this.ctx.measureText("Home").width / 2, this.canvas.height / 2 + 112);
        // this.ctx.beginPath();
    }


    req: any;
    miniball() {
        this.ctx.beginPath();
        // random color
        let r: number = Math.floor(Math.random() * 255);
        let g: number = Math.floor(Math.random() * 255);
        let b: number = Math.floor(Math.random() * 255);
        this.ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        // random x and y 
        let x: number = Math.floor(Math.random() * this.canvas.width);
        let y: number = Math.floor(Math.random() * this.canvas.height - 50);
        // let r:numberadius = ;
        this.ctx.arc(x, y, 1, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.ctx.closePath();
    }

    animate() {
        let i: number = 0;
        this.canvas.style.backgroundColor = "rgb(44, 44, 84)";
        while (i < 10) {
            this.miniball();
            i++;
        }
    }

    Map4() {
        this.canvas.style.backgroundColor = "#00BCCA";
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 30, 0, Math.PI * 2);
        this.ctx.strokeStyle = "white";
        this.ctx.stroke();
        this.ctx.closePath();
    }



    start() {

        this.draw();
        // if (this.data.map == "map2") {
        //     this.animate();
        // }
        // if (this.data.map == "map3") {
        //     this._ball.bot(this.bar);
        // }
        // if (this.data.map == "map4") 
        {
            // this.Map4();
        }
        // this.Map4()
        if (!this.pause) {
            this.keyhook();
            this._ball.ball_x += this._ball._velocity_x;
            this._ball.ball_y += this._ball._velocity_y;
            this.collisionDetection();
            this.show_score();
            if (this.email1 === localStorage.getItem('email')) {
                this.socket.emit('BallServer',
                    {
                        ball_x: this._ball.ball_x,
                        ball_y: this._ball.ball_y,
                        velocity_x: this._ball._velocity_x,
                        velocity_y: this._ball._velocity_y,
                        score1: this.paddle_left.score,
                        score2: this.paddle_right.score,
                        gameid: this.gameid,
                    });

            }
        }
        if (this.paddle_left.score === 10 || this.paddle_right.score === 10) {
            if (this.paddle_left.score === 10)
                this.draw_winner(this.data['user2']['name']);
            else
                this.draw_winner(this.data['user1']['name']);
            this.socket.emit('PauseServer',
                {
                    gameid: this.gameid,
                });
            // clear requestAnimationFrame
            cancelAnimationFrame(this.req);
            this.pause = true;
        }
        if (this.email1 === localStorage.getItem('email') || this.email2 === localStorage.getItem('email')) {
            if (!document.hasFocus() && !this.pause) {
                this.socket.emit('PauseServer',
                    {
                        gameid: this.gameid,
                    });
            }

        }
        this.draw_footer();
        this.req = requestAnimationFrame(() => this.start());
    }
}



class GPEXPORT {
    ball: ball;
    paddle_left: player;
    paddle_right: player;
    time: number;
    json: string;

    constructor(ball: ball, paddle_left: player, paddle_right: player, time: number) {
        this.ball = ball;
        this.paddle_left = paddle_left;
        this.paddle_right = paddle_right;
        this.time = time;
        this.json = "[";
    }

    CreateJson(time: number) {
        this.json += "{";
        this.json += '"Time":' + time + ',';
        this.json += '"Player1":';
        this.json += this.paddle_left.Tojson();
        this.json += ',';
        this.json += '"Player2":';
        this.json += this.paddle_right.Tojson();
        this.json += ',';
        this.json += '"Ball":';
        this.json += this.ball.Json();
        this.json += '},\n';
    }

    finish() {
        this.json = this.json.substring(0, this.json.length - 2);
        this.json += "]";
        return this.json;
    }
}

const Canvas = (props: any) => {
    const [data, setData] = useState(props.data ? props.data : []);
    const canvasRef = useRef(null);
    let context = useMyContext();
    // console.log(props.data);
    const [isWating, setIsWating] = useState(true);
    //  console.log(context.GameInfo);

    // console.log(window);
    // console.log(context.ShowCanvas.gameInfo);
    useEffect(() => {
        let socket = io('http://localhost:3080');
        socket.on('ConnectClient', (res: any) => {

            {
                if (res['is_started'] === true && res['id'] === context.ShowCanvas.gameInfo['id']) {
                    setIsWating(false);
                    setData(res);
                    context.ShowCanvas.gameInfo = res;
                    new Game(canvasRef.current as unknown as HTMLCanvasElement, res, socket);
                }
            }
        });
        socket.on('GameOverClient', (res: any) => {
            if (res['idUser'] === localStorage.getItem('id')) {
                setIsWating(false);
                context.setShowCanvas({
                    show: false,
                    gameInfo: {},
                });
            }
        });
        // if ((context.ShowCanvas.gameInfo['user1']['email'] === localStorage.getItem('email') || context.ShowCanvas.gameInfo['user2']['email'] === localStorage.getItem('email')))
        socket.emit('ConnectServer', {
            GameInfo: context.ShowCanvas.gameInfo,
            idUser: localStorage.getItem('id')
        });

    }, []);

    return (
        <div suppressHydrationWarning={true}>
            {isWating && <Dialog />}
            {!isWating && < canvas id='canvas' ref={canvasRef}  {...props} width={400} height={200} />}
        </div>

    );
};

export default Canvas;