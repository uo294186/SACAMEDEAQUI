"use strict"

class Fondo{

    constructor(country, capital, circuit){
        this.country = country;
        this.capital = capital;
        this.circuit = circuit;
    }

    getImageCircuit(){
        var flickrAPI = "https://www.flickr.com/services/rest/?";
        $.getJSON(flickrAPI, 
            {
                method : "flickr.photos.search",
                api_key : "114c73f9707e8ab1ace5b67f71accc72",
                tags:  this.circuit+", formula1",
                tag_mode: "all",
                format: "json",
                nojsoncallback:"1"
            })
        .done(function(data) {
            //Pillo la foto número 14 porque mi piloto es el nano
            var item = data.photos.photo[14];

            var url = "https://live.staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_b.jpg";

            var style = {
                width : "auto",
                height: "100vh",
                backgroundImage: "url("+url+")",
                backgroundSize : "100% 100%",
                backgroundPosition : "center",
                backgroundRepeat: "no-repeat",
                margin: "0"
            };
            var body = $("body");
            body.css(style);
    })
    .fail(function(err){
        console.log(err);
    });
    }
}