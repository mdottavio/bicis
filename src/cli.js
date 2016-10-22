'use strict';
let apitHdl = require('./api.js');
let showtHdl = require('./display.js');
let favoritesHdl = require('./favorites.js');
let colors = require('./colors-wrapper.js');

let cliHandler = () => {

  /**
   * Show all the stations
   * @param {Integer} limit
   */
  let _listAll = (limit) => {
    console.log('Estado de todas las estaciones: ');
    return apitHdl.getData(limit).then(showtHdl.showStations);
  };

  /**
   * List stations with available bikes
   * @param {Integer} limit
   */
  let _listAvailables = (limit) => {
    // show stations with aviables 🚴🏻🏻🏻
    console.log('Estaciones con 🚴🏻  disponibles: ');
    return apitHdl.getStationsWithBikes(limit).then(showtHdl.showStations);
  };

  /**
   * Show all the stations based on the given query
   * @param {String} query
   * @param {Integer} limit
   */
  let _search = function (query, limit) {
    console.log(`Buscando estaciones con el texto: ${query}`);
    return apitHdl.search(query, limit)
      .then(showtHdl.showStations);
  };

  /**
   * Add a station to favorites
   * @param {Integer} stationID
   */
  let _addFavorite = (stationID) => {
    // add a station ID to the user's favs
    console.log(`Buscando estaciones con el ID: ${stationID}`);
    return apitHdl.searchByID(stationID)
      .then((stations) => {
        return favoritesHdl.addFavorite(stations[0]);
      })
      .then(() => {
        console.log(colors.green(' ✓ ') + ' estación agregada a tus favoritas');
      })
      .catch(()=> {
        console.log(colors.red(' × ') + ' no se econtró la estación');
      });
  };

  /**
   * Add a station from favorites
   * @param {Integer} stationID
   */
  let _removeFavorite = (stationID) => {
    console.log(`Removiendo la estación ${program.remover} de tus favoritas`);
    return new Promise((resolve, reject) => {
      if (favoritesHdl.isFavorite(stationID)) {
        favoritesHdl.removeFavorite(stationID)
        .then(() => {
          console.log(colors.green(' ✓ ') + ' estación removida a tus favoritas');
          resolve(true);
        });
      } else {
        console.log(colors.red(' × ') + ' no se econtró la estación entre tus favoritas');
        reject(false);
      }
    });
  };

  /**
   * Remove all the favorites
   */
  let _clearFavorites = () => {
    console.log(`Removiendo todos tus estaciones favoritas`);
    return favoritesHdl.cleanAll()
      .then(() => {
        console.log(colors.green(' ✓ ') + ' estaciones removidas');
      });
  };

  /**
   * List status on favororites
   * @param {Integer} limit
   */
  let _listFavorites = (limit) => {
    // show status on the user's favorites stations
    console.log('Estado de tus estaciones favoritas 🚴🏻: ');
    return apitHdl.seachStations(favoritesHdl.getFavorites(limit)).then(showtHdl.showStations);
  };

  /**
   * Cli main entrance function
   */
  let _run = function (options) {
    if (options.listar) {
      return _listAll(options.limit);
    } else if (options.buscar) {
      return _search(options.buscar, options.limit);
    }  else if (options.agregar) {
      return _addFavorite(options.agregar, options.limit);
    }  else if (options.remover) {
      return _removeFavorite(options.remover);
    }  else if (options.clear) {
      return _clearFavorites();
    } else {
      if (favoritesHdl.haveFavorites()) {
        return _listFavorites(options.limit);
      } else {
        return _listAvailables(options.limit);
      }
    }
  };

  return {
    run: _run,
  };
};

module.exports = cliHandler();
