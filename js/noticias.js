"use strict"
class Noticias{

    constructor(){
        this.soporta = window.File&&window.FileReader&&window.FileList&&window.Blob;
        $("form").submit(this.readUserInput);
    }

    readInputFile(files){
        var file = files[0];

        if(this.soporta){
            if(file.type.match("text.*/")){

                var reader = new FileReader();
                reader.onload = function(e){
                    var lineas = reader.result;
    
                    lineas.split('\n').forEach(function(line){
                        var contenido = line.split('_');
    
                        var titulo = contenido[0];
                        var entradilla = contenido[1];
                        var autor = contenido[2];
    
                        var article =  $("<article></article>");
                        article.append($("<h3></h3>").text(titulo))
                        article.append($("<p></p>").text(entradilla));
                        article.append($("<p></p>").text(autor));

                        $("main > section:last").append(article);
                    });
                }
    
                reader.readAsText(file);
            }else{
                $("main").append($("<p></p>").text("Tipo de archivo incorrecto"));
            }
        }else{
            $("main").append($("<p></p>").text("Su navegador no soporta lectura de fichero"));
        }

        
    }

    readUserInput(event){

        event.preventDefault();

        var titulo = document.querySelector("form > input:first-of-type").value;
        var entradilla = document.querySelector("form > textarea").value;
        var autor = document.querySelector("form > input:nth-of-type(2)").value;

        var article =  $("<article></article>");
        article.append($("<h3></h3>").text(titulo))
        article.append($("<p></p>").text(entradilla));
        article.append($("<p></p>").text(autor));

        $("main > section:last").append(article);
        
    }

    
}

