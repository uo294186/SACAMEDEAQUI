import xml.etree.ElementTree as ET

def prologoSVG(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo SVG"""

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 300">\n')
 
    archivo.write('<polyline points="\n')
    

def epilogoSVG(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo SVG"""

    archivo.write('\nstyle="fill:white;stroke:blue;stroke-width:3"/>\n')
    archivo.write("</svg>\n")

def dataXML(fileXML):
    try:
        arbol = ET.parse(fileXML)
    except IOError:
        print("No se pudo abrir ", fileXML)
        exit()
    except ET.ParseError:
        print("Error procesando ",fileXML)
       
        exit()
    
    res = []
    length = 0
    raiz = arbol.getroot()
    namespace = {"np" : "http://www.uniovi.es"}
    for hijo in raiz.findall('.//np:circuit/np:sections/np:section', namespaces=namespace):
        attrib = hijo.attrib
        section = [attrib.get("distance"), attrib.get("height")]
        res.append(section)
    for hijo in raiz.findall('.//np:circuit/np:length', namespaces=namespace):
        length = float(hijo.text)
    return res, length
    
def dataToSvg(data,file):
    try:
        salida = open("perfil" + ".svg",'w')
    except IOError:
        print ('No se puede crear el archivo ')
        exit()
    
    prologoSVG(salida,file)
    s = ""
    for d in data:
        s += coordToString(d)
    salida.write(s+'"')
    epilogoSVG(salida)
    
def coordToString(coord):
    s = str(coord[0]) + "," + str(coord[1])+"\n"
    return s

def convertData(data,length):
    initX = 10
    #limite x
    endX = 460
    #punto más bajo
    initH = 260

    #altura mínima
    d0h = min([row[1] for row in data])
    d0x = data[0][0]
    dfx = length-data[0][0]
    diffx= (dfx-d0x)

    sumx = 0

    res=[]
    for d in data:
        h = d[1]
        x = d[0]
        sumx = sumx+x
        newH = d0h/h * initH
        newX = (sumx-d0x)/diffx * (endX-initX) + initX

        val = [newX, newH]
        res.append(val)
    
    #punto que creo para cerrar la polilínea 
    p0 = [0, initH+40]
    pf = [res[-1][0]+20, initH+40]
    res.insert(0, p0)
    res.append(pf)
    res.append(p0)
    return res

def toNumbers(data):
    res = []

    for d in data:
        n = [float(d[0]), float(d[1])]
        res.append(n)
    return res

    
def main():

    file = "circuitoEsquema.xml"

    res,length = dataXML(file)
    res = toNumbers(res)
    res = convertData(res,length)
    dataToSvg(res,file)
    print("fin")

if __name__=="__main__":
    main()