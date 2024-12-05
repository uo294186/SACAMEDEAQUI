<!DOCTYPE HTML>

<html lang="es">
    <?php 
        class Record{
            private $server;
            private $user;
            private $pass;
            private $dbname;
        
            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2024";
                $this->pass = "DBPSWD2024";
                $this->dbname = "records";
            }

            public function getServer(){
                return $this->server;
            }

            public function getUser(){
                return $this->user;
            }

            public function getPass(){
                return $this->pass;
            }

            public function getDbname(){
                return $this->dbname;
            }
        }
    ?>

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <!--Titulo del documento-->
    <title>Juego de Reacción</title>
    <link rel="icon" href="/F1Desktop/multimedia/imágenes/F1Desktopfavicon.ico"/>

    <!--Autor del documento-->
    <meta name ="author" content="Manuel Méndez Fernández"/>

    <!--Descripción del documento-->
    <meta name = "description" content="Juego de Reacción"/>
    <!--Palabras clave del contenido-->
    <meta name="keywords" content="f1 juegos, formula1 juegos, juegos de reacción"/>

    <!--Definición ventana gráfica-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- añadir el elemento link de enlace a la hoja de estilo dentro del <head> del documento html -->
    <link rel="stylesheet" type="text/css" href="/F1Desktop/estilo/estilo.css" />
    <!--hoja de estilo con el layout del documento-->
    <link rel="stylesheet" type="text/css" href="/F1Desktop/estilo/layout.css"/>

    <!--hoja de estilo del juego-->
    <link rel="stylesheet" type="text/css" href="/F1Desktop/estilo/semaforo.css"/>

    <!--REF. JQUERY-->
    <!--Por encima de cualquier declaración a otros archivos js propios-->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!--JavaScript para juego de Reaccion-->
    <script src="/F1Desktop/js/semaforo.js"></script>
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
            <a href="/F1Desktop/viajes.html" title="Viajes">Viajes</a>
            <a href="/F1Desktop/juegos.html" title="Juegos" class="active">Juegos</a>
        </nav>
    </header>


    <p>
        Estás en: <a href="/F1Desktop/index.html">Inicio</a> >> <a href="/F1Desktop/juegos.html">Juegos</a> >> Juego de Reacción  
    </p>


    <h2>Juegos</h2>
    <p>Lista de juegos</p>
    <nav>
        <a href = "/F1Desktop/memoria.html" title="Juego de Memoria">Juego de Memoria</a>
        <a href = "/F1Desktop/php/semaforo.php" title="Juego de Memoria">Juego de Reacción</a>
        <a href = "/F1Desktop/api.html" title="Juego de Memoria">Api</a>
    </nav>

    <main>
        
    </main>

    

   

<script>
    var semaforo = new Semaforo();
</script>
<?php 
    if(count($_POST) > 0){
        $record = new Record();

        $db = new mysqli($record->getServer(), $record->getUser(), $record->getPass(), $record->getDbname());

        //$db = new mysqli("localhost", "DBUSER2024", "DBPSWD2024", "records");

        if($db->connect_errno){
            echo "<p>No se pudo acceder a la base de datos</p>";
        }else{
            $query = $db->prepare("insert into registro (nombre, apellido, nivel, tiempo) values (?,?,?,?)");

            $query->bind_param('ssdd', 
                $_POST["nombre"], $_POST["apellido"],$_POST["nivel"],$_POST["tiempo"]);
            
            $query->execute();

            $query->close();
            //$db->close();

            $query = "select * from registro order by tiempo asc limit 10";

            $res = $db->query($query);

            echo "<h3> Ranking top 10 </h3>";
            echo "<ol>";
            while($r = $res->fetch_assoc()){
                echo "<li>".$r["nombre"]."-".$r["apellido"]."-".$r["nivel"]."-".$r["tiempo"]."</li>";
            }
            echo "</ol>";
        }
    }

?>
</body>
</html>