module.exports.iniciaChat = function (application , req , res) {
    var dadosForm = req.body ;

    req.assert('apelido','Nome ou Apelido são obrigatórios').notEmpty();
    req.assert('apelido','Nome ou Apelido devem conter entre 3 e 15 caracteres').len(3,15);

    var erros = req.validationErrors();

    if (erros){
        res.render('index' , {validacao : erros});
        return ;
    }
    // recuperando a variavel global do express
    application.get('io').emit(
        'msgParaCliente',
        {apelido : dadosForm.apelido , mensagem : 'entrou no Chat'}
        );

    res.render("chat" , {dadosForm : dadosForm});
};