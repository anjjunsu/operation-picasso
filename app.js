const WIDTH = 800;
const HEIGHT = 800;

const imgInput = document.getElementById("img-upload");
const eraseBtn = document.getElementById("erase-btn");
const eraseAllBtn = document.getElementById("erase-all-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");
ctx.lineWidth = lineWidth.value;
ctx.moveTo(0, 0);  

let isPainting = false;
let isFillMode = false;
let isEraseMode = false;

function onImgChange(event) {
    const img = event.target.files[0];
    const url = URL.createObjectURL(img); // Create url for img
    const newImg = new Image();
    newImg.src = url;
    newImg.onload = () => {
        ctx.drawImage(newImg, 0, 0, WIDTH, HEIGHT);
        imgInput.value = null;
    }
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function changeCtxColor(color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function onColorChange(event) {
    changeCtxColor(event.target.value);
}

function onColorClick(event) {
    const chosenColor = event.target.dataset.color;
    changeCtxColor(chosenColor); 
    color.value = chosenColor;
}

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);   
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onModeBtnClick() {
    if (isFillMode) {
        isFillMode = false;
        modeBtn.innerText = "Fill";
    } else {
        isFillMode = true;
        modeBtn.innerText = "Draw";
    }
}

function onEraseBtnClick() {
    ctx.strokeStyle = "white";
    isFillMode = false;
    modeBtn.innerText = "Fill";
}

function onEraseAllBtnClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function onCanvasClick() {
    if (isFillMode) {
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
}

function stopPainting(event) {
    isPainting = false;
    ctx.beginPath();
}

function startPainging(event) {
    isPainting = true; 
}

const colors = [
    
];

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainging);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", onCanvasClick);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
modeBtn.addEventListener("click", onModeBtnClick);
eraseAllBtn.addEventListener("click", onEraseAllBtnClick);
eraseBtn.addEventListener("click", onEraseBtnClick);
img.addEventListener("change", onImgChange);
