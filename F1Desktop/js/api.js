"use strict"

class Apuestas{


    pilotos = {
        lista : [
            {"nombre" : "Fernando Alonso", "probabilidad" : 2},
            {"nombre" : "Piloto 2", "probabilidad" : 2},
            {"nombre" : "Piloto 3", "probabilidad" : 2},
            {"nombre" : "Piloto 4", "probabilidad" : 2},
            {"nombre" : "Piloto 5", "probabilidad" : 2}
        ]
    } 

    constructor(){
        //Valores por defecto
        this.points = 0;
        this.apostado = 0;

        //Cargar info de la página
        this.getPoints();
        this.randomizeProbabilities();
        this.generatePilots();

        $("main > button").click(this.toggleFullScreen.bind(this));
    }

    toggleFullScreen(){
        if(!document.fullscreenElement){
            document.querySelector("main").requestFullscreen();
            document.querySelector("main > button").textContent ="Desactivar pantalla completa";
        }else if (document.exitFullscreen) {
            document.querySelector("main > button").textContent= "Activar pantalla completa";
            document.exitFullscreen();
          }
    }

    checkFileInput(lines){

        var total = 0;

        for(var i = 0; i < lines.length; i++){
            var line = lines[i].split("-");

            if(line.length != 2){
                return "Apuesta en la linea "+i+" no tiene el numero de parametros adecuados";
            }

            var msg = this.checkInput(line[0]);

            if(msg != "ok"){
                return "Apuesta en la lines "+i+" tiene el siguiente problema: "+msg;
            }else{
                total += parseFloat(line[0]);
            }
        }

        if(total > this.points){
            return "Cantidad total apostada es mayor al número de puntos";
        }

        return "ok";
    }

    readFile(files){      
        var file = files[0];

        var inputErrorP = $("article section:nth-of-type(2) p");

        //Comprobamos que soporta FileReader
        if (window.File&&window.FileReader&&window.FileList&&window.Blob){
            if(file.type.match("text.*/")){

                var reader = new FileReader;

                reader.onload = function(e){

                    var lines = reader.result;

                    lines = lines.split("\r\n");

                    var msg = this.checkFileInput(lines);

                    if(msg != "ok"){
                        inputErrorP.text(msg);
                        inputErrorP.removeAttr("hidden");
                    }else{
                        inputErrorP.attr("hidden", "");

                        //Desactivar botones
                        document.querySelectorAll("main > article > article button").forEach((button)=>button.setAttribute("disabled", ""));

                        //Almecenamos los puntos antes de ejecutar para luego comparar
                        var prevPoints = this.points;
                        

                        this.showLoadingText();

                        setTimeout(function(){

                            lines.forEach(function(line){
                                var apuesta = line.split("-");

                                var cantidad = apuesta[0];
                                var piloto = apuesta[1];

                                this.apostado = cantidad;
                                this.checkGameResults(piloto);
                            }.bind(this))

                            document.querySelectorAll("main > article > article button").forEach((button)=>button.removeAttribute("disabled"));

                            if(prevPoints > this.points){
                                this.showEndingMessage("Has perdido "+(prevPoints-this.points)+" puntos");
                            }else{
                                this.showEndingMessage("Has ganado "+(this.points-prevPoints)+" puntos");
                            }

                        }.bind(this), 3000);

                        
                    }                    

                }.bind(this);

                reader.readAsText(file);

            }else{
                inputErrorP.text("Formato de texto inválido");
                inputErrorP.removeAttr("hidden");
            }


        }else{
            inputErrorP.text("Su navegador no soporta lectura de archivos");
            inputErrorP.removeAttr("hidden");
        }
        
        
    }

    getPoints(){
        if(!localStorage.getItem("puntos")){
            localStorage.setItem("puntos", 100);
        }

        var points = localStorage.getItem("puntos");

        this.points = parseFloat(points);
        

        $("article:first > p").text(points);
    }

    randomizeProbabilities(){
        //Por simplicidad, las probabilidades las defino en vez de sacarlas aleatoriamente
        var probabilities = [1, 2, 2, 3, 3];

        //Randomizamos la lista (mismo método que con las cartas)
        for(var i = probabilities.length-1; i >= 0; i--){
            var pos = Math.floor(Math.random() * i);

            var temp = probabilities[pos];

            probabilities[pos] = probabilities[i];
            probabilities[i] = temp;
        }

        //Asignamos a cada piloto una probabilidad
        for(var i = 0; i < probabilities.length; i++){
            this.pilotos.lista[i].probabilidad = probabilities[i];
        }
    }

    

