const db = require('../models/')
const { Op } = require("sequelize")
const bcrypt = require('bcryptjs')
const randomID = require('crypto-random-string');




class UserService {

    constructor() {
        this.User = db['User']
        this.Role = db['Role']
    }

    async getAll(offset, limit, order) {
        try {
            let users = await this.User.findAndCountAll({
                include: [
                    {
                        model: this.Role,
                        attributes: ['id', 'name']
                    }
                ],
                order: [[order]],
                offset: offset,
                limit: limit
            })
            if (users) {
                return Promise.resolve(users)
            } else {
                return "Erro ao listar usuários"
            }
        } catch (error) {
            Promise.reject(error)
        }
    }

    async getUser(id) {
        try {
            var user = await this.User.findByPk(id, {
                include: [
                    {
                        model: this.Role,
                        attributes: ['id', 'name']
                    }
                ]
            })
            if (user) {
                return user
            } else {
                return "Erro ao buscar Usuário"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getByEmail(email) {
        try {
            var user = await this.User.findOne({
                where: {
                    email: email
                }
            })
            return user
        } catch (error) {
            console.log(error)
        }
    }
    async getByCpf(cpf) {
        try {
            var user = await this.User.findOne({
                where: {
                    cpf: cpf
                }
            })
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getByName(offset, limit, name){
        try {
            let users = await this.User.findAndCountAll({
                include: [
                    {
                        model: this.Role,
                        attributes: ['id', 'name']
                    }
                ],
                where: {
                    name: {
                        [Op.startsWith]: name // Aprimorar a busca.
                    }
                },
                order: [['name']],
                offset: offset,
                limit: limit
            })
            return users
        } catch (error) {
            console.log(`Erro: ${error}.`)
        }

    }

    async store(data) {
        try {
            data.id = randomID({ length: 8, type: 'url-safe' })
            var user = await this.User.create(data)
            if (user) {
                return user
            } else {
                return "Erro ao Gravar usuário"
            }
        } catch (error) {
            console.log(error)
        }
    }
    async delete(id) {
        try {
            var user = await this.User.destroy({
                where: { id: id }
            })
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async update(data) {
        try {
            var user = await this.User.update(data, {
                where: { id: data.id }
            })
            return user
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new UserService