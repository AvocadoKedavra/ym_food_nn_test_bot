const fs = require("fs");
const Telegraf = require('telegraf');
const app = new Telegraf(fs.readFileSync("password.txt", "utf8"));
var schedule = require('node-schedule');

function remove_spaces(err, str) {
	if (err) throw err;
	return str = str.replace(/\s+/g, " ");
}

var needle = require('needle'),
	cheerio = require("cheerio");
	
var final_var = '';
function barents() {
var name_id = `.itm7 .rest-menu .price-list`,
	URL = 'http://www.pir.nnov.ru/barents/restmenu/';
needle.get(URL, function(err, res){
    if (err) throw err;
	final_var = '';
    var $ = cheerio.load(res.body),
            rest_menu = $(name_id).each(function(i, item){
				final_var += '\n *' + $(this).find('h3').text() + '*';
				$(this).find('dl').each(function(i, item) {
					final_var += '\n' + remove_spaces(err, $(this).text());
				});
			});
});
console.log('Баренц загружен!');

};
var final_var_kuma = '';
function kuma() {
var URL = 'http://www.pir.nnov.ru/kuma/restmenu/';
needle.get(URL, function(err, res){
    if (err) throw err;
	final_var_kuma = '';
	var name_id = `.itm3 .rest-menu .price-list`;
    var $ = cheerio.load(res.body),
    rest_menu = $(name_id).each(function(i, item){
		final_var_kuma += '\n *' + $(this).find('h3').text() + '*';
		$(this).find('dl').each(function(i, item) {
			final_var_kuma += '\n' + remove_spaces(err, $(this).text());
		});
	});
});
console.log('Кума загружена!');

};

var final_var_pirushka = '';
function pirushka() {
var URL = 'http://www.pir.nnov.ru/pirushka/restmenu/';
needle.get(URL, function(err, res){
    if (err) throw err;
	final_var_pirushka = '';
	var name_id = `.itm4 .rest-menu .price-list`;
    var $ = cheerio.load(res.body),
    rest_menu = $(name_id).each(function(i, item){
		final_var_pirushka += '\n *' + $(this).find('h3').text() + '*';
		$(this).find('dl').each(function(i, item) {
			final_var_pirushka += '\n' + remove_spaces(err, $(this).text());
		});
	});
});
console.log('Пирушка загружена!');

};

var final_var_mukka = '';
function mukka() {
	var URL = 'https://ekdostavka.ru/rest/mukka/Lunch/';
		needle.get(URL, function(err, res){
    if (err) throw err;
	final_var_mukka = '';
	var name_id = `div.item_cards div:nth-child(1) .b_luch_selector`;
	var $ = cheerio.load(res.body),
	rest_menu = $(name_id).find('option').each(function(i, item){
		final_var_mukka += '\n' + $(this).text();
	});
console.log('Мукка загружена!');
});
};

var final_var_kfc = '';
function kfc() {
var name_id = `#root div div.pt-64 div.grid_inner div:nth-child(3) div`,
	URL = 'https://www.kfc.ru/coupons';
needle.get(URL, function(err, res){
    if (err) throw err;
	final_var_kfc = '';
    var $ = cheerio.load(res.body),
        menu_rest = $(name_id).find('div:nth-child(2)').each(function(i, item){
            final_var_kfc +=  '\n*Код: ' + $(this).text() + '*\n_' + $(this).parent().find('div:nth-child(3)').text() + '_\nБыло: ' + $(this).parent().find('div:nth-child(4)').find('span:nth-child(1)').text() + ' *Цена по скидке: ' + $(this).parent().find('div:nth-child(4)').find('span:nth-child(2)').text() + ' ₽*\n';
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

// scheldue for geting actual information
var j = schedule.scheduleJob('0 10 * * *', function(){
	barents();
	kuma();
	pirushka();
	mukka();
	kfc();
	app.telegram.sendMessage(fs.readFileSync("users.txt", "utf8"), final_var);
	console.log('The answer to life, the universe, and everything!');
});

// bot commands for user
app.hears('/kuma', ctx => {
	console.log('Clicked! on kuma');
	console.log(ctx.message.chat.id);
	return ctx.replyWithMarkdown('_Кума:_' + final_var_kuma);
});

app.hears('/mukka', ctx => {
	console.log('Clicked! on mukka');
	console.log(ctx.message.chat.id);
	return ctx.replyWithMarkdown('_Mukka:_' + final_var_mukka);
});

app.hears('/pirushka', ctx => {
	console.log('Clicked! on pirushka');
	console.log(ctx.message.chat.id);
	return ctx.replyWithMarkdown('_Пирушка:_' + final_var_pirushka);
});

app.hears('/barents', ctx => {
	console.log('Clicked! on barents');
	console.log(ctx.message.chat.id);
	return ctx.replyWithMarkdown('_Баренц:_' + final_var);
});

app.hears('/kfc', ctx => {
	console.log('Clicked! on kfc');
	console.log(ctx.message.chat.id);
	return ctx.replyWithMarkdown('_KFC:_' + final_var_kfc);
});

// bot commands for chat
app.hears('/kuma@ym_food_nn_test_bot', ctx => {
	console.log('Clicked! on kuma in chat');
	console.log('chatID: ' + ctx.message.chat.id);
	return ctx.replyWithMarkdown('_Кума:_' + final_var_kuma);
});

app.hears('/mukka@ym_food_nn_test_bot', ctx => {
	console.log('Clicked! on mukka in chat');
	console.log('chatID: ' + ctx.message.chat.id);
	return ctx.replyWithMarkdown('_Mukka:_' + final_var_mukka);
});

app.hears('/pirushka@ym_food_nn_test_bot', ctx => {
	console.log('Clicked! on pirushka in chat');
	console.log('chatID: ' + ctx.message.chat.id);
	return ctx.replyWithMarkdown('_Пирушка:_' + final_var_pirushka);
});

app.hears('/barents@ym_food_nn_test_bot', ctx => {
	console.log('Clicked! on barents in chat');
	console.log('chatID: ' + ctx.message.chat.id);
	return ctx.replyWithMarkdown('_Баренц:_' + final_var);
});
app.hears('/kfc@ym_food_nn_test_bot', ctx => {
	console.log('Clicked! on kfc in chat');
	console.log('chatID: ' + ctx.message.chat.id);
	return ctx.replyWithMarkdown('_KFC:_' + final_var_kfc);
});

app.hears('/start', ctx => {

 return ctx.replyWithMarkdown('Не надо стартовать, можно попробовать ввести */barents /kuma /pirushka /mukka /kfc* и узнать сегодняшнее меню.');
});

// function for run bot
app.startPolling();