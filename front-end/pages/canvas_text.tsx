import type { AppProps } from 'next/app'
// import '../styles/Game.css';
import Canvas from './Game'
import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useEffect } from 'react';

const  textcanvas  =(prps: any) => {
    const ISSERVER = typeof window === 'undefined'
    if (!ISSERVER) {
        let ctx = window.document.querySelector("canvas").getContext("2d") as CanvasRenderingContext2D,
            dashLen = 220, dashOffset = dashLen, speed = 5,
            txt = "STROKE-ON CANVAS", x = 30, i = 0;

        ctx.font = "50px Comic Sans MS, cursive, TSCu_Comic, sans-serif";
        ctx.lineWidth = 5; ctx.lineJoin = "round"; ctx.globalAlpha = 2 / 3;
        ctx.strokeStyle = ctx.fillStyle = "#1f2f90";

        (function loop() {
            ctx.clearRect(x, 0, 60, 150);
            ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
            dashOffset -= speed;                                         // reduce dash length
            ctx.strokeText(txt[i], x, 90);                               // stroke letter

            if (dashOffset > 0) requestAnimationFrame(loop);             // animate
            else {
                ctx.fillText(txt[i], x, 90);                               // fill final letter
                dashOffset = dashLen;                                      // prep next char
                x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
                ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
                ctx.rotate(Math.random() * 0.005);                         // random rotation
                if (i < txt.length) requestAnimationFrame(loop);
            }
        })();
    }
    return (
        <canvas id="canvas" width="800" height="600">
            <div className="txtStyle">STROKE-ON CANVAS</div>
        </canvas>
    );
}

export default textcanvas
