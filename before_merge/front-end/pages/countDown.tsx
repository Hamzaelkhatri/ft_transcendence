import React from "react"
import { useRef, useEffect } from "react";


export class  countdown {

    canvas: HTMLCanvasElement;
    ctx: any;

    constructor(canvas: HTMLCanvasElement, date: any) {
        this.canvas = canvas;
        // this.canvas.style.backgroundColor = "black";
        this.canvas.width = window.innerWidth ;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.ctx.fillRect(this.canvas.width/2, this.canvas.height/2, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "transparent";
        this.start();
    }
    start() {
        this.ctx.font = "50px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white";
        var counter = 5;
        var refreshIntervalId = setInterval(  () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            if (counter > 0) {
                this.ctx.fillText(counter, this.canvas.width / 2 - 10, this.canvas.height / 2 - 10);
                --counter;
            }
            else if (counter == 0) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.fillText("start", this.canvas.width / 2 - 10, this.canvas.height / 2 - 10);
                clearInterval(refreshIntervalId);
            }
        }, 1000);
        
    }

}


const Canvas = (props: any) => {
    const canvasRef = useRef(null)
    useEffect(() => {
        new countdown(canvasRef.current as any, props.data);
    }, []);
    return (<canvas ref={canvasRef}  {...props}  zIndex={"-2"}  margin={" 5% auto"}/>);
};

export default Canvas;