#!/usr/bin/env node --harmony

'use strict';

var pjson = require('./package.json');
var cli = require(__dirname + '/src/cli.js');

let program = require('commander');

program
  .version(pjson.version)
  .option('-l, --list', 'Listar todas las estaciones')
  .option('-s, --search [nombre de estacion]', 'Buscar estación por nombre')
  .option('-a, --add [ID de estación]', 'Agregar la estación a tu lista de favoritas')
  .option('-r, --remove [ID de estación]', 'Remover estación de tu lista de favoritas')
  .option('-c, --clear', 'Remover todas tus estaciones favoritas')
  .option('-x, --limit <n>', 'Limitar la búsqueda', parseInt, 0)
  .parse(process.argv);

/**
 * Remove useless params on the argv
 */
let filterArguments = (params) => {
  const options = Object.keys(program).filter((param) => {
    return param.search(/add|search|add|remove|clear|limit/) > -1;
  });

  let cleanParams = {};

  options.forEach((opt) => {
    cleanParams[opt] = params[opt];
  });
  return cleanParams;
};

cli.run(filterArguments(program))
.then(()=> {
  process.exit(0);
})
.catch(()=> {
  process.exit(1);
});
