import React, { useRef, useEffect } from 'react'


class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    color: any;
    Player1: Player;
    Player2: Player;
    ball: Ball;
    Right_UpPressed: boolean;
    Right_DownPressed: boolean;
    Left_UpPressed: boolean;
    Left_DownPressed: boolean;
    Pause: boolean;
    // Bar: Player;
    count: number = 0;
    dist: number = 150;
    // socket: Socket;
    // Bsocket: Socket;
    // Psocket: Socket;
    P1: string = "";
    P2: string = "";

    constructor(canvas: HTMLCanvasElement) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.color = "black";
        this.Pause = false;

        this.canvas.style.backgroundColor = this.color;
        this.Right_UpPressed = false;
        this.Right_DownPressed = false;
        this.Left_UpPressed = false;
        this.Left_DownPressed = false;
        // this.Bar = new Player(this.width / 2 - 5, this.height / 2 - 80, 10, 80, "white", this.ctx, this.canvas, 0, "paddle.png");
        this.Player1 = new Player(10, (this.canvas.height - 20) / 2, 3, 30, "white", this.ctx, this.canvas, 0, "paddle.png");
        this.Player2 = new Player(this.canvas.width - 20, (this.canvas.height - 20) / 2, 3, 30, "white", this.ctx, this.canvas, 0, "paddle.png");
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, 3, "white", this.ctx, this.canvas, this.Player1, this.Player2);
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        this.start();
    }

    ToJson() {
        return {
            "Player1": this.Player1.ToJson(),
            "Player2": this.Player2.ToJson(),
            "Ball": this.ball.ToJson(),
            // "Bar": this.Bar.ToJson(),
            // "Client": this.socket.io.engine.id,
            "Pause": this.Pause,
        }
    }


    show_score() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.Player1.Score.toString(), this.canvas.width / 2 - 50, 20);
        this.ctx.fillText(this.Player2.Score.toString(), this.canvas.width / 2 + 50, 20);
    }


    keyDownHandler(e: KeyboardEvent) {
        if ((e.key === "Up" || e.key === "ArrowUp")) {
            this.Right_UpPressed = true;
        }
        else if (e.key === "Down" || e.key === "ArrowDown") {
            this.Right_DownPressed = true;
        }

        if (e.key === "w" || e.key === "KeyW") {
            this.Left_UpPressed = true;
        }
        else if (e.key === "s" || e.key === "KeyS") {
            this.Left_DownPressed = true;
        }
        if ((e.key === "p" || e.key === "KeyP" || e.key === "P" || e.key === " " || e.key === "Space") && this.P1 === window.sessionStorage.getItem("email")) {
            this.Pause = !this.Pause;
        }
    }

    keyUpHandler(e: KeyboardEvent) {
        if (e.key === "Up" || e.key === "ArrowUp") {
            this.Right_UpPressed = false;
        }
        else if (e.key === "Down" || e.key === "ArrowDown") {
            this.Right_DownPressed = false;
        }
        if (e.key === "w" || e.key === "KeyW") {
            this.Left_UpPressed = false;
        }
        else if (e.key === "s" || e.key === "KeyS") {
            this.Left_DownPressed = false;
        }

    }

    ControleGame() {
        // console.log(window.sessionStorage.getItem("email"));
        // alert(this.P1 +" "+ this.P2);
        if (this.Left_DownPressed && this.P1 === window.sessionStorage.getItem("email")) {
            this.Player1.moveUp(1);
            // this.socket.emit('DataToServer', this.ToJson());
        }
        else if (this.Left_UpPressed && this.P1 === window.sessionStorage.getItem("email")) {
            this.Player1.moveDown(1);
            // this.socket.emit('DataToServer', this.ToJson());
        }

        if (this.Right_DownPressed && this.P2 === window.sessionStorage.getItem("email")) {
            this.Player2.moveUp(1);
            // this.socket.emit('DataToServer', this.ToJson());
        }
        else if (this.Right_UpPressed && this.P2 === window.sessionStorage.getItem("email")) {
            this.Player2.moveDown(1);
            // this.socket.emit('DataToServer', this.ToJson());
        }
    }

    start() {
        // this.writer();
        this.update();

    }

    text: string = "hello world";
    //auto write into canvas 
    writer() {
        // var ctxs = window.document.querySelector("canvas").getContext("2d"),
        //     dashLen = 220, dashOffset = dashLen, speed = 15,
        //     txt = "STROKE-ON CANVAS", x = 30, i = 0;

        // ctxs.font = "50px Comic Sans MS, cursive, TSCu_Comic, sans-serif";
        // ctxs.lineWidth = 5; ctxs.lineJoin = "round"; ctxs.globalAlpha = 2 / 3;
        // ctxs.strokeStyle = ctxs.fillStyle = "#1f2f90";

        // (function loop() {
        //     ctxs.clearRect(x, 0, 60, 150);
        //     ctxs.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
        //     dashOffset -= speed;                                         // reduce dash length
        //     ctxs.strokeText(txt[i], x, 90);                               // stroke letter

        //     if (dashOffset > 0) requestAnimationFrame(loop);             // animate
        //     else {
        //         ctxs.fillText(txt[i], x, 90);                               // fill final letter
        //         dashOffset = dashLen;                                      // prep next char
        //         x += ctxs.measureText(txt[i++]).width + ctxs.lineWidth * Math.random();
        //         ctxs.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
        //         ctxs.rotate(Math.random() * 0.005);                         // random rotation
        //         if (i < txt.length) requestAnimationFrame(loop);
        //     }
        // })();
        // setTimeout(() => {
        //     ctxs?.clearRect(0, 0, this.width, this.height);
        // this.update();
        // }, 5000);
    }



    update() {
        this.clear();
        this.draw();
        this.ball.bot(this.Player1);
        this.ball.bot(this.Player2);
        this.ball.move();
        this.ball.collision(this.Player1, this.Player2);
        requestAnimationFrame(() => this.update());

    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }



    draw() {
        this.Player1.draw();
        this.Player2.draw();
        // if(this.P1 === window.sessionStorage.getItem("email"))
        // this.Bsocket.emit('DataToServer2', this.ToJson());
        this.ball.draw();
    }

}

