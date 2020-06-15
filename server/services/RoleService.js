const db = require('../models/')
const { Op } = require("sequelize")




class RoleService {

    constructor() {

        this.Role = db['Role']
    }

    async getAll() {
        try {
            var roles = this.Role.findAll({
                attributes: ['id', 'name']
            })
            if (roles) {
                return roles
            } else {
                return "Erro ao listar Níveis de Permissão"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getRole(id) {
        try {
            var role = await this.Role.findByPk(id, {})
            //if (role) {
            return role
            //} else {
            //return "Erro ao buscar Nível de Permissão"
            // }
        } catch (error) {
            console.log(error)
        }
    }

    async getRolesExcludeId(id) {
        try {
            var roles = this.Role.findAll({
                attributes: ['id', 'name'],
                where: {
                    id: {
                        [Op.ne]: id
                    }
                }
            })
            if (roles) {
                return roles
            } else {
                return "Erro ao listar Níveis de Permissão"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async store(data) {
        try {
            var role = await this.Role.create(data)
            if (role) {
                return role
            } else {
                return "Erro ao Gravar Nível de Permissão"
            }
        } catch (error) {
            console.log(error)
        }
    }
    async delete(id) {
        try {
            var role = await this.Role.destroy({
                where: { id: id }
            })
            return role
        } catch (error) {
            console.log(error)
        }
    }
    async update(data) {
        try {
            var role = await this.Role.update({ name: data.name }, {
                where: { id: data.id }
            })
            return role
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new RoleService