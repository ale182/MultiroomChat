// importando configuracoes do servidor
var app = require('./config/server');

// parametrizar porta de escuta
app.listen(8090,function (){
    console.log('Servidor online');
});