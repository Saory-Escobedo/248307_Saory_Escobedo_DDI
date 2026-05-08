import {Linea,Cuadrado,Circulo,Estrella,Trazo} from "./figuras.js";

const canvas = document.querySelector("#lienzo");
const ctx = canvas.getContext("2d");

/*RESIZE SEGURO*/
function resizeCanvas(){
    const rect = canvas.parentElement.getBoundingClientRect();

    //evitar tamaños invalidos
    if(rect.width === 0 || rect.height === 0) return;

    //guardar contenido actual
    let temp = null;
    try{
        temp = ctx.getImageData(0,0,canvas.width,canvas.height);
    }catch(e){}

    canvas.width = rect.width;
    canvas.height = rect.height;

    //restaurar si existe
    if(temp){
        try{
            ctx.putImageData(temp,0,0);
        }catch(e){}
    }

    render();
}

/*IMPORTANTE: esperar a que cargue todo*/
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

/* ESTADO */
let tool="pincel";
let presionado=false;

let color="#000";
let fill="#ff0000";
let size=5;

let pos={iniciales:{x:0,y:0},finales:{x:0,y:0}};

let figuras=[];
let redoStack=[];

let filtroActivo=null;

let stickerImg=null;
let stickerPreview=null;

let trazoActual=null;

/* HELPERS */
function copiarPos(){
    return {
        iniciales:{...pos.iniciales},
        finales:{...pos.finales}
    };
}

/* EVENTOS */
canvas.addEventListener("mousedown",e=>{
    presionado=true;
    pos.iniciales={x:e.offsetX,y:e.offsetY};

    if(tool==="pincel"||tool==="borrador"){
        trazoActual=new Trazo(pos,color,size,tool==="borrador");
    }
});

canvas.addEventListener("mousemove",e=>{
    pos.finales={x:e.offsetX,y:e.offsetY};

    if(tool==="sticker" && stickerImg){
        stickerPreview={x:e.offsetX,y:e.offsetY};
        render();
        return;
    }

    if(!presionado) return;

    if(tool==="pincel"||tool==="borrador"){
        trazoActual.agregarPunto(e.offsetX,e.offsetY);
        render();
        trazoActual.Dibujar(ctx);
        return;
    }

    render();
    let f=crearFigura();
    if(f) f.Dibujar(ctx);
});

canvas.addEventListener("mouseup",e=>{
    presionado=false;

    if(tool==="pincel"||tool==="borrador"){
        figuras.push(trazoActual);
        trazoActual=null;
        redoStack=[];
        render();
        return;
    }

    if(tool==="sticker" && stickerImg){
        figuras.push({tipo:"sticker",img:stickerImg,x:e.offsetX,y:e.offsetY});
        redoStack=[];
        render();
        return;
    }

    let f=crearFigura();
    if(f){
        figuras.push(f);
        redoStack=[];
    }

    render();
});

/*CREAR FIGURAS*/
function crearFigura(){
    let p=copiarPos();

    if(tool==="linea") return new Linea(p,color,size);
    if(tool==="cuadrado") return new Cuadrado(p,color,fill,size);
    if(tool==="circulo") return new Circulo(p,color,fill,size);
    if(tool==="estrella") return new Estrella(p,color,fill);
}

/*RENDER*/
function render(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    figuras.forEach(f=>{
        if(f.tipo==="sticker"){
            ctx.drawImage(f.img,f.x,f.y,80,80);
        }else{
            f.Dibujar(ctx);
        }
    });

    if(stickerPreview && stickerImg){
        ctx.globalAlpha=0.5;
        ctx.drawImage(stickerImg,stickerPreview.x,stickerPreview.y,80,80);
        ctx.globalAlpha=1;
    }

    aplicarFiltro();
}

/*FILTROS (SEGUROS)*/
function aplicarFiltro(){
    if(!filtroActivo) return;
    if(canvas.width === 0 || canvas.height === 0) return;

    let img;
    try{
        img = ctx.getImageData(0,0,canvas.width,canvas.height);
    }catch(e){
        return;
    }

    let d=img.data;

    for(let i=0;i<d.length;i+=4){
        let r=d[i],g=d[i+1],b=d[i+2];

        if(filtroActivo==="bn"){
            let avg=(r+g+b)/3;
            d[i]=d[i+1]=d[i+2]=avg;
        }
        if(filtroActivo==="sepia"){
            d[i]=0.393*r+0.769*g+0.189*b;
            d[i+1]=0.349*r+0.686*g+0.168*b;
            d[i+2]=0.272*r+0.534*g+0.131*b;
        }
        if(filtroActivo==="negativo"){
            d[i]=255-r; d[i+1]=255-g; d[i+2]=255-b;
        }
        if(filtroActivo==="rojo"){ d[i+1]=d[i+2]=0; }
        if(filtroActivo==="verde"){ d[i]=d[i+2]=0; }
        if(filtroActivo==="azul"){ d[i]=d[i+1]=0; }
    }

    ctx.putImageData(img,0,0);
}

/*BOTONES*/
btn_pincel.onclick=()=>tool="pincel";
btn_linea.onclick=()=>tool="linea";
btn_cuadrado.onclick=()=>tool="cuadrado";
btn_circulo.onclick=()=>tool="circulo";
btn_estrella.onclick=()=>tool="estrella";
btn_sticker.onclick=()=>tool="sticker";
btn_borrador.onclick=()=>tool="borrador";

/*INPUTS DE COLORES Y TAMA;OS*/
color_linea.oninput=e=>color=e.target.value;
color_relleno.oninput=e=>fill=e.target.value;
grosor.oninput=e=>size=e.target.value;

/*FILE*/
input_file.onchange=e=>{
    const reader=new FileReader();
    reader.onload=ev=>{
        stickerImg=new Image();
        stickerImg.src=ev.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
};

/*ACCIONES*/
btn_limpiar.onclick=()=>{
    figuras=[];
    render();
};

btn_guardar.onclick=()=>{
    let link=document.createElement("a");
    link.download="canvas.png";
    link.href=canvas.toDataURL();
    link.click();
};

btn_undo.onclick=()=>{
    if(figuras.length===0) return;
    redoStack.push(figuras.pop());
    render();
};

btn_redo.onclick=()=>{
    if(redoStack.length===0) return;
    figuras.push(redoStack.pop());
    render();
};

/*FILTROS*/
f_bn.onclick=()=>{filtroActivo="bn";render();}
f_sepia.onclick=()=>{filtroActivo="sepia";render();}
f_negativo.onclick=()=>{filtroActivo="negativo";render();}
f_rojo.onclick=()=>{filtroActivo="rojo";render();}
f_verde.onclick=()=>{filtroActivo="verde";render();}
f_azul.onclick=()=>{filtroActivo="azul";render();}
f_reset.onclick=()=>{filtroActivo=null;render();}