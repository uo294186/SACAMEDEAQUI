import xml.etree.ElementTree as ET

def prologoKML(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")    
    archivo.write("<LineString>\n")
    #la etiqueta <extrude> extiende la línea hasta el suelo 
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")

def epilogoKML(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo KML"""

    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n") 
    archivo.write("<LineStyle>\n") 
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")

def coordenadasXML(fileXML):
    try:
        arbol = ET.parse(fileXML)
    except IOError:
        print("No se pudo abrir ", fileXML)
        exit()
    except ET.ParseError:
        print("Error procesando ",fileXML)
       
        exit()
    
    res = []
    raiz = arbol.getroot()
    namespace = {"np" : "http://www.uniovi.es"}
    for hijo in raiz.findall('.//np:circuit/np:sections/np:section', namespaces=namespace):
        attrib = hijo.attrib
        section = [attrib.get("latitude"), attrib.get("longitude"), attrib.get("height")]
        res.append(section)
    return res
    
def coordToKml(coords,file):
    try:
        salida = open("circuito" + ".kml",'w')
    except IOError:
        print ('No se puede crear el archivo ')
        exit()
    
    prologoKML(salida,file)
    for coord in coords:
        salida.write(coord+"\n")
    epilogoKML(salida)
    
def coordToString(coords):
    res = []
    for coord in coords:
        s = str(coord[1]) + "," + str(coord[0]) + "," + str(0)
        res.append(s)
    res.append(res[0])
    return res

def main():

    file = "circuitoEsquema.xml"

    res = coordenadasXML(file)
    res = coordToString(res)
    coordToKml(res,file)

    print("fin :)")

if __name__=="__main__":
    main()