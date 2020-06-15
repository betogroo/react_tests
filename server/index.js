const express = require("express")
const path = require('path')
const app = express()
const session = require("express-session");
const flash = require('connect-flash')
passport = require('passport')
require('./config/auth')(passport)
const cors = require('cors')
const PORT = 3333

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use(session({
    secret: "qualquercoisa",
    cookie: { maxAge: 300000000 },
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error') // erro login
    res.locals.alert = req.flash('alert') // utilizando esse para alertas gerais
    //res.locals.error_msg = req.flash('error_msg')
    res.locals.userLogged = req.user || null
    // testes
    res.locals.url = req.url
    next()
})

const IndexRouter = require('./routes/IndexRouter')
const UserRouter = require('./routes/UserRouter')
const RoleRouter = require('./routes/RoleRouter')

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/', IndexRouter)
app.use('/', UserRouter)
app.use('/', RoleRouter)

app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`)
})

