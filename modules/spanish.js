const fs = require('fs');
const os = require('os');

//Clase que realiza el analisis sintactico de una oración.
module.exports= class spanishDb
{
	constructor()
	{
		this.bd = null;
	}

	//Cargo la estructura con todos los datos del idioma español para poder hacer clasificaciones.
	loadBdFromFile()
	{
		//Cargo del archivo.
		let	str = fs.readFileSync('./diccionario/spanish.json').toString();

		//Parseo el json.
		let struct = JSON.parse(str);

		//Si hay datos.
		if ((str!=null)&&(struct!=null))		
			this.bd = struct;
		else
			console.log("Error: Json de idioma mal armado.");
	}

	//Busco a que grupo pertenece una palabra.
	findWordToken(word)
	{
		let resu   = [];

		//Lista con funciones y arrays.
		let listFn = [
						{list:this.bd.adjetivos,val:'adjetivo',fn:this.findElemNomb},
						{list:this.bd.adverbios,val:'adverbio',fn:this.findElemNomb},
						{list:this.bd.preposiciones,val:'preposicion',fn:this.findElemNomb},
						{list:this.bd.sustantivos,val:'sustantivo',fn:this.findElemNomb},
						{list:this.bd.verbos,val:'verbo',fn:this.findElemNomb},
						{list:this.bd.pronombres,val:'pronombre',fn:this.findElemNomb},
						{list:this.bd.personas,val:'persona',fn:this.findElemNomb},
						{list:this.bd.lugares,val:'lugar',fn:this.findElemNomb}
					 ];

		//Recorro el array de funciones, si la función da true agrego el valor de cada token.
		listFn.forEach((item)=>
		{
			if (item.fn(item.list,word))
				resu.push(item.val);
		});	

		if (!isNaN(word))
			resu.push('numero');

		return resu;
	}

	//Adapto el formato del string.
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

	//Analizo si la palabra esta dentro de los arrays.
	findElemNomb(items,word)
	{
		//Limpio de caracteres y paso a mayuscula.
		let cleanStr = (cadena)=>{
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
		};

		return (items[cleanStr(word)]!=null);
	}

	//Parseo una oración y reviso a que grupo pertenece cada palabra.
	analyseText(texto)
	{
		let final   = [];

		//Parseo en base a los espacios en blanco.
		let bloques = texto.split(" ");

		//Itero palabra por palabra
		bloques.forEach((elem)=>
		{			
			//Traigo los grupos que pertenece cada palabra.
			let token = this.findWordToken(elem);

			//Grabo los resultados del analisis.
			final.push({"word":elem,"token":token});
		});

		return final;
	}

	//Parseo la oración y la obtengo en forma de array.
	analyseTextArray(texto)
	{
		let resu   = this.analyseText(texto);
		let salida = [];

		resu.forEach((item)=>{
			salida[item.word]=item.token;
		});

		return salida;
	}
}