class Ball {
    x: number;
    y: number;
    radius: number;
    color: string;
    speed: number;
    ctx: CanvasRenderingContext2D;
    dx: number;
    dy: number;
    ballradius: number;
    canvas: HTMLCanvasElement;
    Player1: Player;
    Player2: Player;

    constructor(x: number, y: number, radius: number, color: string, ctx: CanvasRenderingContext2D, Canvas: HTMLCanvasElement, Player1: Player, Player2: Player) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = 1;
        this.ctx = ctx;;
        this.ballradius = radius;
        this.canvas = Canvas;
        this.dx = -1;
        this.dy = 1;
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.draw();
    }


    goal_sound() {
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.y + this.dy < 0) {// if ball hits the bottom
            this.dy = -this.dy;
        }
        if (this.y + this.dy > this.canvas.height) {// if ball hits the top
            this.dy = -this.dy;
        }
        if (this.y + this.dy > this.canvas.height || this.y + this.dy < 0) { // if ball hits the top or bottom
            this.dy = -this.dy;
        }

        if (this.x + this.dx < 0) {
            this.x = this.canvas.width / 2;
            this.y = this.canvas.height / 2;
            this.dx = -this.dx;
            this.Player2.score++;
            this.goal_sound();
        }
        if (this.x + this.dx > this.canvas.width)// if ball hits the right
        {
            // this.dx = -this.dx;
            this.x = this.canvas.width / 2;
            this.y = this.canvas.height / 2;
            this.dx = -this.dx;
            this.Player1.score++;
        }

    }

    collision(Player1: Player, Player2: Player) {
        if (this.x + this.dx < this.Player1.x + this.Player1.width && this.x + this.dx > this.Player1.x && this.y + this.dy > this.Player1.y && this.y + this.dy < this.Player1.y + this.Player1.height) {
            this.dx = -this.dx;
            this.speed += 1;
        }
        if (this.x + this.dx < this.Player2.x + this.Player2.width && this.x + this.dx > this.Player2.x && this.y + this.dy > this.Player2.y && this.y + this.dy < this.Player2.y + this.Player2.height) {
            this.dx = -this.dx;
            this.speed += 1;
        }
    }


    calculate_coordinates_of_ball_on_paddle(Player: Player) {
        var paddle_center = Player.y + Player.height / 2;
        var ball_center = this.y + this.radius;
        var distance = paddle_center - ball_center;
        var y_coordinate_of_ball_on_paddle = distance / Player.height * this.canvas.height;
        return y_coordinate_of_ball_on_paddle;
    }

    bar_collision(Bar: Player) 
    {
        if (this.x + this.dx < Bar.x + Bar.width && this.x + this.dx > Bar.x && this.y + this.dy > Bar.y && this.y + this.dy < Bar.y + Bar.height) {
            this.dx = -this.dx;
            this.dx += 0.5;
        }
    }

    bot(p: Player) {
        this.bar_collision(p);
        var y_coordinate_of_ball_on_paddle = this.calculate_coordinates_of_ball_on_paddle(p);
        if (y_coordinate_of_ball_on_paddle < this.y + this.radius) {
            p.moveUp(3);
        }
        else if (y_coordinate_of_ball_on_paddle > this.y + this.radius) {
            p.moveDown(3);
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.ballradius, 0, Math.PI * 2, true);
        this.ctx.fill();
        this.ctx.closePath();
    }

    ToJson() {
        return {
            "x": this.x,
            "y": this.y,
            "dx": this.dx,
            "dy": this.dy,
            "speed": this.speed,
            "radius": this.radius,
            "color": this.color,
            "ballradius": this.ballradius,
        }
    }
}

