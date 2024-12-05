"use strict"

class Agenda{

    constructor(){
        this.url = "https://api.jolpi.ca/ergast/f1/current/";
        $("button").click(this.getInfo.bind(this));
    }

    getInfo(){
        $.ajax({
            url: this.url,
            method: 'GET',
            success: function(data){
                var races = data.MRData;
                races = races.RaceTable.Races;
                (races).forEach(function (race){

                    var nombreCarrera = race.raceName;
                    var nombreCircuito = race.Circuit.circuitName;
                    var latitud = race.Circuit.Location.lat;
                    var longitud = race.Circuit.Location.long;
                    var fecha = race.date;
                    var hora = race.time;

                    var section = $("<section></section>");

                    section.append($("<h3></h3>").text(nombreCarrera));
                    section.append($("<p></p>").text(nombreCircuito));
                    section.append($("<p></p>").text("Coordenadas: "+latitud+", "+longitud));
                    section.append($("<p></p>").text("Fecha: "+fecha+" - "+hora));

                    $("main").append(section);
                    $("button").attr("disabled","disabled");
                })
                
            },
            error : function(err){

                $("main").append($("<p></p>").text("Hubo un error obteniendo las carreras"));
            }
        });
    }

}