const score=document.querySelector(".score");
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector(".gameArea");
const button1=document.querySelector(".button1");
const button2=document.querySelector(".button2");
const button3=document.querySelector(".button3");
const button4=document.querySelector(".button4");

let player={
    speed:5,
    score:0
};
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
};
startScreen.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);
button1.addEventListener("touchstart",pressOn1);
button1.addEventListener("touchend",pressOff1);
button2.addEventListener("touchstart",pressOn2);
button2.addEventListener("touchend",pressOff2);
button3.addEventListener("touchstart",pressOn3);
button3.addEventListener("touchend",pressOff3);
button4.addEventListener("touchstart",pressOn4);
button4.addEventListener("touchend",pressOff4);

function moveLines(){
    let lines=document.querySelectorAll(".line");
    lines.forEach(function(item){
        if (item.y>=1500){
            item.y-=1500;
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}

function isCollode(a,b){
    let aRect=a.getBoundingClientRect();
    let bRect=b.getBoundingClientRect();
    return!(
        (aRect.bottom<bRect.top) ||
        (aRect.top>bRect.bottom) ||
        (aRect.right<bRect.left) ||
        (aRect.left>bRect.right)
    )
}

function moveEnemy(car){
    let ene=document.querySelectorAll(".enemy");
    ene.forEach(function(item){
        if(isCollode(car,item)){
            console.log("hit");
            endGame();
        }
        if (item.y>=1500){
            item.y=-600;
            item.style.left=Math.floor(Math.random()*350)+"px";
            item.style.backgroundColor=randomColor();
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";
    })
}

function playGame(){
    let car=document.querySelector(".car");
    moveLines();
    moveEnemy(car);
    let road=gameArea.getBoundingClientRect();
    if(player.start){
        if(keys.ArrowUp && player.y>road.top){
            player.y-=player.speed;
        }
        if(keys.ArrowDown && player.y<road.bottom){
            player.y+=player.speed;
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed;
        }
        if(keys.ArrowRight && player.x<(road.width-50)){
            player.x+=player.speed;
        }
        car.style.left=player.x+'px';
        car.style.top=player.y+'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText="Score:"+player.score;
    }
    
}

function pressOn(e){
    e.preventDefault();
    keys[e.key]=true;
}
function pressOff(e){
    e.preventDefault();
    keys[e.key]=false;
}

function pressOn1(e){
    e.preventDefault();
    keys['ArrowLeft']=true;
}
function pressOff1(e){
    e.preventDefault();
    keys['ArrowLeft']=false;
}
function pressOn2(e){
    e.preventDefault();
    keys['ArrowUp']=true;
}
function pressOff2(e){
    e.preventDefault();
    keys['ArrowUp']=false;
}
function pressOn3(e){
    e.preventDefault();
    keys['ArrowDown']=true;
}
function pressOff3(e){
    e.preventDefault();
    keys['ArrowDown']=false;
}
function pressOn4(e){
    e.preventDefault();
    keys['ArrowRight']=true;
}
function pressOff4(e){
    e.preventDefault();
    keys['ArrowRight']=false;
}

function endGame(){
    player.start=false;
    score.innerHTML="Game Over<br>Score was :"+player.score;
    startScreen.classList.remove("hide");
}

function start(){
    startScreen.classList.add("hide");
    //gameArea.classList.remove("hide");
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    for(let x=0;x<10;x++){
        let div=document.createElement("div");
        div.classList.add("line");
        div.y=x*150;
        div.style.top=(x*150)+"px";
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    let car=document.createElement("div");
    //car.innerText='Car';
    car.setAttribute("class","car");
    gameArea.appendChild(car);
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    for(let x=0;x<5;x++){
        let enemy=document.createElement("div");
        enemy.classList.add("enemy");
        enemy.innerHTML="<br>"+(x+1);
        enemy.y=((x+1)*600)*-1;
        enemy.style.top=enemy.y+"px";
        enemy.style.left=Math.floor(Math.random()*150)+"px";
        enemy.style.backgroundColor=randomColor();
        gameArea.appendChild(enemy);
    }
}
function randomColor(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2)
    }
    return "#"+c()+c()+c();
}
