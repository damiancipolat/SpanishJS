//Incluyo el modulo que permite cargar y crear la bd del idioma.
const diccionaryLoader = require('./modules/dicLoader');

//Creo el diccionario.
let tool = new diccionaryLoader();

//Cargo todos los archivos.
console.log('Cargando archivos .txt');
tool.loadDataFromFile();

//Vuelvo a json todos los datos.
console.log('Transformando archivos a .json');
tool.saveTxtToJson();

//Armo un json grande con todos los datos agrupados.
console.log('Creando bd spanish .json');
tool.makeLanguageJson();