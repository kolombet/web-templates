var uiPath = "/game/ui/dialog/";
var viewPath = "/game/view/dialog/";
var dataPath = "/game/model/client/dialog/";

var Handlebars = require('handlebars');
var fs = require("fs");
var rimraf = require("rimraf");
var mkdirp = require("mkdirp");
var changeCase = require('change-case');

// var readLineSync = require("readline-sync");
// var cName = readLineSync.question("Insert class name? :");
// console.log(cName);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter class name ', (answer) => {
	init(answer);
    rl.close();
});

function init(cName)
{
	var data = {
		className: "YobaChange",
		classNameUpper: "YOBA_CHANGE"
	}
	data.className = cName;
	data.classNameUpper = changeCase.constantCase(cName);
	console.log(JSON.stringify(data));


	rimraf.sync("./out");

	var uiNamePattern = "DialogUI";
	var viewNamePattern = "DialogView";
	var dataNamePattern = "DialogData";

	var uiTemplate = fs.readFileSync(uiNamePattern + "Template.hbs", "utf-8");
	var viewTemplate = fs.readFileSync(viewNamePattern + "Template.hbs", "utf-8");
	var dataTemplate = fs.readFileSync(dataNamePattern + "Template.hbs", "utf-8");

	uiTemplate = Handlebars.compile(uiTemplate);
	viewTemplate = Handlebars.compile(viewTemplate);
	dataTemplate = Handlebars.compile(dataTemplate);

	uiPath = "./out" + uiPath;
	viewPath = "./out" + viewPath;
	dataPath = "./out" + dataPath;

	mkdirp(uiPath, function (err)
	{
		fs.writeFileSync(getName(uiPath, uiNamePattern), uiTemplate(data));
	});

	mkdirp(viewPath, function(err) {
		fs.writeFileSync(getName(viewPath, viewNamePattern), viewTemplate(data));
	});

	mkdirp(dataPath, function(err) {
		fs.writeFileSync(getName(dataPath, dataNamePattern), dataTemplate(data));
	});

	function getName(path, type)
	{
		return path + data.className + type + ".as"
	}
}

// Must include previous code. path and mkdirSync are dependencies
// function mkdirpSync(dirpath) {
// 	var parts = dirpath.split(path.sep);
// 	for( var i = 1; i <= parts.length; i++ ) {
// 		mkdirSync( path.join.apply(null, parts.slice(0, i)) );
// 	}
// }


/*
 1) Строковое представление вьюхи (ViewType)
 2) Связь вьюхи и класса вьюхи ViewClassMap
 3) 
 
 */