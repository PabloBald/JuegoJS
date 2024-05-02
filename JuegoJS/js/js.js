const canvas = document.getElementById('canvas');

//obtenemos el contexto 2d y lo asignamos a la variable ctx(Context)
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//Creamos un objeto para contener las imagenes
let imagenes = {}

//Agregamos la imagen del jugador
imagenes.player = new Image();
imagenes.player.src = "JuegoJS/art/player/playermov2.png";

//Agregamos la imagen de manzana
imagenes.manzana = new Image();
imagenes.manzana.src = "JuegoJS/art/manzana/apple.png";

//Agregamos los corazones
imagenes.corazones = new Image();
imagenes.corazones.src = "JuegoJS/art/corazon/corazonfull.png";

//Definimos el ANCHO y ALTO de la imagen
const playerAncho = 168;
let playerAlto = 104;

//Tamaño de la manzana
const manzanaAncho = 500;
const manzanaAlto = 500;

//Tamaño de los corazones
const corazonAncho = 144;
const corazonAlto = 114;

//Posicion inicial del jugador en la imagen
let playerFrameX = 0;
let playerFrameY = 0;

//Posicion inicial de la manzana en la imagen
let manzanaFrameX = 0;
let manzanaFrameY = 0;

//Posicion inicial
let corazonFrameX = 0;
let corazonFrameY = 0;

//Definimos la posicion de player dentro del canvas
let playerX = 100;
let playerY = 400;
let repreX = canvas.width/2;
let repreY = 350;

//Posicion de las manzanas dentro del canvas
let manzanaX = 200;
let manzanaY = 0;
let canastaPos = 0;

//Posicion de los corazones dentro del canvas
let corazonX = 750;
let corazonY = 35;
let corazonrepreX = 50;
let corazonrepreY = 35;

//velocidad de caida las manzanas
let manSpeed = 5;

//cantidad de vidas
let vidas = 3;

//Cantidad de puntos
let puntos = 0;
//Intervalo de animacion
let intervaloID = setInterval(animar, 1000 / 60);

//variable de juego iniciado
let start = false;
let count = 0;

//Eventos de teclado
//Agrego el listener de teclado cuando se presiona una tecla
window.onload = addEventListener('keydown', hacerAlTocar, false);

function levelUp() {
  if (puntos != 0 && puntos % 1000 == 0) {
    manSpeed++;
    ctx.fillText("Level UP", 200, 200);
    ctx.strokeText("Level UP", 200, 200);

  }
}

function animar() {
  if (start == true) {

    //Limpiamos el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //dibujamos el jugador
    dibujarJugador();

    { //cambiamos el contexto para que dibuje la manzana atras
      ctx.globalCompositeOperation = 'destination-over';

      //dibujamos la manzana en el canvas
      ctx.drawImage(imagenes.manzana, 100, 100, manzanaAncho, manzanaAlto, manzanaX, manzanaY, 128, 128);
      generarManzanaRandom();

      //Corazones y vida
      if (vidas == 3) {
        restarVida(0, 0, 0);
      } else if (vidas == 2) {
        restarVida(0, 0, 1);
      } else if (vidas == 1) {
        restarVida(0, 1, 1);
      } else {
        restarVida(1, 1, 1);
      }


      //Agregamos el puntaje
      puntaje();

      //Animamos la manzana 
      if (manzanaX == 200 && manzanaY < 560) {
        manzanaY += manSpeed;
        if (manzanaY >= 560 && canastaPos == 1) {
          manzanaY = 0;
          puntos += 100;
          console.log("+10pts");
        } else if (manzanaY >= 560 && canastaPos != 1) {
          puntos -= 300;
          manzanaY = 0;
          vidas--;
          if (vidas < 1) {
            reset();
            start = false;
            clearInterval(intervaloID);
            pantallaPrincipal(60, 400);

          }
          console.log("RIP");
        }
      }
      if (manzanaX == 600 && manzanaY < 560) {
        manzanaY += manSpeed;
        if (manzanaY >= 560 && canastaPos == 3) {
          manzanaY = 0;
          puntos += 100;
          console.log("+10pts");
        } else if (manzanaY >= 560 && canastaPos != 3) {
          puntos -= 300;
          manzanaY = 0;
          vidas--;
          if (vidas < 1) {
            reset();
            start = false;
            clearInterval(intervaloID);
            pantallaPrincipal(60, 400);


          }
        }
      }
      if (manzanaX == 400 && manzanaY < 400) {
        manzanaY += manSpeed;
        if (manzanaY >= 400 && canastaPos == 2) {
          manzanaY = 0;
          puntos += 100;
          console.log(puntos);
        }
        else if (manzanaY >= 400 && canastaPos != 2) {
          puntos -= 300;
          manzanaY = 0;
          vidas--;
          if (vidas < 1) {
            reset();
            start = false;
            clearInterval(intervaloID);
            pantallaPrincipal(60, 400);

          }
          console.log("RIP");
        }
      }

      //Regresamos el contexto para dibujar adelante
      ctx.globalCompositeOperation = 'source-over';

    }
  } else
    //Limpiamos el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  pantallaPrincipal(60, 400);

}

