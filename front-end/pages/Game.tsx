import Avatar from 'antd/lib/avatar/avatar';
import React, { useRef, useEffect } from 'react'
import { Socket, io } from 'socket.io-client';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import Dialog from './match_matching';
import axios from "axios";
import { useMyContext } from './ContextProvider';


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

export class Game {


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
    context:any;

    constructor(canvas: HTMLCanvasElement, data: any) {

        // console.log(data.user1['email']);
        this.canvas = canvas;
        this.canvas.style.backgroundColor = "black";
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.uppress = false;
        this.downpress = false;
        this.uppress1 = false;
        this.data = data;
        this.email1 = this.data['user1']['email'];
        this.email2 = this.data['user2']['email'];
        this.downpress1 = false;
        this.paddle_left = new player(0, 10, this.canvas.height / 2, 10, 80, 1, this.ctx, "white");
        this.paddle_right = new player(0, this.canvas.width - 20, (this.canvas.height) / 2, 10, 80, 1, this.ctx, "white");
        this.center_rec = new player(0, this.canvas.width / 2, 0, 1, this.canvas.height, 0, this.ctx, "white");
        this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 8, 6, -6, "red");
        if (this.email1 === localStorage.getItem('email') || this.email2 === localStorage.getItem('email')) {
            document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
            document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        }
        this.socket = io("http://localhost:3080");
        this.sender = "";
        this.player = 0;
        this.myId = "";
        this.context = useMyContext();


        this.paddle_left.score = 0;
        this.paddle_right.score = 0;

        this.socket.on('DataToClient', (msg) => {
            this.paddle_right.paddle_x = msg.paddle_x;
            this.paddle_right.paddle_y = msg.paddle_y;
        });

        this.socket.on('DataToClient2', (msg) => {
            this.paddle_left.paddle_x = msg.paddle_x;
            this.paddle_left.paddle_y = msg.paddle_y;
        });

        this.socket.on('BallClient', (msg) => {
            this._ball.ball_x = msg.ball_x;
            this._ball.ball_y = msg.ball_y;
            this._ball.velocity_x = msg.velocity_x;
            this._ball.velocity_y = msg.velocity_y;
            if(msg.score1 > 10 || msg.score2 > 10)
            {
                axios.get('http://localhost:3000/game/finish/' + this.data['id'] +'/'+(msg.score1 > msg.score2 ? this.data['user1']['id'] : this.data['user2']['id']))
                .then(res => {
                    console.log(res.data);
                });
                // this.context.setState(false);
            }
            this.paddle_left.score = msg.score1;
            this.paddle_right.score = msg.score2;
        });
        let img = new Image();
        img.src = "https://joeschmoe.io/api/v1/random";
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width - 70, this.canvas.height - 38, 34, 34);
        }

        let img1 = new Image();
        img1.src = "https://joeschmoe.io/api/v1/random";
        img1.onload = () => {
            this.ctx.drawImage(img1, 50, this.canvas.height - 38, 34, 34);
        }
        this.receiveMessage(data);
        this.start();
    }

    receiveMessage(data: any) {
        console.log(data);
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
    }


    keyhook() {
        // console.log(this.email1);
        // console.log(this.email2);
        if (this.email1 === localStorage.getItem('email')) {
            if (this.uppress === true) {
                this.paddle_left.paddle_y -= 4;
                if (this.paddle_left.paddle_y < 0) {
                    this.paddle_left.paddle_y = 0;
                }
                this.socket.emit('DataToServer2', this.paddle_left.ToJson()); // push a mesage to the array
            }
            if (this.downpress) {

                this.paddle_left.paddle_y += 4;
                if (this.paddle_left.paddle_y + this.paddle_left._paddle_height + 40 > this.canvas.height) {
                    this.paddle_left.paddle_y = this.canvas.height - this.paddle_left._paddle_height - 41;
                }
                this.socket.emit('DataToServer2', this.paddle_left.ToJson()); // push a mesage to the array

            }
        }
        if (this.email2 === localStorage.getItem('email')) {
            if (this.uppress1) {
                this.paddle_right.paddle_y -= 4;

                if (this.paddle_right._paddle_y < 0) {
                    this.paddle_right.paddle_y = 0;
                }
                this.socket.emit('DataToServer', this.paddle_right.ToJson()); // push a mesage to the array

            }
            if (this.downpress1) {

                this.paddle_right.paddle_y += 4;
                if (this.paddle_right._paddle_y + this.paddle_right._paddle_height + 40 > this.canvas.height) //
                {
                    this.paddle_right.paddle_y = this.canvas.height - this.paddle_right._paddle_height - 41;
                }
                this.socket.emit('DataToServer', this.paddle_right.ToJson()) // push a mesage to the array
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
                this._ball._velocity_x = 6;
                this._ball._velocity_y = -6;
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
                this._ball._velocity_y = -6;
                this._ball._velocity_x = -6;
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


    start() {

        this.keyhook();
        this.draw();
        if (this.email1 === localStorage.getItem('email')) {
            this._ball.ball_x += this._ball._velocity_x;
            this._ball.ball_y += this._ball._velocity_y;
            this.collisionDetection();
            this.socket.emit('BallServer', 
            {
                ball_x: this._ball.ball_x,
                ball_y: this._ball.ball_y,
                velocity_x: this._ball._velocity_x,
                velocity_y: this._ball._velocity_y,
                score1: this.paddle_left.score,
                score2: this.paddle_right.score,
            });
        }
        this.show_score();
        this.draw_footer(); 
        requestAnimationFrame(() => this.start());
    }
}

//user1 the One who inited you
//user2 You
const Canvas = (props: any) => {
    const [isWating, setIsWating] = useState(true);
    const [data, setData] = useState(props.data ? props.data : []);
    const canvasRef = useRef(null);
    useEffect(() => {
        const interv = setInterval(() => {
            if (data.length != 0 && isWating) {
                setIsWating(false);
                clearInterval(interv);
                console.log("data", data);
                setTimeout(() => {
                    new Game(canvasRef.current as any, data);
                }, 1000);
                    
            }
            else {
                // console.log(data.length);
                // console.log("interv");
                if (isWating) {
                    axios.get('http://localhost:3000/game/is_waiting/' + localStorage.getItem('id'))
                        .then(res => {
                            setData(res.data);
                        })
                }
            }
        }, 1000);

    }, [isWating, data]);
    return (
        <div>
            {isWating && <Dialog />}
            {!isWating && < canvas ref={canvasRef}  {...props} width={400} height={200} />}
        </div>
    );
};

export default Canvas;