const canvas = document.getElementById("canvas");   //캔버스
const ctx = canvas.getContext("2d");    //캔버스 2D
const lineWidth = document.getElementById("size");  //펜 사이즈
const color = document.getElementById("color"); //색 바꿈
const colorOption = Array.from(document.getElementsByClassName("color-option"));    //팔레트
const btnMode = document.getElementById("btnMode"); //채우기 모드
const btnInit = document.getElementById("btnInit"); //초기화 버튼
const btnEraser = document.getElementById("btnEraser"); //지우기 버튼
let painting = false;   //flag:표시, 클릭 상태
let filling = false;    //채우기/그리기 상태
let canvasBgColor = "white";    //지우개 색
const inputFile = document.getElementById("fill");  //이미지 삽입
const inputText = document.getElementById("text");  //텍스트 삽입 
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const btnSave = document.getElementById("save");

canvas.width = CANVAS_WIDTH; //css 가로세로 값과 같게
canvas.height = CANVAS_HEIGHT;    //캔버스 크기
//ctx.lineWidth = 5; //선 두께


function changeLineWidth(event){
    ctx.lineWidth = event.target.value;
}
lineWidth.addEventListener("change", changeLineWidth);  //값에 따라 펜 사이즈 변경


function onMode(){
    if (!filling){
        filling = true;
        btnMode.innerText = "draw";
    }   //클릭했을 때 채우는 중이 아님 -> 채우기 모드로 바꿈
    else{
        filling = false;
        btnMode.innerText = "fill";
    }   //클릭했을 때 채우는 중임 -> 그리기 모드로 바꿈
}
btnMode.addEventListener("click", onMode);  //채우기/그리기 모드 변경

function onClickCanvas(){
    if (filling){
        ctx.fillRect(0, 0, 800, 800);
    }
}
canvas.addEventListener("click", onClickCanvas);    //클릭했을 때 채우기 모드 -> 채우기


function onClickInit(){
    ctx.fillStyle = "white";
    canvasBgColor = "white";
    ctx.fillRect(0, 0, 800, 800);
}
btnInit.addEventListener("click", onClickInit); //흰 색으로 초기화


function onClickEraser(){
    ctx.strokeStyle = canvasBgColor;    //펜 색을 배경 색으로 바꿈
    filling = false;    //채우기 모드 끔 = 그리기 모드로 바꿈
    btnMode.innerText = "fill";   //텍스트 변경
}
btnEraser.addEventListener("click", onClickEraser); //지우기 모드


const colors = ["red", "orange", "yellow", "green", "blue", "darkblue", "purple"];
function changeColor(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
color.addEventListener("click", changeColor)    //색 바꿈

function chooseColor(event){    //onclickcolor
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    if (filling){
        canvasBgColor = colorValue;
    }
}
colorOption.forEach((color)=>
    color.addEventListener("click", chooseColor));
//팔레트에서 색 선택


function startPainting(){
    painting = true;
}
function endPainting(){
    painting = false;
}   //클릭 상태에 따라 변경

function drawLine(event){
    if (!painting){ //false:클릭아님
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);   //마우스 좌표 가져와서 이동만 함
        //let penColor = colors[Math.floor(Math.random()*colors.length)]; //색 바꿈(색 정하는 거 바로 위에 있어야 함)
        //ctx.strokeStyle = penColor;
    }
    else{   //true:클릭중
        ctx.lineTo(event.offsetX, event.offsetY);   //마우스 좌표에 따라 선 그림
        ctx.stroke();
    }
}
canvas.addEventListener("mousemove", drawLine); //마우스 움직임
canvas.addEventListener("mousedown", startPainting);    //마우스 클릭 중
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);


function onChangeFile(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);  //데이터 url 생성(create)
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    //drawImage(이미지, 캔버스 x좌표, 캔버스 y좌표, 이미지 가로 크기, 이미지 세로 크기)
}
inputFile.addEventListener("change", onChangeFile);


function onDoubleClickTxt(event){
    const text = inputText.value;
    if (text != ""){
        ctx.save();
        ctx.font = "50px 'consolas'";   //글자 크기, 글씨체
        ctx.fillText(text, event.offsetX, event.offsetY);   //or strokeText
        ctx.restore();
    }
}
canvas.addEventListener("dblclick", onDoubleClickTxt);    //더블 클릭(bdl)


function saveImg(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "canvasdraw.png";
    a.click();
}
btnSave.addEventListener("click", saveImg);





/*
function onClick(event){
    console.log(event); //로그에 offsetX, offsetY가 요소 안의 좌표
    console.log(event.offsetX, event.offsetY);
};
canvas.addEventListener("click", onClick);
*/

/*
//원
arc(x, y, 반지름, 시작 각도, 마지막 각도)
x, y : 중심점
시작 / 마지막 각도 : Math.PI * 값
->0:우(시작점)/2:(끝나는 점)
->0.5:아래
->1:좌
->1.5:위
방향 : false->시계방향
ctx.stroke();
*/

