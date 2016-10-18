'use strict';

let fetch = require('node-fetch');
let xml2js = require('xml2js');

let apiHandler = () => {

  const baseURL = 'https://recursos-data.buenosaires.gob.ar/ckan2/ecobici/estado-ecobici.xml';

  let _normalize = (data) => {
    let stations = [];

    data.forEach((station) => {
      stations.push({
        EstacionId: station.EstacionId[0],
        EstacionNombre: station.EstacionNombre[0],
        BicicletaDisponibles: station.BicicletaDisponibles[0],
        EstacionDisponible: station.EstacionDisponible[0],
        Latitud: station.Latitud[0],
        Longitud: station.Longitud[0],
        Numero: station.Numero[0],
        Lugar: station.Lugar[0],
        Piso: station.Piso[0],
        AnclajesTotales: station.AnclajesTotales[0],
        AnclajesDisponibles: station.AnclajesDisponibles[0],
      });
    });

    return stations;
  };

  let _parseData = (body, limit) => {
    return new Promise((resolve, reject) => {
      var parser = new xml2js.Parser();

      parser.parseString(body, function (err, result) {
        if (err) {
          reject('Error parsing data');
        }

        let stations = _normalize(result['soap:Envelope']['soap:Body'][0]['BicicletasWSResponse'][0]['BicicletasWSResult'][0]['Bicicletas'][0]['Estaciones'][0]['Estacion']);
        if (limit > 0) {
          stations = stations.slice(0, limit + 1);
        }

        resolve(stations);
      });
    });
  };

  let _getData = (limit) => {
    return fetch(baseURL).then(function (res) {
      return res.text();
    }).then(function (body) {
      return _parseData(body, limit);
    });
  };

  let _search = (query, limit) => {
    return _getData(limit).then((data) => {
      return data.filter((station) => {
        return (new RegExp(query, 'ig')).test(station.EstacionNombre);
      });
    });
  };

  let _searchByID = (id, limit) => {
    return _getData(limit).then((data) => {
      return data.filter((station) => {
        return station.EstacionId === id;
      });
    }).then((stations) => {
      if (stations.length > 0) {
        return stations;
      }
    });
  };

  let _getStationsWithBikes = (limit) => {
    return _getData(limit).then((data) => {
      return data.filter((station) => {
        return (station.BicicletaDisponibles > 0 && station.EstacionDisponible === 'SI');
      });
    });
  };

  let _seachStations = (stations, limit) => {
    return _getData(limit).then((data) => {
      return data.filter((station) => {
        let status = false;
        stations.forEach((s) => {
          if (station.EstacionId === s.EstacionId) {
            status = true;
          }
        });

        return status;
      });
    });
  };

  return {
    getData:  _getData,
    search: _search,
    searchByID: _searchByID,
    getStationsWithBikes: _getStationsWithBikes,
    seachStations: _seachStations,
  };
};

module.exports = apiHandler();
