'use strict';
const { check } = require('express-validator')
const UserService = require('../services/UserService')
const RoleService = require('../services/RoleService')
const bcrypt = require('bcryptjs')

const checkData = []



// checa se o email já está cadastrado
const email = [
    check('email').custom(async value => {
        const user = await UserService.getByEmail(value);
        if (user) {
            return Promise.reject('Email já em uso');
        }
    })
        .trim()
]
const cpf = [
    check('cpf').custom(async value => {
        const user = await UserService.getByCpf(value);
        if (user) {
            return Promise.reject('Este CPF já está cadastrado no sistema!');
        }
    })
        .trim()
]

// checa se um id já existe para impedir. Usado me tabelas sem autoincrement
const id = [
    check('id').isNumeric().withMessage('O campo tem que ser numérico').custom(async value => {
        const role = await RoleService.getRole(value);
        if (role) {
            return Promise.reject('Nível já cadastrado');
        }
    })
]




checkData.Email = email
checkData.Id = id
checkData.Cpf = cpf




module.exports = checkData