const WIDTH = 800;
const HEIGHT = 800;

const modeButton = document.getElementById("mode-button");
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

function onModeButtonClick() {
    if (isFillMode) {
        isFillMode = false;
        modeButton.innerText = "Fill";
    } else {
        isFillMode = true;
        modeButton.innerText = "Draw";
    }
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

//function onClick(event) {
//    if (isPainting) {
//        ctx.lineTo(event.offsetX, event.offsetY);   
//        ctx.stroke();
//};

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
modeButton.addEventListener("click", onModeButtonClick);
