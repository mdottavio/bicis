'use strict';

let apitHdl = require(__dirname + '/src/api.js');
let showtHdl = require(__dirname + '/src/display.js');
let favoritesHdl = require(__dirname + '/src/favorites.js');
let colors = require(__dirname + '/src/colors-wrapper.js');

let program = require('commander');

program
  .version('0.1.0')
  .option('-l, --listar', 'Listar estaciones con 🚴🏻 disponibles')
  .option('-b, --buscar [nombre de estacion]', 'Buscar estación por nombre')
  .option('-a, --agregar [ID de estación]', 'Agregar la estación a tu lista de favoritas')
  .option('-r, --remover [ID de estación]', 'Remover estación de tu lista de favoritas')
  .option('-c, --clear', 'Remover todas tus estaciones favoritas')
  .option('-t, --todas', 'Listar todas las estaciones')

  .parse(process.argv);

if (program.listar) {
  // show all the stations
  console.log('Estado de todas las estaciones: ');
  apitHdl.getData().then(showtHdl.showStations);
} else if (program.buscar) {
  // search for stations based on the given query
  console.log(`Buscando estaciones con el texto: ${program.buscar}`);
  apitHdl.search(program.buscar).then(showtHdl.showStations);
}  else if (program.agregar) {
  // add a station ID to the user's favs
  console.log(`Buscando estaciones con el ID: ${program.agregar}`);
  apitHdl.searchByID(program.agregar)
  .then((stations) => {
    return favoritesHdl.addFavorite(stations[0]);
  })
  .then(() => {
    console.log(colors.green(' ✓ ') + ' estación agregada a tus favoritas');
  })
  .catch(()=> {
    console.log(colors.red(' × ') + ' no se econtró la estación');
  });
}  else if (program.remover) {
  // remove a station from the user's favs
  console.log(`Removiendo la estación ${program.remover} de tus favoritas`);
  if (favoritesHdl.isFavorite(program.remover)) {
    favoritesHdl.removeFavorite(program.remover)
    .then(() => {
      console.log(colors.green(' ✓ ') + ' estación removida a tus favoritas');
    });
  } else {
    console.log(colors.red(' × ') + ' no se econtró la estación entre tus favoritas');
  }
}  else if (program.clear) {
  // clear user's favs
  console.log(`Removiendo todos tus estaciones favoritas`);
  favoritesHdl.cleanAll()
  .then(() => {
    console.log(colors.green(' ✓ ') + ' estaciones removidas');
  });
}  else if (program.todas) {
  // show all the stations
  console.log('Lista de estaciones: ');
  apitHdl.getData().then(showtHdl.showStations);
} else {
  if (favoritesHdl.haveFavorites()) {
    // show status on the user's favorites stations
    console.log('Estado de tus estaciones favoritas 🚴🏻: ');
    apitHdl.seachStations(favoritesHdl.getFavorites()).then(showtHdl.showStations);
  } else {
    // show stations with aviables 🚴🏻🏻🏻
    console.log('Estaciones con 🚴🏻  disponibles: ');
    apitHdl.getStationsWithBikes().then(showtHdl.showStations);
  }
}
