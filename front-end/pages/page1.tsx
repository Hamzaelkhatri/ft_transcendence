import React, { useRef, useEffect } from 'react'

export class api {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }



}



export class ball {
    x: number;
    y: number;
    radius: number;
    speed: number;
    velocityX: number;
    velocityY: number;
    color: string;
    ctx: CanvasRenderingContext2D;

    constructor(
        ctx: CanvasRenderingContext2D, 
        x: number,
        y: number,
        radius: number,
        speed: number,
        velocityX: number,
        velocityY: number,

        color: string
    ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.velocityX  = velocityX;
        this.velocityY  = velocityY;
        this.ctx = ctx;
        this.color = color;
    }


    drawBall() {
        this.ctx.beginPath();
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y , this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
      }


}

export class padles {
    paddle_x: number;
    paddle_y: number;
    paddle_width: number;
    paddle_height: number;
    paddle_speed: number;
    ctx: CanvasRenderingContext2D;
    color: string;
    constructor(
        ctx: CanvasRenderingContext2D, 
        paddle_x: number,
        paddle_y: number,
        paddle_width: number,
        paddle_height: number,
        paddle_speed: number,
        color: string
    ) {
        this.ctx = ctx;
        this.paddle_x = paddle_x;
        this.paddle_y = paddle_y;
        this.paddle_width = paddle_width;
        this.paddle_height = paddle_height;
        this.paddle_speed = paddle_speed;
        this.color = color;
    }

    draw_padles() {
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
}


export class page_one 
{
    canvas: HTMLCanvasElement;
    ctx: any;
    _ball: ball;
    paddle_l :padles;
    paddle_r : padles;
    constructor(canvas: HTMLCanvasElement, date: any)
    {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this._ball =  new ball(this.ctx,this.canvas.width/2,this.canvas.height/2,10,2,-2,2,"white")
        this.paddle_l = new padles(this.ctx,0, this.canvas.height / 2, 10, 100, 1,"white");
        this.paddle_r = new padles(this.ctx,this.canvas.width, this.canvas.height / 2, 10, 100, 1,"white");
    }
    collisionDetection() {
        if (this._ball.y + this._ball.velocityY < this._ball.radius) {
            this._ball.velocityY *= -1;
        } else if (
            this._ball.y + this._ball.velocityY >
            this.canvas.height - this._ball.radius
        ) {
            //ball hits the bottom
            this._ball.velocityY *= -1;
        }

        // ball hits rihgt paddle
        if (this._ball.x + this._ball.velocityX + 5 > this.canvas.width - this._ball.radius - this.paddle_r.paddle_width) {
            if (
                this._ball.y > this.paddle_r.paddle_y &&
                this._ball.y < this.paddle_r.paddle_y + this.paddle_r.paddle_height + 8
            ) {
                this._ball.velocityX = -this._ball.velocityX;
            } else if (this._ball.x + this._ball.velocityX < this.canvas.width - this._ball.radius) {
                // this.paddle_r._score(1);
                this._ball.x = this.canvas.width / 2;
                this._ball.y = this.canvas.height - this.paddle_r.paddle_height;
                this._ball.velocityX = 2;
                this._ball.velocityY = -2;
                this.paddle_l.paddle_y = ((this.canvas.height - this.paddle_l.paddle_height) / 2);
                this.paddle_r.paddle_y = ((this.canvas.height - this.paddle_r.paddle_height) / 2);
            }
        }
        if (
            this._ball.x + this._ball.velocityX - 5 <
            this._ball.radius + this.paddle_l.paddle_width
        ) {
            if (
                this._ball.y > this.paddle_l.paddle_y &&
                this._ball.y < this.paddle_l.paddle_y + this.paddle_l.paddle_height + 8
            ) {
                this._ball.velocityX = -this._ball.velocityX;
            } else if (this._ball.x + this._ball.velocityX < 10 - this._ball.radius) {
                // this.paddle_l._score(1);
                this._ball.x = this.canvas.width / 2;
                this._ball.y = this.canvas.height - this.paddle_r.paddle_height;
                this._ball.velocityY = -2;
                this._ball.velocityX = -2;
                this.paddle_l.paddle_y = ((this.canvas.height - this.paddle_l.paddle_height) / 2);
                this.paddle_r.paddle_y = ((this.canvas.height - this.paddle_r.paddle_height) / 2);
            }
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle_l.draw_padles();
        this.paddle_r.draw_padles();
        this._ball.drawBall();
        // this.center_rec.draw_padle();
    }


    start() {
        // this.socket.emit('UserToServer',"init"); // push a mesage to the array
        // console.log(this.email1 + " " + this.email2);
        // if (this.email1 === window.sessionStorage.getItem("myEmail")) {
        //     this.keyhook();
        // }
        this.draw();
        this._ball.x += this._ball.velocityX;
        this._ball.y += this._ball.velocityY;
        this.collisionDetection();
        requestAnimationFrame(() => this.start());

    }
}

const _Canvas = (props: any) => {
    const canvasRef = useRef(null)
    useEffect(() => {
        new page_one(canvasRef.current as any, props.data);
    }, []);
    return (<canvas ref={canvasRef}  {...props} width={window.innerWidth} height={window.innerHeight} />);
};

export default _Canvas;