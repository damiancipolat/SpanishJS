//Incluyo el modulo con la clase de analisis sintactico para español.
const spanishDb = require('./modules/spanish');

//Creo una instancia a la clase.
let spanish = new spanishDb();

//Cargo la bd desde el archivo.
spanish.loadBdFromFile();

//Analizo una oración.
let tmp 	= spanish.analyseTextArray('pedro como te sentis en esta mañana negra');
console.log(tmp);

