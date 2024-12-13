<!DOCTYPE HTML>

<html lang="es">
<?php 
    class Carrusel{
        private $capital;
        private $pais;
        private $photos;
        public function __construct($capital, $pais){
            $this->capital = $capital;
            $this->pais = $pais;
        }

        public function createCarrusel(){
            $params = array(
                "api_key"=> "114c73f9707e8ab1ace5b67f71accc72",
                "method" => "flickr.photos.search",
                "tags" => $this->capital.",".$this->pais,
                "tag_mode" => "all",
                "format"=> "json",
                "nojsoncallback"=>"1"
            );

            $encoded = array();

            foreach($params as $k => $v){
                $encoded[] = urlencode($k)."=".urlencode($v);
            }

            $url = "https://www.flickr.com/services/rest/?".implode('&', $encoded);

            $res = file_get_contents($url);
            $json = json_decode($res);

            if($json != null){
                $photos = $json->photos;
                $this->photos = $photos->photo;
            }

            echo $this->photos;
        }
    }
?>
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <!--Titulo del documento-->
    <title>Viajes</title>
    <link rel="icon" href="/F1Desktop/multimedia/imágenes/F1Desktopfavicon.ico"/>

    <!--Autor del documento-->
    <meta name ="author" content="Manuel Méndez Fernández"/>

    <!--Descripción del documento-->
    <meta name = "description" content="Viajes"/>

    <!--Palabras clave del contenido-->
    <meta name="keywords" content="f1 viajes, formula1 viajes"/>
    <!--Definición ventana gráfica-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- añadir el elemento link de enlace a la hoja de estilo dentro del <head> del documento html -->
    <link rel="stylesheet" type="text/css" href="/F1Desktop/estilo/estilo.css" />
    <!--hoja de estilo con el layout del documento-->
    <link rel="stylesheet" type="text/css" href="/F1Desktop/estilo/layout.css"/>

    <!--REF. JQUERY-->
    <!--Por encima de cualquier declaración a otros archivos js propios-->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
     <!--JavaScript para viajes-->
     <script src="/F1Desktop/js/viajes.js"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="/F1Desktop/index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="/F1Desktop/index.html" title="Inicio">Inicio</a>
            <a href="/F1Desktop/piloto.html" title="Piloto">Piloto</a>
            <a href="/F1Desktop/noticias.html" title="Noticias">Noticias</a>
            <a href="/F1Desktop/calendario.html" title="Calendario">Calendario</a>
            <a href="/F1Desktop/meteorología.html" title ="Meteorología">Meteorología</a>
            <a href="/F1Desktop/circuito.html" title="Circuito">Circuito</a>
            <a href="/F1Desktop/viajes.html" title="Viajes" class="active">Viajes</a>
            <a href="/F1Desktop/juegos.html" title="Juegos">Juegos</a>
        </nav>
    </header>

    <p>
        Estás en: <a href="/F1Desktop/index.html">Inicio</a> >> Viajes
    </p>

    <h2>Viajes</h2>
    <main>
        <article>
            <h3>Fotos</h3>
            <?php
                $carrousel = new Carrusel("Washington D.C", "Estados Unidos");
                $carrousel->createCarrusel();
            ?>
            <script>
                //viaje.handleCarrusel();
            </script>
        </article>
        <div></div>
       
    </main>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcJRBapIIqkmhOtDcY0bxmKJF81y1lWIw&callback=viaje.showDynamicMap">
</script>
</body>
</html>