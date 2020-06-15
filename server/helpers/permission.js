module.exports = {
    isAdmin: function (req, res, next) {
        //var url = req.url
        if (req.isAuthenticated() && req.user.idRole > 99) {
            return next()
        } else {

            req.flash("error", "Acesso restrito. " + res.locals.url)
            res.redirect("/")
        }

    },

    isUser: function (req, res, next) {

        if (req.isAuthenticated() && req.user.idRole > 9) {
            return next()
        } else {
            req.flash("error", "Você deve estar logado para acessar aqui")
            res.redirect("/")
        }

    }

}