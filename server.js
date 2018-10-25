const cheerio = require('cheerio'),
Json2csv = require('json2csv').Parser,
csvWriter = require('csv-write-stream'),
writer = csvWriter({sendHeaders: false}),
fs = require('fs'),
path = require('path');

var $ = cheerio.load(fs.readFileSync(path.join(__dirname, '/index.html')), {
	normalizeWhitespace: true,
	xmlMode: true
});

var leads = [];
let lead = {};
let email, name, lel;

writer.pipe(fs.createWriteStream(path.join(__dirname, 'output.csv')))
		writer.write({name: 'hie', email: 'Lu!'})

$('tr').each(function(i, elem) {
	let cs = cheerio.load(elem);

	if((email = cs("a[class='compose-mail-box']").text()) !== '') {
		name = cs("a[id^='emp_name']").text();
		lead.name = name;
		lead.email = email;
		leads[i] = lead;

		writer.write({name: name, email: email})
	

	}

//console.log(leads);
	
})

var fields = ['name', 'email']

const json2csvParser = new Json2csv({fields});
var csv = json2csvParser.parse(leads)

writer.end()

console.log(csv)
/*fs.writeFile(path.join(__dirname, 'output.csv'), leads, (err) => {
		if(err) throw err;
		console.log('yo!')
	})

/*$('a.compose-mail-box').each(function(i, elem) {
    fruits[i] = $(elem).text();
    fs.appendFile(path.join(__dirname, 'output.txt'), fruits[i] + "\n", (err) => {
        if(err) throw err;
    })
  });



var link = $('a').text();
//console.log(fruits);*/