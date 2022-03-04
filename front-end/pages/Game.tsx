import Avatar from 'antd/lib/avatar/avatar';
import React, { useRef, useEffect } from 'react'
import { Socket, io } from 'socket.io-client';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import  Dialog  from './match_matching';

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

    constructor(canvas: HTMLCanvasElement, date: any) {
        this.canvas = canvas;
        this.canvas.style.backgroundColor = "black";
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.uppress = false;
        this.downpress = false;
        this.uppress1 = false;
        this.email1 = "";
        // console.log(this.email1);
        this.email2 = "";
        // console.log(this.email2);
        this.downpress1 = false;
        this.paddle_left = new player(0, 10, this.canvas.height / 2, 10, 80, 1, this.ctx, "white");
        this.paddle_right = new player(0, this.canvas.width - 20, (this.canvas.height) / 2, 10, 80, 1, this.ctx, "white");
        this.center_rec = new player(0, this.canvas.width / 2, 0, 1, this.canvas.height, 0, this.ctx, "white");
        this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 8, 6, -6, "red");
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        this.socket = io("http://localhost:3080");
        // set color black to cnavas
        this.sender = "";
        this.player = 0;
        this.myId = "";


        this.socket.on('msgToClient', (msg) => {
            // if (msg.email  !== undefined) {
            // this.sender = msg.email;
            // this.sender = msg.sessionId;
            // this.myId = this.socket.id;
            // console.log(this.myId);
            // }
            // if (msg.paddle_x !== undefined) {

            this.paddle_left.paddle_x = msg.paddle_x;
            this.paddle_left.paddle_y = msg.paddle_y;
            // }
            // console.log(msg);
        });
        // this.socket.emit('msgToServer', this.paddle_left.ToJson()); // push a mesage to the array
        this.socket.on('UserToClient', (msg) => {
            // console.log(msg);
            this.email1 = msg.P1;
            this.email2 = msg.P2;
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
        this.start();

    }

    draw_countdown() {
        // this.ctx.beginPath();
        // // this.ctx.arc(this.width / 2, this.height / 2, this.width / 6, 0, Math.PI * 2);
        // // this.ctx.fillStyle = "white";
        // // this.ctx.fill();
        // // this.ctx.closePath();
        // this.ctx.font = "50px Arial";
        // this.ctx.fillStyle = "white";
        // this.ctx.fill();
        // const log = this.height;
        // const lar = this.width;
        // var context_ = this.ctx;
        // var counter = 5;
        // const refreshIntervalId = setInterval(function () {
        //         context_.clearRect(0, 0, lar, log);
        //     if (counter > 0) {
        //         context_.fillText(counter, lar / 2 - 10, log / 2 - 10);
        //         counter == counter - 1;
        //     }
        //     if (counter === 0) {
        //         context_.clearRect(0, 0, lar, log);
        //         context_.fillText("start", lar / 2 - 10, log / 2 - 10);
        //         clearInterval(refreshIntervalId);
        //     }
        // }, 1000);

    }

    receiveMessage(data: any) {
        // console.log(`receive: ${data}`);
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

        if (this.uppress === true) {

            this.paddle_left.paddle_y -= 4;

            if (this.paddle_left.paddle_y < 0) {
                this.paddle_left.paddle_y = 0;
            }

            // this.socket.emit('msgToServer', this.paddle_left.ToJson()); // push a mesage to the array
        }
        if (this.uppress1) {
            this.paddle_right.paddle_y -= 4;

            if (this.paddle_right._paddle_y < 0) {
                this.paddle_right.paddle_y = 0;
            }
        }
        if (this.downpress) {

            this.paddle_left.paddle_y += 4;
            if (this.paddle_left.paddle_y + this.paddle_left._paddle_height + 40 > this.canvas.height) {
                this.paddle_left.paddle_y = this.canvas.height - this.paddle_left._paddle_height - 41;
            }
            // this.socket.emit('msgToServer', this.paddle_left.ToJson()); // push a mesage to the array
        }
        if (this.downpress1) {

            this.paddle_right.paddle_y += 4;
            if (this.paddle_right._paddle_y + this.paddle_right._paddle_height + 40 > this.canvas.height) //
            {
                this.paddle_right.paddle_y = this.canvas.height - this.paddle_right._paddle_height - 41;
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
            //ball hits the bottom
            this._ball._velocity_y *= -1;
        }

        // ball hits rihgt paddle
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
                // this.paddle_left.paddle_y = ((this.canvas.height - this.paddle_left._paddle_height) / 2);
                // this.paddle_right.paddle_y = ((this.canvas.height - this.paddle_right._paddle_height) / 2);
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
        // draw line 
        this.ctx.beginPath();
        this.ctx.rect(0, this.canvas.height - 40, this.canvas.width, 1);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }


    draw() {
        this.draw_countdown();
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

        this.socket.emit('UserToServer', "init"); // push a mesage to the array
        this.keyhook();
        this.draw();
        this._ball.ball_x += this._ball._velocity_x;
        this._ball.ball_y += this._ball._velocity_y;
        this.collisionDetection();
        this.show_score();
        this.draw_footer();
        requestAnimationFrame(() => this.start());

    }
}


const Canvas = (props: any) => {
    const canvasRef = useRef(null)
    // console.log(props.date)
    useEffect(() => {
        new Game(canvasRef.current as any, props.data);
    }, []);
    return (
        <div>
            <Dialog />
            <canvas ref={canvasRef}  {...props} width={400} height={200} />
        </div>
    );
};

export default Canvas;