    generatePilots(){

        for(var piloto of this.pilotos.lista){
            //Representamos los pilotos con article porque estilos.cc no tiene reglas para ellos. 
            var article = $("<article></article>");

            article.append($("<img>").attr({
                src : "multimedia/imágenes/piloto1_api.png",
                alt : "Foto piloto 1"
            }));

            article.append($("<h4></h4>").text(piloto.nombre))
            article.append($("<p></p>").text("Probabilidad de ganar: "+piloto.probabilidad*10+"%"));

            var button = $("<button></button>").text("Elegir");
            button.click(this.startGame.bind(this, piloto.nombre));

            article.append(button);

            $("main > article:last").append(article);

           

        }
        this.writeProbabilities();

    }

    showLoadingText(){
        var resultP = document.querySelector("main > article:last-of-type > p");
        if(resultP==null){
            resultP = document.createElement("p");
        }

        resultP.textContent = "Decidiendo piloto...";
        document.querySelector("main > article:last-of-type").appendChild(resultP);
    }

    startGame(selected){
        var valueApuesta = document.querySelector("article section:first-of-type input").value;
        var inputErrorP = $("article > section > section:first > p");

        //Desactivar botones
        document.querySelectorAll("main > article > article > button").forEach((button)=>button.setAttribute("disabled", ""));

        var msg = this.checkInput(valueApuesta);

        if(msg == "ok"){
            this.showLoadingText();

            setTimeout(function(){
                this.apostado = parseFloat(valueApuesta);
                this.checkGameResults(selected);
                
            }.bind(this), 3000);
        }else{
            inputErrorP.text(msg);
        }
       
    }

    checkInput(input){
        if(input == ""){
            return ("No has proporcionado un valor para apostar");
        }else{
            input = parseFloat(input);
            if(isNaN(input)){
                return ("El valor a apostar debe ser un numero entero");
            }
            else if(input <= 0){
                return "El valor a apostar debe ser mayor de 0";
            }
            else if(input > this.points){
                return "El valor a apostar es mayor que tus puntos";
            }
            else{
                return "ok";
            }
        }
    }

    checkGameResults(selected){
       

        var winnerPos = -1;

        //Esta lista almacena un número entre 0 a 1 en la posición de cada jugador que usaremos para elegir jugador
        var listBias = [];
        var sum = 0;

        this.pilotos.lista.forEach(function(piloto){
            sum += piloto.probabilidad;
            listBias.push(sum);
        })

        var r = Math.random() * sum;

        for(var i = 0; i < listBias.length; i++){
            if(listBias[i] >= r && winnerPos==-1){
                winnerPos = i;
            }
        }

        if(this.pilotos.lista[winnerPos].nombre == selected){
            this.winner(winnerPos);
        }else{
            this.loser();
        }

       

    }

    winner(pos){
        
        //Los puntos ganados dependen de la probabilidad de ganar del piloto. A menor probabilidad, más se gana
        var earnedPoints = this.apostado / this.pilotos.lista[pos].probabilidad;

        this.points += earnedPoints;

        this.points = Math.round(this.points*100)/100;

        //Actualizamos los puntos de las cookies
        localStorage.setItem("puntos", this.points);

        this.showEndingMessage("Has ganado "+earnedPoints +" puntos");


        $("article:first > p").text(this.points);
    }

    loser(){

        //Pierdes lo apostado
        
        this.points -= this.apostado;

        this.points = Math.round(this.points*100)/100;

        //Actualizamos los puntos de las cookies
        localStorage.setItem("puntos", this.points);

        this.showEndingMessage("Has perdido "+this.apostado +" puntos");

        $("article:first > p").text(this.points);
    }

    showEndingMessage(msg){
        var resultP = document.querySelector("main > article:last-of-type > p");
        if(resultP==null){
            resultP = document.createElement("p");
        }

        resultP.textContent = msg;
        document.querySelector("main > article:last-of-type").appendChild(resultP);
    }

    restartGame(){
        //Reactivar botones
        document.querySelectorAll("main > article > article button").forEach((button)=>button.removeAttribute("disabled"));

        this.randomizeProbabilities();
        this.writeProbabilities();
    }

    writeProbabilities(){

        var ps = document.querySelectorAll("main > article:last > article > p");

        for(var i = 0; i < this.pilotos.lista.length; i++){

            ps[i].textContent = "Probabilidad de ganar: "+this.pilotos.lista[i][1]+"%";
        }
    }
}



