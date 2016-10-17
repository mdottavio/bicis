'use strict';
let Table = require('cli-table');
let colors = require('./colors-wrapper.js');

let displayHandler = () => {
  let table = new Table({ head: ['Estado', 'ID de estación', 'Nombre', 'Bicis en la estación'] });

  let _addStation = (data) => {
    let available = (data.EstacionDisponible === 'SI') ? colors.green(' ✓ ') : colors.red(' × ');
    let id = data.EstacionId;
    let name = data.EstacionNombre;
    let bikesAvailable = data.BicicletaDisponibles;
    bikesAvailable = (bikesAvailable > 0) ?
      colors.green(bikesAvailable) : colors.red(bikesAvailable);

    table.push([available, id, name, bikesAvailable]);
  };

  let _show = () => {
    console.log(table.toString());
  };

  let _showStations = (stations) => {
    stations.forEach((station) => {
      _addStation(station);
    });

    _show();
  };

  return {
    showStations:  _showStations,
    addStation: _addStation,
    show: _show,
  };
};

module.exports = displayHandler();