/*
ctx.fillRect(100, 100, 100, 100);
ctx.rect(200, 200, 100, 100);   //rect 후, 마지막 fill로 색 채움
ctx.fill();
*/

/*
//삼각형
ctx.beginPath();    //구역을 나눔
ctx.moveTo(50, 140);    //이동
ctx.lineTo(150, 60);    //그리면서 이동
ctx.lineTo(250, 140);
ctx.closePath();
ctx.fill(); //색 안채우고 선으로만 만듦:stroke
*/

/*
ctx.lineWidth = 20; //선 두께
ctx.strokeRect(300, 340, 150, 110); //채워지지 않은 사각형(x,y 좌표, 폭,높이)
ctx.fillStyle = "green";    //채울 색(채우기 전 지정, 채우기 전 까지 그린 것들 모두 적용)
ctx.fillRect(10, 10, 150, 100); //x,y 좌표, 폭,높이
*/


/*
//몸체
ctx.fillRect(300, 400, 400, 200);
ctx.fillRect(100, 200, 200, 400);
//난간
ctx.fillRect(360, 350, 20, 50);
ctx.fillRect(440, 350, 20, 50);
ctx.fillRect(520, 350, 20, 50);
ctx.fillRect(600, 350, 20, 50);
ctx.fillRect(680, 350, 20, 50);
ctx.fillRect(300, 340, 400, 10);
//지붕
ctx.lineWidth = 15; //선 두께
ctx.beginPath();
ctx.moveTo(105, 206);
ctx.lineTo(300, 100);
ctx.closePath();
ctx.stroke();
ctx.lineWidth = 10; //선 두께
ctx.beginPath();
ctx.moveTo(275, 200);
ctx.lineTo(275, 112);
ctx.closePath();
ctx.stroke();
//문, 창문
ctx.fillStyle = "beige";
ctx.fillRect(300, 500, 75, 100);
ctx.fillRect(450, 500, 50, 50);
ctx.fillRect(575, 500, 50, 50);
ctx.fillRect(175, 275, 50, 100);
*/


/*
//리본 좌
ctx.beginPath();
ctx.fillStyle = "red";
ctx.moveTo(400, 200);
ctx.lineTo(250, 100);
ctx.lineTo(265, 325);
ctx.lineTo(300, 300);
ctx.fill();
ctx.closePath();
//리본 우
ctx.beginPath();
ctx.fillStyle = "red";
ctx.moveTo(400, 200);//150
ctx.lineTo(550, 100);
ctx.lineTo(535, 325);
ctx.lineTo(500, 300);
ctx.fill();
ctx.closePath();
//얼굴
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(400, 300, 100, 0, Math.PI * 2);  //x, y, r, start, finish
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(400, 300, 100, 0, Math.PI * 2);  //x, y, r, start, finish
ctx.stroke();
ctx.closePath();
//머리카락
ctx.beginPath();
ctx.moveTo(370, 250);
ctx.lineTo(395, 300);
ctx.lineTo(400, 280);
ctx.lineTo(425, 305);
ctx.lineTo(410, 250);
ctx.stroke();
ctx.closePath();
//왼쪽 눈
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(360, 330, 17, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(385, 325);
ctx.lineTo(345, 300);
ctx.lineTo(320, 330);
ctx.lineTo(345, 350);
ctx.stroke();
ctx.closePath();
//오른 눈
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(440, 330, 17, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(415, 325);
ctx.lineTo(455, 300);//40
ctx.lineTo(480, 330);//25
ctx.lineTo(455, 350);//25
ctx.stroke();
ctx.closePath();
//입
ctx.beginPath();
ctx.moveTo(385, 365);
ctx.lineTo(400, 380);
ctx.lineTo(415, 365);
ctx.stroke();
ctx.closePath();
//몸
ctx.beginPath();
ctx.fillStyle = "black";
ctx.moveTo(400, 400);
ctx.lineTo(325, 575);
ctx.lineTo(475, 575);
ctx.lineTo(400, 400);
ctx.fill();
ctx.closePath();
//왼다리
ctx.beginPath();
ctx.moveTo(400, 575);
ctx.lineTo(375, 700);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(375, 700);
ctx.lineTo(350, 575);
ctx.stroke();
ctx.closePath();
//오른다리
ctx.beginPath();
ctx.moveTo(400, 575);//25
ctx.lineTo(425, 700);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(425, 700);//25
ctx.lineTo(450, 575);
ctx.stroke();
ctx.closePath();
//손
ctx.beginPath();
ctx.moveTo(400, 400);
ctx.lineTo(300, 525);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(300, 525, 25, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(300, 525, 25, 0, Math.PI * 2);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.moveTo(400, 400);
ctx.lineTo(500, 525);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(500, 525, 25, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(500, 525, 25, 0, Math.PI * 2);
ctx.stroke();
ctx.closePath();
*/
