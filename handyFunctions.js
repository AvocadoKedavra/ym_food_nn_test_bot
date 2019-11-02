module.exports = {
    botMenuMessage: function(shopName, shopMenu, ctx){
        console.log('Clicked! on ' + shopName);
        console.log(ctx.message.chat.id);
        return ctx.replyWithMarkdown('_'+ shopName +':_' + shopMenu);
    },
    remove_spaces: function(err, str) {
        if (err) throw err;
        return str = str.replace(/\s+/g, " ");
    }
  };