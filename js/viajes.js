"use strict"

class Viajes{
    
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getInfo.bind(this), this.error.bind(this));
    }

    getInfo(pos){
        this.longitud = pos.coords.longitude;
        this.latitud = pos.coords.latitude;
        this.altitud = pos.coords.altitude;

        this.showStaticMap();

    }

    error(err){
        var message = "ERROR";

        switch(err.code){

            case err.PERMISSION_DENIED:
                message = "Acceso a la localización denegada. Por favor, permita el acceso a su localización y vuelva a intentarlo";
                break;
            case err.POSITION_UNAVAILABLE:
                message = "No pudimos acceder a su localización";
                break;
            case err.TIMEOUT:
                message = "Tiempo de espera máximo alcanzado";
                break;
            case err.UNKNOWN_ERROR:
                message = "Se ha producido un error desconocido";
                break;
        }

        $("main").append("<p></p>").text(message);

    }

    async showStaticMap(){
        var p = $("<p></p>");
        
        p.text("Mapa estático");

        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center="+this.latitud+","+this.longitud;

        var tamaño = "&size=200x100";
        var marcador = "&markers=color:red%7Clabel:P%7C"+this.latitud+","+this.longitud;

        var mapaImagen = url+centro+tamaño+marcador+apiKey;
        var img = $("<img>")
        img.attr({
            src : mapaImagen,
            alt : "mapa estático de tu localización"
        });

        $("main > section.first").append(p);
        $("main > section:first").append(img);
        


        
    }

    async showDynamicMap(){
        var centro = {lat: 0, lng:0};

        const { Map } = await google.maps.importLibrary("maps");


        var mapa = new Map(document.querySelector("main div"), {
            zoom : 15,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infoWindow = new google.maps.InfoWindow;

        if(navigator.geolocation){

            navigator.geolocation.getCurrentPosition(function(pos){

                $("<p></p>").text("Mapa dinámico").insertBefore($("main div:first"));

                centro.lat = pos.coords.latitude;
                centro.lng = pos.coords.longitude;

                infoWindow.setPosition(centro);
                infoWindow.setContent("¡Te encontré!")
                infoWindow.open(mapa);

                mapa.setCenter(centro);
            }, function(){
                infoWindow.setContent("Algo ha salido mal. No pudimos conseguir tu localización")
            })  
            
        }
    }

    handleCarrusel(){
        var imagenes = document.querySelectorAll("main > section img");

        var nextButton = document.querySelector("section > button:first-of-type");
        var prevButton = document.querySelector("section > button:last-of-type");

        var currImg = 0;
        var maxImg = imagenes.length-1;

        // add event listener and navigation functionality
        nextButton.addEventListener("click", function () {
        // check if current slide is the last and reset current slide
            if (currImg === maxImg) {
                currImg = 0;
                } else {
                currImg++;
            }

            //   move slide by -100%
            imagenes.forEach((img, indx) => {
                var trans = 100 * (indx - currImg);
                $(img).css('transform', 'translateX(' + trans + '%)')
            });
        });

        // add event listener and navigation functionality
        prevButton.addEventListener("click", function () {
        // check if current slide is the first and reset current slide to last
        if (currImg === 0) {
        currImg = maxImg;
        } else {
        currImg--;
        }

        //   move slide by 100%
        imagenes.forEach((img, indx) => {
        var trans = 100 * (indx - currImg);
        $(img).css('transform', 'translateX(' + trans + '%)')
        });
        });


        }


}

var viaje = new Viajes();

