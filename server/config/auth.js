const localStrategy = require("passport-local").Strategy
const bcrypt = require('bcryptjs')
const UserService = require('../services/UserService')




module.exports = function (passport) {

    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {

        try {
            var userLogged = await UserService.getByEmail(email)

            if (!userLogged) {
                return done(null, false, { message: "Esta conta não existe." })
            } else {
                bcrypt.compare(password, userLogged.password, (error, match) => {
                    if (match) {
                        return done(null, userLogged)
                    } else {
                        return done(null, false, { message: "Senha Incorreta" })
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }))

    passport.serializeUser((userLogged, done) => {
        done(null, userLogged.id)

    })
    passport.deserializeUser(async (id, done) => {

        try {
            var userLogged = await UserService.getUser(id)
            if (userLogged) {
                done(null, userLogged.get())
            } else {
                done(userLogged.errors, null)
            }
        } catch (error) {
            console.log(error)
        }
    })
}