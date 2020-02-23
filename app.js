// importando configuracoes do servidor
var app = require('./config/server');

// parametrizar porta de escuta
var server = app.listen(8090,function (){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

//variavel global usando o express
app.set('io',io);

//conexao websocket
io.on('connection',function (socket) {
    console.log('Conectado');

    socket.on('disconnect',function () {
        console.log('Desconectado');
    });

    socket.on('msgParaServidor',function (data) {
        // eventos de dialogo
        socket.emit('msgParaCliente'
                    , { apelido: data.apelido
                    , mensagem: data.mensagem  }
                    );

        socket.broadcast.emit('msgParaCliente'
            , { apelido: data.apelido
                , mensagem: data.mensagem  }
            );


        // eventos de participantes
        if(parseInt(data.apelido_atualizado)==0) {
            socket.emit('participantesParaCliente'
                , {apelido: data.apelido}
            );

            socket.broadcast.emit('participantesParaCliente'
                , {apelido: data.apelido}
            );
        }

    });

});