function restarVida(z, x, c) {
  dibujarCorazon(530, 35, z);
  dibujarCorazon(590, 35, x);
  dibujarCorazon(650, 35, c);
}

function dibujarJugador() {
  ctx.drawImage(imagenes.player, playerAncho * playerFrameX, playerAlto * playerFrameY,
    playerAncho, playerAlto, playerX, playerY, repreX, repreY);
}

function dibujarCorazon(x, y, corazonFrameX) {

  ctx.drawImage(imagenes.corazones, corazonAncho * corazonFrameX, corazonAlto * corazonFrameY, corazonAncho, corazonAlto, x, y, corazonrepreX, corazonrepreY);

}

function manzanaCae() {
  if (manzanaY > 0)
    return true;

}

function cambioFrameY(npf, ry, posy, repX, repY) {
  playerFrameY = npf;
  playerAlto = ry;
  playerY = posy;
  repreX = repX;
  repreY = repY;
}

function hacerAlTocar(e) {
  e = e.keyCode;
  //Izquierda
  if (e == 37) {
    cambioFrameY(2, 109, playerY, 700, 370);
    canastaPos = 1;
    console.log("Canasta Izquierda");
  }

  //Derecha
  if (e == 39) {
    cambioFrameY(1, 104, playerY, 700, 350);
    canastaPos = 3;
    console.log("Canasta Derecha");
  }
  //Arriba
  if (e == 38) {
    cambioFrameY(3, 113, playerY, 700, 350);
    canastaPos = 2;
    console.log("Canasta Arriba");
  }
  //Centro
  if (e == 40) {
    cambioFrameY(0, 104, playerY, 700, 350);
    canastaPos = 0;
    console.log("Canasta Medio");


  }

  if (e == 82 && start == false) {

    intervaloID = setInterval(animar, 1000 / 60);
    start = true;
    console.log("Juego iniciado");
    return intervaloID;

  } else if (e == 82 && start == true) {
    reset();
    start = false;
    pantallaPrincipal(60, 400);
    clearInterval(intervaloID);
    console.log("Juego terminado");


  }


}

function tirarRandom() {
  let x = Math.ceil(Math.random() * 3);
  return x;

}

function generarManzanaRandom() {
  if (manzanaY == 0) {
    switch (tirarRandom()) {
      case 1:
        manzanaX = 200;
        break;
      case 2:
        manzanaX = 400;
        break;
      case 3:
        manzanaX = 600;
        break;
      default: console.log("default");
        break;
    }
  }
  console.log(manzanaX);
  return manzanaX;

}

function pararIntervalo(intervalo) {
  clearInterval(intervalo);
}

function reset() {

  cambioFrameY(0, 104, playerY, 700, 350);
  puntos = 0;
  manzanaY = 0;
  vidas = 3;
  pararIntervalo(intervaloID);
  console.log("Reiniciado");
}

function pantallaPrincipal(x, y) {
  if (start == false && count == 0) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("Presiona R para iniciar", x, y);
    ctx.strokeText("Presiona R para iniciar", x, y);
    reset();
    puntaje();

  }
  /* 
  Resta por hacer:
      -Hacer que las frutas exploten si llegan al piso
      -Agregar selector de dificultades o dificultad progresiva.
      -Poner limite de vidas
      -Modo NANI!?!
  */

}

function puntaje() {

  ctx.fillStyle = "Yellow";
  ctx.font = "bold 50px ARCADECLASSIC";

  ctx.fillText("Puntaje: " + puntos, 20, 60);
  ctx.strokeText("Puntaje: " + puntos, 20, 60);

}
