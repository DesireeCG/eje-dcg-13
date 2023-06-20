const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const port = process.env.PORT || 3000;

//rutas Personalizadas
const rutasCategoriasAPI = require('./src/routes/categorias-routes-api');
const rutasUsuariosAPI = require('./src/routes/usuarios-routes-api');
const rutasAuthAPI = require('./src/routes/auth-routes-api');

const app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/view',()=>{});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Definir las Rutas - Para el cliente: login, categorias, index, not found
//GET o POST
app.get('/',(req, res)=>{
    res.render('index')
})
app.get('/login',(req, res)=>{
    res.render('signin-one')
})

//Me regresa en Formato JSON los datos de categoria
app.use('/categorias/api',rutasCategoriasAPI);
app.use('/usuarios/api', rutasUsuariosAPI);
app.use('/auth/api', rutasAuthAPI);
//me regresa en formato HTML la vista 
app.get('/categorias',(req, res)=>{
    res.render('advance-table')
})
app.get('*',(req, res)=>{
    res.render('404')
})

//Definir puerto en el que se escucha solucitudes
app.listen(port,()=>{
    console.log('El servidor express esta corriendo en el puerto: ',port);
}) 
