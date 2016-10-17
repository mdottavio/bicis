# 🚴 :biking_woman: bicis
> Chequea el estado de las estaciones Ecobici de la cidudad de Buenos Aires desde tu consola.

Este comando te permite ver el estado de las estaciones Ecobici de la ciuad de Buenos Aires en tiempo real. La información esta basada en [el endpoint](http://data.buenosaires.gob.ar/dataset/disponibilidad-bicicletas) que provee el gobierno de la ciudad a travez de su [portal de Datos](http://data.buenosaires.gob.ar/).

Vas a poder agregar estaciones como favoritas para centrar los reportes en los lugares que te interesan.

## Instalación

```
$ npm install -g bicis
```

## Como usar el comando

Por defecto el comando va a mostrarte todas las estaciones disponibles con bicis de la ciudad; en tu consola, corre el comando:

```
bicis
```
Una vez que identificaste las estaciones que usas más seguido, agregalas como favoritas para filtrar el reporte;

### Buscar una estación
Para buscar una estación ejecuta el siguiente comando:
```
bicis -b Emilio
```

### Agregar estaciones a tus favoritas

Las estaciones favoritas se identifican por su `ID`, una vez que encuentres el ID de tu estación en la lista de estaciones, tenes que correr el comando `bicis -a [ID]`.
Por ejemplo, para agregar la estación `515` como favorita, ejecuta el siguiente comando:
```
bicis -a 515
```

### Remover estaciones de tus favoritas

Para remover una estación de tus favoritos, tenes que correr el comando `bicis -r [ID]`.
Por ejemplo, para remover la estación `34` de tus favoritas, ejecuta el siguiente comando:
```
bicis -r 34
```

### Limpiar todas tus favoritas

Podes borrar todos tus favoritas con el comando:
```
bicis -c`
```

### Mostrar información de todas las estaciones disponibles
Para ver el estado de todas las estaciones, tenes que usar el comando:
```
bicis -t
```

### Lista opciones disponibles
Finalmente, para revisar todos los comando disponibles, corre el comando:
```
bicis -h
```

## Encontraste un 🐞 ?
Reportarlo en [los issues del repositorio](https://github.com/mdottavio/bicis/issues).

## License
[MIT](LICENSE)
