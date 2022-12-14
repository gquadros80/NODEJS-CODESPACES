const express     =  require('express');             //Modulo Express
const exphbs      =  require('express-handlebars');  //Modulo Handlebars
const app         =  express();                      //Classe Express 
const conn        =  require('./db/conn')          

const Clube       = require('./models/Clube');
//Configuração da template engine (Handlebars)
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Configuração de ormulário
app.use(express.urlencoded ({extended: true}));
app.use(express.json());

//Rotas do Clube
app.post('/clube/save', async(req,res) => {
    const nome = req.body.nome;
    let status = req.body.status;

    if (status === 'on'){
        status = true;
    }else{
        status = false;

    }

    await Clube.create({nome, status});

    res.redirect('/clubes');
});

app.get('/clubes', async(req,res) => {

    const clubes = await Clube.findAll({raw: true});

    res.render('clubes', {clubes});
})

app.get('/clube/:id', async(req,res) => {

    const id = req.params.id;

    const clube =  await Clube.findOne({raw: true, where: {id: id}});

    res.render('clube', {clube});
});

//Excluindo clube
app.get('/clube/delete/:id', async(req,res) => {

    const id = req.params.id;

    await Clube.destroy({where: {id: id}});

    res.redirect('/clubes');

});

//Excluindo clube
app.get('/clube/edit/:id', async(req,res) => {

    const id = req.params.id;

    const clube =  await Clube.findOne({raw: true, where: {id: id}});

    res.render('clube-edit', {clube});
});

app.post('/clube/edit/save', async(req,res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    let status = req.body.status;

    if (status === 'on'){
        status = true;
    }else{
        status = false;

    }

    const clubeAlterado = {id, nome, status}

    await Clube.update(clubeAlterado, {where: {id: id}});
    
    res.redirect('/clubes')
});


app.get('/', (req,res) => {

    res.render('home');
});

conn.sync()
.then(() => {
    app.listen(5500);
}).catch((erro) => {
    console.log(erro);
})

