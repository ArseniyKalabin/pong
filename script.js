//'use strict';
(function(){
    document.getElementById("pleaseStop").onclick = function() {
        cancelAnimationFrame(myReq);
    }

    var cvs = document.getElementById("pong"),
        ctx = cvs.getContext("2d"),
        minSpeed = 20, 
        maxSpeed = 30,
        ball = {
            posX: cvs.width/2,
            posY: cvs.height - 50,
            radius: 10,
            dx: 30,
            dy: -30
        };

    function touchBorder(){
        if(ball.posX+ball.radius!=cvs.width && ball.posX-ball.radius!=0){
            if(ball.dx>0 && ball.posX+ball.radius+ball.dx>cvs.width){
                ball.dy=ball.dy*(cvs.width-ball.posX-ball.radius)/ball.dx;
                ball.dx=cvs.width-ball.posX-ball.radius;
            }        
            if(ball.dx<0 && ball.posX-ball.radius+ball.dx<0){
                ball.dy=ball.dy*(ball.radius-ball.posX)/ball.dx;
                ball.dx=ball.radius-ball.posX;
            }
        }
        if(ball.posY+ball.radius!=cvs.height && ball.posY-ball.radius!=0){
            if(ball.dy>0 && ball.posY+ball.radius+ball.dy>cvs.height){
                ball.dx=ball.dx*(cvs.height-ball.posY-ball.radius)/ball.dy;
                ball.dy=cvs.height-ball.posY-ball.radius;
            }        
            if(ball.dy<0 && ball.posY-ball.radius+ball.dy<0){
                ball.dx=ball.dx*(ball.radius-ball.posY)/ball.dy;
                ball.dy=ball.radius-ball.posY;
            }
        }  
    }

    function move(){
        // console.log("dx: ", ball.dx, "dy: ", ball.dy);
        ball.posX+=ball.dx;
        ball.posY+=ball.dy;
        if(ball.posX<=ball.radius || ball.posX>=cvs.width-ball.radius){
            randomizeOffset("x");
        }
        if(ball.posY<=ball.radius || ball.posY>=cvs.height-ball.radius){
            randomizeOffset("y");
        }
    }

    function randomizeOffset(coordinate){
        var changerX=1, changerY=1;
        if(coordinate=="x"){
            changerX=-1;
        }
        if(coordinate=="y"){
            changerY=-1;
        }

        ball.dx = changerX*Math.sign(ball.dx)*(Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed);
        ball.dy = changerY*Math.sign(ball.dy)*(Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed);
    }


    function update(){
        touchBorder();
        move();
    }

    function draw(){
        // ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.beginPath();
        ctx.arc(ball.posX, ball.posY, ball.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
    }


    function timestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    var fps = 60,
        step = 1/fps,
        dt = 0, 
        now,
        last = timestamp();


    function mainLoop(){
        now = timestamp();
        dt = dt + Math.min(1, (now - last) / 1000);
        console.log(step,'---', dt);
        while(dt > step) {
          dt = dt - step;
          update();
        }
        draw();
        last = now;
        myReq = requestAnimationFrame(mainLoop);
    }
    
    draw();
    mainLoop();

}());