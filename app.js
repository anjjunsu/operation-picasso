const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext("2d");
ctx.lineWidth = lineWidth.value;
ctx.moveTo(0, 0);  
let isPainting = false;

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);   
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
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

lineWidth.addEventListener("change", onLineWidthChange);

