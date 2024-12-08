"use strict"

class Memoria{

    
    elements = {
        cards : [
            {"element" : "RedBull", "source" : "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"},
            {"element" : "RedBull", "source" : "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"},
            {"element" : "McLaren", "source" : "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"},
            {"element" : "McLaren", "source" : "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"},
            {"element" : "Alpine", "source" : "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"},
            {"element" : "Alpine", "source" : "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"},
            {"element" : "AstonMartin", "source" : "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"},
            {"element" : "AstonMartin", "source" : "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"},
            {"element" : "Ferrari", "source" : "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"},
            {"element" : "Ferrari", "source" : "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"},
            {"element" : "Mercedes", "source" : "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"},
            {"element" : "Mercedes", "source" : "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"}
        ]
    }
    

    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    };

    shuffleElements(){
        var size = this.elements.cards.length-1;

        for(var i = size; i >= 0; i--){
            var pos = Math.floor(Math.random() * i);

            var tempElement = this.elements.cards[pos];

            this.elements.cards[pos] = this.elements.cards[i];
            this.elements.cards[i] = tempElement;
        }

    }

    unflipCards(){
        this.lockBoard = true;
       
        setTimeout(()=>{
            this.firstCard.removeAttribute("data-state");
            this.secondCard.removeAttribute("data-state");
            this.resetBoard();
        }, 700);
        
        

    }

    resetBoard(){
        this.firstCard=null;
        this.secondCard=null;
        this.hasFlippedCard=false;
        this.lockBoard=false;
    }

    disableCard(){

        this.firstCard.setAttribute("data-state", "revealed");
        this.secondCard.setAttribute("data-state", "revealed");
        this.resetBoard();
    }

    checkForMatch(){
        this.firstCard.getAttribute("data-element")==this.secondCard.getAttribute("data-element") ? this.disableCard() : this.unflipCards();
    }

    createElements(){
        var section = document.querySelector("body section:first-of-type");
        for(var card of this.elements.cards){
            var article = document.createElement("article");
            article.setAttribute("data-element", card.element);

            var h3 = document.createElement("h3");
            h3.textContent = "Tarjeta de memoria";

            article.appendChild(h3);

            
            var image = document.createElement("img");
            image.src = card.source;
            image.alt = card.element;

            article.appendChild(image);
            
            section.appendChild(article);
        }
    }

    flipCard(game){
        if(this.getAttribute("data-state") == "revealed"){
            return;
        }
        if(game.lockBoard){
            return;
        }
        if(this == game.firstCard){
            return;
        }

        this.setAttribute("data-state", "flip");

        if(!game.hasFlippedCard){
            game.hasFlippedCard = true;
            game.firstCard = this;
        }else{
            game.secondCard = this;
            game.checkForMatch();
        }
    }

    addEventListeners(){
        var articles = document.querySelectorAll("section > article");

        for(var article of articles){
            article.onclick = this.flipCard.bind(article,this);
            article.onkeydown = this.flipCard.bind(article,this);
        }
    }
}