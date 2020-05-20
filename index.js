const fs = require("fs"),
	Telegraf = require('telegraf'),
	app = new Telegraf(fs.readFileSync("password.txt", "utf8")),
	handyFunctions = require('./handyFunctions'),
	needle = require('needle'),
	schedule = require('node-schedule'),
	cheerio = require("cheerio");
	
var final_var = '',
	final_var_kuma = '',
	final_var_pirushka = '',
	final_var_mukka = '',
	final_var_kfc = '',
	final_var_samurai = '';

Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7)+9;
	};

	function getMenu(hours,minutes) {
        var j = schedule.scheduleJob(minutes + ' ' + hours + ' ' + '* * *', function(){
            barents();
            kuma();
            pirushka();
            mukka();
			kfc();
			samurai();
            console.log('The answer to life, the universe, and everything!');
        });
		};

		function uptime(hours,minutes) {
			var j = schedule.scheduleJob(minutes + ' ' + hours + ' ' + '* * *', function(){
				app.telegram.sendMessage(fs.readFileSync("users.txt", "utf8"), "It's Working");
			});
			};
		
function samurai() {
	var myDate = new Date(),
		samuraiVar = myDate.getWeek()%10;
		jsonsamuraiEuro = fs.readFileSync("samuraiEuro.json", "utf8"),
		samuraiEuro = JSON.parse(jsonsamuraiEuro);

		switch (samuraiVar) {
			case 1:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 2:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 3:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 4:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 5:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 6:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 7:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 8:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 9:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 10:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
			case 10:
				final_var_samurai = samuraiEuro[samuraiVar];
			  break;
		  }
		  console.log('Самурай загружен!');
}

function barents() {
var name_id = `.itm7 .rest-menu .price-list`,
	URL = 'http://www.pir.nnov.ru/barents/restmenu/';
needle.get(URL, function(err, res){
    if (err) { return console.log('barents not working'); };
	final_var = '';
    var $ = cheerio.load(res.body),
            rest_menu = $(name_id).each(function(i, item){
				final_var += '\n *' + $(this).find('h3').text() + '*';
				$(this).find('dl').each(function(i, item) {
					final_var += '\n' + handyFunctions.remove_spaces(err, $(this).text());
				});
			});
	console.log('Баренц загружен!');
});
};

function kuma() {
var URL = 'http://www.pir.nnov.ru/kuma/restmenu/';
needle.get(URL, function(err, res){
    if (err) { return console.log('kuma not working'); }
	final_var_kuma = '';
	var name_id = `.itm3 .rest-menu .price-list`;
    var $ = cheerio.load(res.body),
    rest_menu = $(name_id).each(function(i, item){
		final_var_kuma += '\n *' + $(this).find('h3').text() + '*';
		$(this).find('dl').each(function(i, item) {
			final_var_kuma += '\n' + handyFunctions.remove_spaces(err, $(this).text());
		});
	});
console.log('Кума загружена!');
});
};

function pirushka() {
var URL = 'http://www.pir.nnov.ru/pirushka/restmenu/';
needle.get(URL, function(err, res){
    if (err) { return console.log('pirushka not working'); };
	final_var_pirushka = '';
	var name_id = `.itm4 .rest-menu .price-list`;
    var $ = cheerio.load(res.body),
    rest_menu = $(name_id).each(function(i, item){
		final_var_pirushka += '\n *' + $(this).find('h3').text() + '*';
		$(this).find('dl').each(function(i, item) {
			final_var_pirushka += '\n' + handyFunctions.remove_spaces(err, $(this).text());
		});
	});
	console.log('Пирушка загружена!');
});
};

function mukka() {
	var URL = 'https://ekdostavka.ru/rest/mukka/Lunch/';
		needle.get(URL, function(err, res){
    if (err) { return console.log('Mukka not working'); };
	final_var_mukka = '';
	var name_id = `div.item_cards div:nth-child(1) .b_luch_selector`;
	var $ = cheerio.load(res.body),
	rest_menu = $(name_id).find('option').each(function(i, item){
		final_var_mukka += '\n' + $(this).text();
	});
console.log('Мукка загружена!');
});
};


function kfc() {
var name_id = `#root div div.pt-64 div.grid_inner div:nth-child(3) div`,
	URL = 'https://www.kfc.ru/coupons';
needle.get(URL, function(err, res){
    if (err) { return console.log('KFC not working'); };
	final_var_kfc = '';
    var $ = cheerio.load(res.body),
        menu_rest = $(name_id).find('div:nth-child(2)').each(function(i, item){
            final_var_kfc +=  '\n*Код: ' + $(this).text() + '*\n_' + $(this).parent().find('div:nth-child(3)').text() + '_\nБыло: ' + $(this).parent().find('div:nth-child(4)').find('span:nth-child(1)').text() + ' *Цена по коду: ' + $(this).parent().find('div:nth-child(4)').find('span:nth-child(2)').text() + ' ₽*\n';
		});
		console.log('kfc загружен!');
});
};

// run function on load
barents();
kuma();
pirushka();
mukka();
kfc();
samurai();

// scheldue for geting actual information
getMenu(10,00);
getMenu(10,30);
getMenu(11,30);
getMenu(12,30);
uptime(10,30);

// bot commands for user
app.hears('/kuma', ctx => {
	handyFunctions.botMenuMessage('Кума', final_var_kuma, ctx)
});

app.hears('/mukka', ctx => {
	handyFunctions.botMenuMessage('Mukka', final_var_mukka, ctx)
});

app.hears('/pirushka', ctx => {
	handyFunctions.botMenuMessage('Пирушка у Ганса', final_var_pirushka, ctx)
});

app.hears('/barents', ctx => {
	handyFunctions.botMenuMessage('Баренц', final_var, ctx)
});

app.hears('/kfc', ctx => {
	handyFunctions.botMenuMessage('KFC', final_var_kfc, ctx)
});

app.hears('/samurai', ctx => {
	handyFunctions.botMenuMessage('SAMURAI', final_var_samurai, ctx);
});

// bot commands for chat
app.hears('/samurai@ym_food_nn_test_bot', ctx => {
	handyFunctions.botMenuMessage('SAMURAI', final_var_samurai, ctx)
});

app.hears('/kuma@ym_food_nn_test_bot', ctx => {
	handyFunctions.botMenuMessage('Кума', final_var_kuma, ctx)
});

app.hears('/mukka@ym_food_nn_test_bot', ctx => {
	handyFunctions.botMenuMessage('Mukka', final_var_mukka, ctx)
});

app.hears('/pirushka@ym_food_nn_test_bot', ctx => {
	handyFunctions.botMenuMessage('Пирушка у Ганса', final_var_pirushka, ctx)
});

app.hears('/barents@ym_food_nn_test_bot', ctx => {
	handyFunctions.botMenuMessage('Баренц', final_var, ctx)
});
app.hears('/kfc@ym_food_nn_test_bot', ctx => {
	handyFunctions.botMenuMessage('KFC', final_var_kfc, ctx)
});


app.hears('/start', ctx => {
 return ctx.replyWithMarkdown('Не надо стартовать, можно попробовать ввести:\n*/barents /kuma /pirushka /mukka /kfc*\nи узнать сегодняшнее меню.\nЕсли вы добавите нашего бота в чат, то сможете использовать те же команды.');
});

// function for run bot
app.startPolling();