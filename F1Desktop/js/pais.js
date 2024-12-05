"use strict"

class Pais{
    constructor(nombrePais,nombreCapital,nombreCircuitoF1){
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.nombreCircuitoF1 = nombreCircuitoF1;
        this.fillAttributes();
    }

    fillAttributes(){
        this.población = 335135000;
        this.formaGobierno = "República";
        this.longitud = 30.13;
        this.latitud = -97.64;
        this.height = 164;
        this.religionMayoritaria = "Protestantismo";
    }

    getName(){
        return "Nombre: "+this.nombrePais;
    }

    getCapital(){
        return "Capital: "+this.nombreCapital;
    }

    getCountrySecInfo(){
        return "<ul>"+
        "<li>Nombre del circuito: "+this.nombreCircuitoF1+"</li>"+
        "<li>Población: "+this.población+"</li>"+
        "<li> Forma de gobierno: "+this.formaGobierno+"</li>"+
        "<li> Religión mayoritaria: "+this.religionMayoritaria+"</li>" 
        +"</ul>";
    }

    writeCoordinates(){
        document.write("<p>Coordenadas líne de meta: "+this.longitud+", "+this.latitud+", "+this.height+"</p>");
    }

    writeElements(){
        document.write("<p>"+this.getName()+"</p>");
        document.write("<p>"+this.getCapital()+"</p>");
        document.write(this.getCountrySecInfo());
        this.writeCoordinates();
    }

    getWeather(){
        var temp = "https://api.openweathermap.org/data/2.5/forecast?lat=30.13&lon=-97.64&mode=xml&units=metric&lang=es&APPID=4a3ec87dba999b5fa97db207c6cfd5eb";
        $.ajax(
            {
                dataType : "xml",
                url : temp,
                method : 'GET',
                success : function(data){
                    var time = $("time:first-of-type",data).attr("from");
                    
                   
                        
                   
                    for(var i = 0; i < 5; i++){
                        var n = 1+i*8;
                        var day = $("forecast time:nth-child("+n+")", data)

                        var maxTemp = $("temperature",day).attr("max")+"ºC";
                        var minTemp = $("temperature",day).attr("min")+"ºC";
                        var humedad = $("humidity",day).attr("value")+$("humidity",day).attr("unit");
                        var icon = $("symbol", day).attr("var");
                        icon = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
                        var lluvia = $("precipitation", day).attr("value");

                        if(lluvia == undefined){
                            lluvia = "No disponible";
                        }else{
                            lluvia += "mm";
                        }

                        var article =  $("<article></article>");
                        article.append('<img alt="imagen del tiempo" src='+icon+'>');
                        article.append("<h4>Rango de temperaturas</h4>");
                        article.append("<p>"+minTemp+"-"+maxTemp+"</p>");
                        article.append("<h4>Humedad</h4>");
                        article.append("<p>"+humedad+"</p>");
                        article.append("<h4>Lluvia</h4>");
                        article.append("<p>"+lluvia+"</p>");

                        $("section").append(article);
                    }
                  
                    
                 
                },
                error : function(){
                    console.log("Error")
                }
                
                
            }
        )
    }
   
    

}