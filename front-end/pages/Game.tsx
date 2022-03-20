import Avatar from 'antd/lib/avatar/avatar';
import React, { useRef, useEffect, useContext } from 'react'
import { Socket, io } from 'socket.io-client';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import Dialog from './match_matching';
import axios from "axios";
import { useMyContext } from './ContextProvider';
import { Result } from 'antd';

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
    color: string;
    constructor(
        ctx: CanvasRenderingContext2D,
        ball_x: number,
        ball_y: number,
        ball_radius: number,
        velocity_x: number,
        velocity_y: number,
        color: string
    ) {
        this.ball_x = ball_x;
        this.ball_y = ball_y;
        this.ball_radius = ball_radius;
        this.velocity_x = velocity_x;
        this.velocity_y = velocity_y;
        this.ctx = ctx;
        this.color = color;
    }

    draw_ball() {
        this.ctx.beginPath();
        this.ctx.arc(this.ball_x, this.ball_y, this.ball_radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
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



}
// const context = useMyContext();
var finished = false;
export class Game {

    gameid: number;
    canvas: HTMLCanvasElement;
    ctx: any;
    paddle_right: player;
    paddle_left: player;
    uppress: boolean;
    downpress: boolean;
    center_rec: player;
    uppress1: boolean;
    downpress1: boolean;
    _ball: ball;
    socket: Socket;
    sender: string;
    myId: string;
    player: number;
    email1: string;
    email2: string;
    data: any;
    pause: boolean;
    windos: any;

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
            this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 8, 6, -6, "red");
            if (this.email1 === localStorage.getItem('email') || this.email2 === localStorage.getItem('email')) {
                document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
                document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
                // document.addEventListener("onunload", this.onunload.bind(this), false);
                // document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
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
                    // console.log("[" + this.gameid + "]" + "DataToClient2");
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
                        axios.get('http://10.12.8.15:3000/game/finish/' + this.gameid + '/' + (msg.score1 > msg.score2 ? this.data['user1']['id'] : this.data['user2']['id']))
                            .then(res => {
                                // this.pause = true;
                            });
                    }
                }
            });

            this.socket.on('PauseClient', (msg) => {
                console.log('PauseClient', msg);
                if (msg.gameid === this.gameid) {
                    this.pause = !this.pause;
                }
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
            let time: number = 3;

            setTimeout(() => {
                this.start();
            }, 3000);
        }
    }

    draw_winner(name: string) {
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("WINNER " + name, this.canvas.width / 2 - this.ctx.measureText("WINNER " + name).width / 2, this.canvas.height / 2);

        // create rectangle
        this.ctx.beginPath();
        this.ctx.rect(this.canvas.width / 2 - 100, this.canvas.height / 2 + 100, 200, 40);
        this.ctx.fillStyle = "white";
        // add text to rectangle
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.closePath();
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("HOME", this.canvas.width / 2 - this.ctx.measureText("Play Again").width / 2, this.canvas.height / 2 + 130);

        // 
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
    }

    show_score() {
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.paddle_right._score, this.canvas.width / 2 - 100, 30);
        this.ctx.fillText(this.paddle_left.score, this.canvas.width / 2 + 100, 30);
    }

    retryButton() {

    }


    start() {

        this.draw();
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
            this.pause = true;
            // this.socket.close();

        }
        if (this.email1 === localStorage.getItem('email') || this.email2 === localStorage.getItem('email')) 
        {
            if (!document.hasFocus() && !this.pause) 
            {
                this.socket.emit('PauseServer',
                    {
                        gameid: this.gameid,
                    });
            }

        }
        this.draw_footer();
        requestAnimationFrame(() => this.start());
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
        let socket = io('http://10.12.8.15:3080');
        socket.on('ConnectClient', (res: any) => {

            {
                console.log("checked");
                if (res['is_started'] === true && res['id'] === context.ShowCanvas.gameInfo['id']) {
                    setIsWating(false);
                    new Game(canvasRef.current as HTMLCanvasElement, data, socket);
                }
            }
        });
        // if ((context.ShowCanvas.gameInfo['user1']['email'] === localStorage.getItem('email') || context.ShowCanvas.gameInfo['user2']['email'] === localStorage.getItem('email')))
        socket.emit('ConnectServer', {
            GameInfo: context.ShowCanvas.gameInfo,
            idUser: localStorage.getItem('id')
        });

    }, []);

    return (
        <div>
            {isWating && <Dialog />}
            {!isWating && < canvas id='canvas' ref={canvasRef}  {...props} width={400} height={200} />}
        </div>

    );
};

export default Canvas;