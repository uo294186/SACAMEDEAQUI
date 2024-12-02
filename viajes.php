<!DOCTYPE HTML>

<html lang="es">
<?php 
    class Carrusel{
        private $capital;
        private $pais;
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
                for($i = 0; $i<10; $i++){
                    $photo = $photos->photo[$i];

                    $src = "https://live.staticflickr.com/".$photo->server."/".$photo->id."_".$photo->secret.".jpg";

                    $img = "<img src=".$src." alt= 'Foto del Pais' />";

                    echo $img;
                }
            }

            echo "<button> &gt </button>";
            echo "<button> &lt </button>";
        }
    }

    class Moneda{
        private $from;
        private $to;
        private $amount;

        public function __construct($from, $to)
        {
            $this->from = $from;
            $this->to = $to;
            $this->amount = "1";
        }

        public function currencyExchange(){
            $url = "http://www.geoplugin.net/currency/json.gp?";

            $url."from=".$this->from;
            $url."to=".$this->to;
            $url."amount=".$this->amount;

            $json = json_decode(file_get_contents($url));

            if($json!=null){
                $res = $json["to_amount"];

                echo "<p>1€ equivale a ".$res."$</p>";
            }

        }
    }
?>
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <!--Titulo del documento-->
    <title>Viajes</title>
    <link rel="icon" href="multimedia/imágenes/F1Desktopfavicon.ico"/>

    <!--Autor del documento-->
    <meta name ="author" content="Manuel Méndez Fernández"/>

    <!--Descripción del documento-->
    <meta name = "description" content="Viajes"/>

    <!--Palabras clave del contenido-->
    <meta name="keywords" content="f1 viajes, formula1 viajes"/>
    <!--Definición ventana gráfica-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- añadir el elemento link de enlace a la hoja de estilo dentro del <head> del documento html -->
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <!--hoja de estilo con el layout del documento-->
    <link rel="stylesheet" type="text/css" href="estilo/layout.css"/>

    <!--REF. JQUERY-->
    <!--Por encima de cualquier declaración a otros archivos js propios-->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
     <!--JavaScript para viajes-->
     <script src="js/viajes.js"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" title="Inicio">Inicio</a>
            <a href="piloto.html" title="Piloto">Piloto</a>
            <a href="noticias.html" title="Noticias">Noticias</a>
            <a href="calendario.html" title="Calendario">Calendario</a>
            <a href="meteorología.html" title ="Meteorología">Meteorología</a>
            <a href="circuito.html" title="Circuito">Circuito</a>
            <a href="viajes.php" title="Viajes" class="active">Viajes</a>
            <a href="juegos.html" title="Juegos">Juegos</a>
        </nav>
    </header>

    <p>
        Estás en: <a href="index.html">Inicio</a> >> Viajes
    </p>

    <h2>Viajes</h2>
    <main>
        <?php
        $moneda = new Moneda("EUR", "USD");
        $moneda->currencyExchange();
        ?>
        <section>
            <h3>Mapa estático</h3>
        </section>
        <div></div>
        <section>
            <h3>Fotos</h3>
            <?php
            $carrousel = new Carrusel("Washington D.C", "Estados Unidos");
            $carrousel->createCarrusel();
            ?>
            <script>
                viaje.handleCarrusel();
            </script>
        </section>
        
       
    </main>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCcJRBapIIqkmhOtDcY0bxmKJF81y1lWIw&callback=viaje.showDynamicMap">
</script>
</body>
</html>