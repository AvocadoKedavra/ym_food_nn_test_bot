const fs = require('fs');

module.exports = {
    botMenuMessage: function(shopName, shopMenu, ctx, urlContent){
        if ( arguments.length === 3 ) {
            shopName = arguments[0];
            shopMenu = arguments[1];
            ctx = arguments[2];
            url = null;
          }
        console.log('Clicked! on ' + shopName);
        console.log(ctx.from);
        var json = JSON.stringify(ctx.from) + ',\n';
        fs.appendFile("users.json", json , function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
         });
        if (shopMenu == '') {
            return ctx.replyWithMarkdown('Ресторан - или убрал страницу меню, или в корне изменил форматирование страницы. Как только я пойму что с ней - я всё поправлю. \n_- @AvocadoKedavra_');
        }
        if (shopName == 'SAMURAI') {
            return ctx.replyWithMarkdown('_'+ shopName +':_' + shopMenu);
                   ctx.replyWithPhoto({ url: urlContent });
        } else {
            return ctx.replyWithMarkdown('_'+ shopName +':_' + shopMenu);
        }
    },
    remove_spaces: function(err, str) {
        if (err) throw err;
        return str = str.replace(/\s+/g, " ");
    }
  };