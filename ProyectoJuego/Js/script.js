//Inicializa variable para almacenar el tablero de juego
let tablero;
//Asiga los simbolos para los jugadores
let jugador1 = "O";
let jugador2 = "X";
//Inicializa variable para controlar los turnos de los jugadores
let turno = jugador1;

let color_Temas = document.getElementsByTagName("aside");

//Inicializa variable para indicar el fin del juego
let gameOver = false;

//funcion para lanzar el juego cuando cargue la página
window.onload = function(){
    iniciar_Juego();
}

//funcion para lanzar el juego
function iniciar_Juego() {
    for(let i=0;i<color_Temas.length;i++){
        color_Temas[i].classList.add(turno);
    }
    tablero = new Array(30); // crea un array de 30 columas
    for (let i = 0; i < 30; i++) { //recorre cada columna
        tablero[i] = new Array(30); // para cada columna, crea un array de 30 celdas
        for (let j = 0; j < 30; j++) { // recorre cada celda de la columna
            tablero[i][j] = " "; // asigna un espacio en blanco para celda del array bidimensional con un espacio en blanco
            let celda = document.createElement("section"); //crea un elemento <section> y lo almacena en la variable celda
            celda.id = (i + "-" + j).toString(); //le asigna a la celda un id con su fila y su columna correspondientes
            celda.classList.add("celda"); //le asigna a la celda la clase "celda"
            next_Turn=document.getElementById("turno");
            next_Turn.innerText=turno;
            if(!gameOver){
                celda.addEventListener("click", set_Celda); //crea el evento de click sobre la celda, llamando a la funcion de seleccionar celda
            }else{
                next_Turn=document.getElementById("turno");
                next_Turn.innerText=" ";
            }
            document.getElementById("tablero").appendChild(celda); //agrega la celda al elemento de clase tablero como un hijo en el último lugar de la lista
        }
    }
}

function set_Celda(){ //controla las acciones al seleccionar una celda
    if(!gameOver){ //si el juego aun no termina
        let posicion = this.id.split("-"); //selecciona el id de la celda (i-j), separandolos y guardandolos en el array posicion
        let i = parseInt(posicion[0]); //selecciona el primer valor almacenado en posicion (i), lo convierte en int y lo almacena
        let j = parseInt(posicion[1]); //selecciona el segundo valor almacenado en posicion (j), lo convierte en int y lo almacena
        if (tablero [i][j]==" "){ //si la posición está vacia
            let id_Celda = (i + "-" + j).toString();
            elemento = document.getElementById(id_Celda); 
            elemento.classList.toggle("celda-"+turno);
            this.innerText = turno; //muestra el caracter del jugador en turno en la celda seleccionada
            tablero [i][j] = turno; //almacena el caracter del jugador en turno en la celda seleccionada
            verificar_Ganador();//método para verificar si algun jugador ha ganado
            if(!gameOver){
                let pasado; //inicializa variable para almacenar el simbolo del jugador al terminar su turno
            //verifica que jugador tenia el turno, y lo alterna
            if(turno==jugador1){
                turno=jugador2;
                pasado=jugador1;
            }else{
                turno=jugador1;
                pasado=jugador2
            }
            //cambia la clase de los elementos de la pagina a los colores del jugador que termina su turno a los del siguiente
            for(let i=0;i<color_Temas.length;i++){
                color_Temas[i].classList.replace(pasado,turno);
            }
            }
            
            next_Turn=document.getElementById("turno");
            next_Turn.innerText=turno;
        }
    }else{
        return; //si el juego terminó, retorna vacio
    }
}

function verificar_Ganador(){

    for (let i=0;i<30;i++){ //verifica ganador en horizontal
        for(let j=0;j<26;j++){
            if (tablero[i][j]==turno && tablero[i][j+1]==turno && tablero[i][j+2]==turno && tablero[i][j+3]==turno && tablero[i][j+4]==turno){
                let id_Celda;
                let elemento;
                let boton;
                boton = document.getElementById("game"); 
                boton.classList.toggle("fin");
                for (let k = j; k<j+5; k++){
                    id_Celda = (i + "-" + k).toString();
                    elemento = document.getElementById(id_Celda); 
                    elemento.classList.toggle("ganador");
                }
                estado=document.getElementById("estado");
                estado.innerText=("Ganador");
                next_Turn=document.getElementById("turno");
                next_Turn.innerText=turno;
                gameOver=true;
                return;
            }
        }
    }

    for (let i=0;i<26;i++){ //verifica ganador en vertical
        for(let j=0;j<30;j++){
            if (tablero[i][j]==turno && tablero[i+1][j]==turno && tablero[i+2][j]==turno && tablero[i+3][j]==turno && tablero[i+4][j]==turno){
                let id_Celda;
                let elemento;
                let boton;
                boton = document.getElementById("game"); 
                boton.classList.toggle("fin");
                for (let k = i; k<i+5; k++){
                    id_Celda = (k + "-" + j).toString();
                    elemento = document.getElementById(id_Celda); 
                    elemento.classList.toggle("ganador");
                }
                estado=document.getElementById("estado");
                estado.innerText=("Ganador");
                next_Turn=document.getElementById("turno");
                next_Turn.innerText=turno;
                gameOver=true;
                return;
            }
        }
    }

    for (let i=0;i<26;i++){ //verifica ganador en diagonal descendente
        for(let j=0;j<26;j++){
            if (tablero[i][j]==turno && tablero[i+1][j+1]==turno && tablero[i+2][j+2]==turno && tablero[i+3][j+3]==turno && tablero[i+4][j+4]==turno){
                let id_Celda;
                let elemento;
                let l = j-1;
                let boton;
                boton = document.getElementById("game"); 
                boton.classList.toggle("fin");
                for (let k = i; k<i+5; k++){
                    l++;
                    id_Celda = (k + "-" + l).toString();
                    elemento = document.getElementById(id_Celda);
                    elemento.classList.toggle("ganador");
                }
                estado=document.getElementById("estado");
                estado.innerText=("Ganador");
                next_Turn=document.getElementById("turno");
                next_Turn.innerText=turno;
                gameOver=true;
                return;
            }
        }
    }

    for (let i=4;i<30;i++){ //verifica ganador en diagonal ascendente
        for(let j=0;j<26;j++){
            if (tablero[i][j]==turno && tablero[i-1][j+1]==turno && tablero[i-2][j+2]==turno && tablero[i-3][j+3]==turno && tablero[i-4][j+4]==turno){
                let id_Celda;
                let elemento;
                let l = j-1;
                let boton;
                boton = document.getElementById("game"); 
                boton.classList.toggle("fin");
                for (let k = i; k>i-5; k--){
                    l++;
                    id_Celda = (k + "-" + l).toString();
                    elemento = document.getElementById(id_Celda); 
                    elemento.classList.toggle("ganador");
                }
                estado=document.getElementById("estado");
                estado.innerText=("Ganador");
                next_Turn=document.getElementById("turno");
                next_Turn.innerText=turno;
                gameOver=true;
                return;
            }
        }
    }
}