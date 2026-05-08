export class Linea {

    //guarda posición, color y grosor de la linea
    constructor(pos, color, grosor){
        this.pos = JSON.parse(JSON.stringify(pos));
        this.color = color;
        this.grosor = grosor;
    }

    //dibuja la linea en el canvas
    Dibujar(ctx){
        ctx.beginPath();

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.grosor;

        ctx.moveTo(this.pos.iniciales.x, this.pos.iniciales.y);
        ctx.lineTo(this.pos.finales.x, this.pos.finales.y);

        ctx.stroke();
    }
}

export class Cuadrado {

    //guarda datos del cuadrado
    constructor(pos, color, fill, grosor){
        this.pos = JSON.parse(JSON.stringify(pos));
        this.color = color;
        this.fill = fill;
        this.grosor = grosor;
    }

    //dibuja el cuadrado
    Dibujar(ctx){

        //calcula posición y tamaño sin importar dirección del mouse
        let x = Math.min(this.pos.iniciales.x, this.pos.finales.x);
        let y = Math.min(this.pos.iniciales.y, this.pos.finales.y);

        let w = Math.abs(this.pos.finales.x - this.pos.iniciales.x);
        let h = Math.abs(this.pos.finales.y - this.pos.iniciales.y);

        //relleno
        ctx.fillStyle = this.fill;
        ctx.fillRect(x,y,w,h);

        //borde
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.grosor;
        ctx.strokeRect(x,y,w,h);
    }
}

export class Circulo {

    //datos del circulo
    constructor(pos,color,fill,grosor){
        this.pos = JSON.parse(JSON.stringify(pos));
        this.color = color;
        this.fill = fill;
        this.grosor = grosor;
    }

    //dibuja circulo
    Dibujar(ctx){

        //distancias entre inicio y fin
        const dx = this.pos.finales.x - this.pos.iniciales.x;
        const dy = this.pos.finales.y - this.pos.iniciales.y;

        //radio
        const r = Math.min(Math.abs(dx), Math.abs(dy))/2;

        //centro
        const cx = this.pos.iniciales.x + dx/2;
        const cy = this.pos.iniciales.y + dy/2;

        ctx.beginPath();

        //crear círculo completo
        ctx.arc(cx,cy,r,0,Math.PI*2);

        //relleno
        ctx.fillStyle = this.fill;
        ctx.fill();

        //borde
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.grosor;
        ctx.stroke();
    }
}

/*ESTRELLA*/
export class Estrella {

    //guarda datos de la estrella
    constructor(pos, color, fill){
        this.pos = JSON.parse(JSON.stringify(pos));
        this.color = color;
        this.fill = fill;
    }

    //dibuja una estrella de 5 picos
    Dibujar(ctx){

        const x1 = this.pos.iniciales.x;
        const y1 = this.pos.iniciales.y;

        const x2 = this.pos.finales.x;
        const y2 = this.pos.finales.y;

        //centro de la figura
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;

        //radios
        const outerRadius = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1)) / 2;
        const innerRadius = outerRadius / 2;

        //cantidad de puntas
        const spikes = 5;

        let rot = Math.PI / 2 * 3;
        let step = Math.PI / spikes;

        ctx.beginPath();

        ctx.moveTo(cx, cy - outerRadius);

        //crear los picos
        for(let i = 0; i < spikes; i++){

            let x = cx + Math.cos(rot) * outerRadius;
            let y = cy + Math.sin(rot) * outerRadius;

            ctx.lineTo(x, y);

            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;

            ctx.lineTo(x, y);

            rot += step;
        }

        ctx.closePath();

        //color interno
        ctx.fillStyle = this.fill;
        ctx.fill();

        //borde
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

/*PINCEL y BORRADOR*/
export class Trazo {

    //guarda los puntos dibujados
    constructor(pos, color, grosor, borrar=false){

        this.puntos = [{x: pos.iniciales.x, y: pos.iniciales.y}];

        this.color = color;
        this.grosor = grosor;

        //aqui se define si el trazo funciona como borrador
        this.borrar = borrar;
    }

    //agrega nuevos puntos al movimiento
    agregarPunto(x,y){
        this.puntos.push({x,y});
    }

    //dibuja y hace la linea completo
    Dibujar(ctx){

        ctx.beginPath();

        //hace lineas suaves
        ctx.lineCap="round";
        ctx.lineJoin="round";

        ctx.lineWidth=this.grosor;

        //si es borrador elimina partes del canvas
        if(this.borrar){
            ctx.globalCompositeOperation="destination-out";
        } else {
            ctx.strokeStyle=this.color;
        }

        ctx.moveTo(this.puntos[0].x,this.puntos[0].y);

        // une todos los puntos
        for(let p of this.puntos){
            ctx.lineTo(p.x,p.y);
        }

        ctx.stroke();

        //regresa el modo normal
        ctx.globalCompositeOperation="source-over";
    }
}