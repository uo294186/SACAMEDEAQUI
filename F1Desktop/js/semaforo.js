"use strict"

class Semaforo{

    levels = [0.2, 0.5, 0.8];


    constructor(){
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.createStructure();
    }

    createStructure(){
        var main = document.querySelector("main");

        var header = document.createElement("h2");
        header.textContent = "Juego de Reacción";

        main.appendChild(header);

        for(var i = 0; i < this.lights; i++){
            var div = document.createElement("div");

            main.appendChild(div);
        }

        var arranque = document.createElement("button")
        arranque.textContent = "Arranque";
        arranque.onclick = this.initSequence.bind(arranque, this);

        var reaccion = document.createElement("button")
        reaccion.textContent = "Reacción";
        reaccion.setAttribute("disabled", "");
        reaccion.onclick = this.stopReaction.bind(this);

        main.appendChild(arranque);
        main.appendChild(reaccion);
    }

    initSequence(game){
        var main = document.querySelector("main");
        main.classList.add("load");

        this.setAttribute("disabled", "");

        setTimeout(()=>{
            game.unload_moment = Date.now();
            game.endSequence();
        }, 2000 + game.difficulty*100);

    }

    endSequence(){
        var main = document.querySelector("main");
        main.classList.remove("load");
        main.classList.add("unload");

        var reaccion = document.querySelector("main button:last-of-type");
        reaccion.removeAttribute("disabled");
    }

    stopReaction(){
        this.clic_moment = Date.now();

        var reactionTime = ((this.clic_moment - this.unload_moment)/1000).toFixed(3);

        var message = "Tu tiempo de reacción fue de: "+reactionTime+" segundos";

        var p = document.querySelector("main > p");

        if(p == null){
            p = document.createElement("p");
        }
        p.textContent = message;

        var main = document.querySelector("main");
        main.appendChild(p);

        main.classList.remove("unload");

        var arranque = document.querySelector("main button:first-of-type")
        arranque.removeAttribute("disabled");

        var reaccion = document.querySelector("main button:last-of-type")
        reaccion.setAttribute("disabled", "");

        this.createRecordForm(reactionTime);
    }

    createRecordForm(reactionTime){

        var form = $("<form></form>").attr({
            action : "#",
            method : "post"
        });

        var name = $("<input>").attr({
            type : "text",
            name : "nombre",
            required : ""
        });

        var surname = $("<input>").attr({
            type : "text",
            name : "apellido",
            required : ""
        });

        var level = $("<input>").attr({
            type : "text",
            name : "nivel",
            value : this.difficulty,
            readonly : ""
        });

        var result = $("<input>").attr({
            type : "text",
            name : "tiempo",
            value : reactionTime,
            readonly : ""
        });

        var submit = $("<input>").attr({
            type : "submit",
            value : "Guardar"
        });

        form.append(name);
        form.append(surname);
        form.append(level);
        form.append(result);
        form.append(submit);

        $("button:last").after(form);
    }
}