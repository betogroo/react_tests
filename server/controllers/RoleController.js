const RoleService = require('../services/RoleService')
const { validationResult } = require('express-validator')
class RoleController {

    //GET    
    async  index(req, res) {
        var roles = await RoleService.getAll()
        //res.json(roles)
        res.render("role/index.ejs", { roles });
    }

    async view(req, res) {
        var { id } = req.params
        try {
            var role = await RoleService.getRole(id)
            //res.json({ role })
            res.render('role/view', { role })
        } catch (error) {
            console.log(error)
        }
    }

    async edit(req, res) {
        var { id } = req.params
        try {
            var role = await RoleService.getRole(id)

            //res.json({ role })
            res.render('role/edit', { role })
        } catch (error) {

        }
    }


    // POST
    async post(req, res) {
        var { id, name } = req.body
        const errors = validationResult(req).array();
        var error = []
        if (errors.length > 0) {
            errors.forEach(element => {
                error.push(element.msg)
            });
            req.flash('error', `${errors.length} erros: ${error.join(', ')}`)
            res.redirect('/role/new')
        } else {
            var data = { id, name }
            try {
                var role = await RoleService.store(data)
                //res.json({ role })
                res.redirect('/roles')
            } catch (error) {
                console.log(error)
            }
        }
    }

    async delete(req, res) {
        var { id } = req.body
        var role = await RoleService.delete(id)
        if (role) {
            //res.json({ "msg": "Permissão " + id + " deletada com sucesso" })
            res.redirect('/roles')
        } else {
            res.json({ "msg": "Não foi possível escluir a permissão" })
        }
    }
    async update(req, res) {
        var { id, name } = req.body

        const errors = validationResult(req).array();
        var error = []
        if (errors.length > 0) {
            errors.forEach(element => {
                error.push(element.msg)
            });
            req.flash('error', `${errors.length} erros: ${error.join(', ')}`)
            res.redirect('/role/edit/' + id)
        } else {

            try {
                var data = { id, name }
                var role = await RoleService.update(data)
                if (role) {
                    //res.json({ "msg": "Edição de permissão feita com sucesso" })
                    res.redirect('/roles')
                } else {
                    res.json({ "msg": "Não foi possível editar a permissão" })
                }
            } catch (error) {
                console.log(error)
            }
        }

    }


}

module.exports = new RoleController