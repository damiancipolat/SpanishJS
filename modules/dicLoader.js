const fs = require('fs');
const os = require('os');

//Clase para cargar datos del idioma español.
module.exports = class diccionaryLoader
{
	constructor()
	{
		this.adjetivos 		= [];
		this.adverbios 		= [];
		this.preposiciones  = [];
		this.sustantivos 	= [];
		this.verbos 		= [];
		this.pronombres 	= [];
		this.personas 	    = [];
	}
	
	//Cargo los arrays de los archivos.
	loadDataFromFile()
	{
		this.adjetivos 		= this.parseFromFile('./diccionario/adjetivos.txt');
		this.adverbios 		= this.parseFromFile('./diccionario/adverbios.txt');
		this.preposiciones  = this.parseFromFile('./diccionario/preposiciones.txt');
		this.sustantivos 	= this.parseFromFile('./diccionario/sustantivos.txt');
		this.verbos 		= this.parseFromFile('./diccionario/verbos.txt');
		this.pronombres		= this.parseFromFile('./diccionario/pronombres.txt');
		this.personas       = this.parseFromFile('./diccionario/nombres_personales.txt');
		this.lugares 		= this.parseFromFile('./diccionario/lugares.txt');
	}

	//Guardo los txt como un json.
	saveTxtToJson()
	{
		//Vuelco en los archivos los array cargados de los archivos.
		this.arrayToFile('./diccionario/adjetivos.json',this.adjetivos);
		this.arrayToFile('./diccionario/adverbios.json',this.adverbios);
		this.arrayToFile('./diccionario/preposiciones.json',this.preposiciones);
		this.arrayToFile('./diccionario/sustantivos.json',this.sustantivos);
		this.arrayToFile('./diccionario/verbos.json',this.verbos);
		this.arrayToFile('./diccionario/pronombres.json',this.pronombres);
		this.arrayToFile('./diccionario/nombres_personales.json',this.personas);
		this.arrayToFile('./diccionario/lugares.json',this.lugares);		
	}

	//Armo un archivo json con todos los grupos de tokens del español.
	makeLanguageJson()
	{
		let idioma = {
						"adjetivos"		: this.adjetivos,
						"adverbios"		: this.adverbios,
						"preposiciones" : this.preposiciones,
						"sustantivos"	: this.sustantivos,
						"verbos"		: this.verbos,
						"pronombres"	: this.pronombres,
						"personas" 		: this.personas,
						"lugares" 		: this.lugares						
					 };

		//Vuelco a un json con todos los datos.
		this.arrayToFile('./diccionario/spanish.json',idioma);
	}

	//A comodo el string.
	cleanStr(cadena)
	{
		cadena = cadena.replace(/á/gi,"a");
		cadena = cadena.replace(/é/gi,"e");
		cadena = cadena.replace(/í/gi,"i");
		cadena = cadena.replace(/ó/gi,"o");
		cadena = cadena.replace(/ú/gi,"u");
		cadena = cadena.replace(/ñ/gi,"n");
		cadena = cadena.replace(/Á/gi,"A");
		cadena = cadena.replace(/É/gi,"E");
		cadena = cadena.replace(/Í/gi,"I");
		cadena = cadena.replace(/Ó/gi,"O");
		cadena = cadena.replace(/Ú/gi,"U");
		cadena = cadena.replace(/Ñ/gi,"N");

		return cadena.toUpperCase();
	}

	//Carga el archivo y parsea en base a los enter.
	parseFromFile(file)
	{
		let	str      = fs.readFileSync(file).toString();
		let listaStr = str.split(os.EOL);
		let struct   = {};

		listaStr.forEach((str)=>{
			struct[this.cleanStr(str)]=1;
		});

		return struct;
	}

	//Guardo el contenido del array en un archivo.
	arrayToFile(file,data)
	{
		return fs.writeFileSync(file,JSON.stringify(data));
	}
}