'use strict';

let fs = require('fs');

let favoritesHandler = () => {
  let fav = [];

  let favFile = {
    path: __dirname + '/../fav/data.json',
    charSet: 'utf8',
  };

  fav = JSON.parse(fs.readFileSync(favFile.path, favFile.charSet));

  let saveFavs = () => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify(fav, null, 2);
      fs.writeFile(favFile.path, data, favFile.charSet, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(fav);
        }
      });
    });
  };

  let _haveFavorites = () => {
    return fav.length > 0;
  };

  let _cleanAll = () => {
    fav = [];
    return saveFavs();
  };

  let _isFavorite = (idF) => {
    let isF = false;
    fav.forEach((f) => {
      if (f.EstacionId === idF) {
        isF = true;
      }
    });
    return isF;
  };

  let _addFavorite = (station) => {
    if (!_isFavorite(station.EstacionId)) {
      fav.push(station);
    }

    return saveFavs();
  };

  let _getFavorites = () => {
    return fav;
  };

  let _removeFavorite = (idF) => {
    fav = fav.filter((f) => {
      return f.EstacionId !== idF;
    });
    return saveFavs();
  };

  return {
    haveFavorites:  _haveFavorites,
    cleanAll: _cleanAll,
    addFavorite: _addFavorite,
    getFavorites: _getFavorites,
    isFavorite: _isFavorite,
    removeFavorite: _removeFavorite,
  };
};

module.exports = favoritesHandler();
