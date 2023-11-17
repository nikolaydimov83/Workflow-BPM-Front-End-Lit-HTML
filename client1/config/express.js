const express=require('express');
const handlebars=require('express-handlebars')
const path=require('path');
const { baseDir } = require('../constants');


module.exports=(app)=>{
const hbs =handlebars.create({
    extname:'.hbs',
    helpers:{
    
    optionSelected:function(valueOption, bodyOption){
        if(!bodyOption){
            bodyOption="crypto-wallet";
        }
        if (valueOption===bodyOption){
            return 'selected'
        }else{
            return ''
        }
    },
    profileImage:function(bodyOption){

        if (bodyOption==='male'){
            return '/static/images/male.png'
        }else{
            return '/static/images/female.png'
        }
    }
}
});

app.engine('.hbs',hbs.engine);
app.set('view engine', '.hbs');
app.use(
    express.static('static'/*path.join(baseDir,'static')*/));

}