"use strict"

function cargarXML(files){

    var file = files[0];

    $.ajax({
        dataType: "xml",
        url: "xml/"+file.name,
        method: "GET",
        success: function(data){

            var nombre = $("circuit",data).attr("name");
            var vueltas = $("circuit",data).attr("numberLaps");
            var hora = $("date",data).attr("time");
            var fecha = $("date",data).text();
            var pais = $("location",data).attr("country");
            var ciudad = $("location",data).text();
            var distancia = $("length",data).text()+$("length",data).attr("units");
            var anchura = $("width",data).text()+$("width",data).attr("units");
            var referencias = $(data).find("reference");
            var ref1 = $(referencias[0]).text();
            var ref2 = $(referencias[1]).text();
            var ref3 = $(referencias[2]).text();
            var fotos = $(data).find("foto");
            var foto1 = $(fotos[0]).text();
            var foto2 = $(fotos[1]).text();
            var centroLat = $("coordinates",data).attr("latitude");
            var centroLong = $("coordinates",data).attr("longitude");
            var centroAlt = $("coordinates",data).attr("height");
            var secciones = $(data).find("section");

            var section = $("<section></section>");
            section.append($("<h3></h3>").text(nombre));
            section.append($("<p></p>").text("Número de vueltas: "+vueltas));
            section.append($("<p></p>").text("Longitud del circuito: "+distancia));
            section.append($("<p></p>").text("Anchura media: "+anchura));
            section.append($("<img>").attr({
                src : foto1,
                alt : "foto del circuito"
            }));

            section.append($("<h4></h4>").text("Fecha de la carrera"));
            section.append($("<p></p>").text("Día: "+fecha));
            section.append($("<p></p>").text("Hora: "+hora));

            section.append($("<h4></h4>").text("Localización"));
            section.append($("<p></p>").text("País: "+pais));
            section.append($("<p></p>").text("Ciudad: "+ciudad));

            section.append($("<h4></h4>").text("Datos del circuito"));
            section.append($("<p></p>").text("Coordenadas línea de meta: "+centroLat+", "+centroLong+", "+centroAlt));
            section.append($("<p></p>").text("Secciones: "));

            var seccionesHtml = "";

            $.each(secciones,function(index,seccion){
                seccionesHtml += "<li>Distancia: "+$(seccion).attr("distance")+" - Coordenadas punto final: "+$(seccion).attr("latitude")+", "+$(seccion).attr("longitude")+", "+$(seccion).attr("height")+"</li>";
            });

            section.append($("<ol></ol>").html(seccionesHtml));

            section.append($("<img>").attr({
                src : foto2,
                alt : "secciones del circuito"
            }));

            var h4Ref = $("<h4></h4>").text("Referencias");

            var a1 = $("<a></a>").text("Página web del circuito ").attr("href", ref1);
            var a2 = $("<a></a>").text("Página web de la formula 1 ").attr("href", ref2);
            var a3 = $("<a></a>").text("Página web de la ciudad de Austin ").attr("href", ref3);

           
            section.append(h4Ref);
            section.append(a1);
            section.append(a2);
            section.append(a3);

            $("input:first").attr("disabled","disabled");

            //section.after($("main > section:nth-of-type(3)"))

            $("main > section:nth-of-type(3)").after(section)
            //$("main").append(section);
            
        }
    })
}

function cargarKML(files){

    var file = files[0];

    $.ajax({
        dataType : "xml",
        url : "xml/"+file.name,
        method : "GET",
        success : function(data){

            var coordinates = $("coordinates",data).text();

            coordinates = coordinates.split("\n");

            var map = new google.maps.Map(document.querySelector("main > div"), {
                center: new google.maps.LatLng(30.130027, -97.636873),
                zoom: 15,
                mapId: "KMLMapa",
                mapTypeId: 'terrain'
            });

            var points = [];

            coordinates.forEach(coord => {
                //El primer y último valor están vacíos, entonces por eso hay esta condición.
                if(coord != ""){
                    var coordinate = coord.split(',');

                    var point = {
                        lat: parseFloat(coordinate[1]), 
                        lng: parseFloat(coordinate[0])
                    }

                    points.push(point);
                
                    new google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: point,
                    });

                    var línea = new google.maps.Polyline({
                        path: points,
                        geodesic: true,
                        strokeColor: "#FF0000",
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                    });

                    línea.setMap(map);

                    
                }
                
            });
            $("input:nth-of-type(2)").attr("disabled","disabled");
        }
    });
}

function cargarSVG(files){

    var file = files[0];

    /*
    $.ajax({
        dataType : "xml",
        url : "xml/"+file.name,
        method : "GET",
        success : function(data){

            var points = $("polyline", data).attr("points");
            var style = $("polyline", data).attr("style");

            var svg = $("<svg></svg>").attr({
                viewbox: "0 0 700 400",
                role : "img",
                width : "700",
                height : "400"
            });

            svg.append($("<title></title>").text("Perfil del circuito"));

            svg.append($("<polyline></polyline>").attr({
                points : points,
                style : style
            }));

            $("main > section:last").append(svg);

            $("input:last").attr("disabled","disabled");
            
        }
    }); */

    var reader = new FileReader();

    reader.onload = (function(){
        var svg = reader.result;

        var article = $("<article></article>")

        article.append($("<h3></h3>").text("Planimetría del circuito"))
        article.append(svg);

        $("main").append(article)
    });

    reader.readAsText(file);

}
 