class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    ctx: CanvasRenderingContext2D;
    Canvas: HTMLCanvasElement;
    score: number;
    avatar: string;
    sound: any;


    constructor(x: number, y: number, width: number, height: number, color: string, ctx: CanvasRenderingContext2D, Canvas: HTMLCanvasElement, score: number, avatar: string) {
        this.x = x;
        this.y = y;
        this.color = color;//"rgb(" + Math.floor(Math.random() * 255 + 80) + "," + Math.floor(Math.random() * 255 + 80) + "," + 50 + Math.floor(Math.random() * 255 + 80) + ")";
        this.width = width;
        this.height = height;
        this.Canvas = Canvas;
        this.ctx = ctx;
        this.score = score;
        this.avatar = avatar;
        this.draw();
    }

    paddle_sound() {

    }

    get Height() {
        return this.height;
    }

    get Width() {
        return this.width;
    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    get Score() {
        return this.score;
    }

    set Score(value: any) {
        this.score += value;
    }

    ToJson() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            color: this.color,
            score: this.score,
            avatar: this.avatar
        }
    }


    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // var img = new Image();
        // img.src = this.avatar;
        this.ctx.closePath();
    }

    moveUp(direction: number) {
        this.y += direction;
        if (this.Canvas.height < this.y + this.height) {
            this.y = this.Canvas.height - this.height;
        }
    }

    moveDown(direction: number) {
        this.y -= direction;
        if (this.y < 0) {
            this.y = 0;
        }
    }
}

const TextCanvas = (prps: any) => {
    const canvasRef = useRef(null)
    useEffect(() => {
        var game = new Game(canvasRef.current as any);
        game.start();
    }, []);
    return <canvas id="canvas" ref={canvasRef} width={400} height='auto' />
}

export default TextCanvas
