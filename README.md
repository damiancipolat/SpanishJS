# Análisis sintáctico Español
![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR_lbGOZa8E39sKULNNttv27vEB8THD4u7iICV5ykPEf86CQxh)

>Este proyecto fue creado debido a la ausencia de recursos para realizar analisis sintacticos con NodeJs para el lenguaje Español. El objetivo principal es que sea usado como herramienta complementaria a NPL para procesamiento de textos, lo desarrolle originalmente para que sea usado en proyectos de chatbots que usan NPL para mejorar la inteligencia en las conversaciones.

- El proyecto aún no se encuentra en un 100% pero el código presente en el repositorio es funcional y sirve para ser usado.

#### ¿ Como instalar ?
Ejecutar en la raíz del proyecto:
```sh
$ npm install

Para ejecutar:
$ node app.js
```

### Ejemplos:
```js
//Incluyo el modulo con la clase de analisis sintactico para español.
const spanishDb = require('./modules/spanish');

//Creo una instancia a la clase.
let spanish = new spanishDb();

//Cargo la bd desde el archivo.
spanish.loadBdFromFile();

//Analizo una oración.
let tmp 	= spanish.analyseTextArray('pedro como te sentis en esta mañana negra');
console.log(tmp);

//El resultado obtenido sería:
[ pedro: [ 'sustantivo', 'persona' ],
  como: [ 'adverbio', 'sustantivo', 'pronombre' ],
  te: [ 'sustantivo', 'pronombre' ],
  sentis: [ 'sustantivo' ],
  en: [ 'preposicion' ],
  esta: [ 'pronombre' ],
  'mañana': [ 'sustantivo' ],
  negra: [ 'adjetivo', 'sustantivo' ] ]
```

#### BD linguistica:
Este script utiliza un archivo JSON como base de datos, en un futuro se adaptara a mongodb, se encuentra en el directorio ./diccionario/spanish.json, dentro de este mismo directorio hay 8 archivos con listas de palabras que es usada para confeccionar la bd linguistica.

En caso de querer agregar contenido o modificar esta bd, se debe ir al script tool.js que usa la clase ./modules/dicLoader.js.

```js
Para generar la bd spanish.json
$ node tool.js
```

# TODO
- Agregar predicados y otros elementos aún faltantes.
