module.exports = {
    botMenuMessage: function(shopName, shopMenu, ctx){
        console.log('Clicked! on ' + shopName);
        console.log(ctx.message.chat.id);
        return ctx.replyWithMarkdown('_'+ shopName +':_' + shopMenu);
    }
  };