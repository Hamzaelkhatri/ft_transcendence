import React, { useRef, useEffect } from 'react'

// export class ball {
//     ctx: CanvasRenderingContext2D;
//     x: number;
//     y: number;
//     radius: number;
//     velocityX: number;
//     velocityY: number;
//     color: string;

//     constructor(
//         ctx: CanvasRenderingContext2D, 
//         x: number,
//         y: number,
//         radius: number,
//         velocityX: number,
//         velocityY: number,
//         color: string
//     ) {
//         this.ctx = ctx;
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//         this.velocityX  = velocityX;
//         this.velocityY  = velocityY;
//         this.color = color;
//     }


//     drawBall() {
//         this.ctx.beginPath();
//         this.ctx.beginPath();
//         this.ctx.arc(this.x,this.y , this.radius, 0, Math.PI * 2);
//         this.ctx.fillStyle = this.color;
//         this.ctx.fill();
//         this.ctx.closePath();
//       }


// }

// export default class  back_game
// {

//     canvas: HTMLCanvasElement;
//     ctx: any;
//     _ball:ball;

//     constructor(canvas: HTMLCanvasElement,data :any)
//     {
//         this.canvas =   canvas;
//         this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
//         this._ball = new ball(this.ctx, this.canvas.width / 2, this.canvas.height / 2, 8, 2,-2, "red");
//     }
    

//     ball 


    


// }
export default function ButtoN()
{
<div className="board">
    <style jsx>{`
        .board {
            position: absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            width:250px;
        `}</style>
  <div className="left">
  </div>
  <div className="right">
  </div>
  <div className="ball">
  </div>
  <div className="ballhit">
  </div>
</div>
    
}