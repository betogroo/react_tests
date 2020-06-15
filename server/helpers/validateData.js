'use strict';
const { check, body } = require('express-validator')
const { cpf } = require('cpf-cnpj-validator')
const moment = require('moment')
const badLanguage = ['bosta', 'merda', 'coco', 'inferno', 'xixi', 'caraio', 'aaa']
const validateData = []



const user = [
    check('name')
        .not().isEmpty().withMessage('O campo Nome não pode ser vazio')
        .not().isIn(badLanguage).withMessage('Nome inadequado')
        .not().isNumeric().withMessage('Campo Nome não aceita números')
        .trim(),
    check('rg')
        .not().isEmpty().withMessage('O Campo RG é Obrigatório')
        .blacklist('\.-')
        .isNumeric().withMessage('O campo RG só aceita número')
        .trim(),
    check('email')
        .not().isEmpty().withMessage('Obrigatório o cadastro do email')
        .isEmail().withMessage('Email inválido')
        .trim(),
    check('birthDate')
        .custom(async value => {
            if (moment().isBefore(value)) {
                return Promise.reject('Data de Nascimento futura');
            }
        })
        .not().isEmpty().withMessage('Campo data obrigatório')
        .trim(),
    check('cpf')
        .custom(async value => {
            if (!cpf.isValid(value)) {
                return Promise.reject('CPF Inválido');
            }
        })
        .blacklist('\.-')
        .trim()
]

const password = [
    body('password')
        .not().isEmpty().withMessage('Obrigatória a senha.')
]

const passwordUpdate = [
    body('password')
        .not().isEmpty().withMessage('Obrigatória a senha.'),
    body('passwordMatch')
        .not().isEmpty().withMessage('Obrigatório confirmar a senha!')
        .custom(async (value, { req }) => {
            if (value != req.body.passwordNew) {
                return Promise.reject('As senhas não coincidem!');
            }
        }),
    body('passwordNew')
        .not().isEmpty().withMessage('Obrigatória a senha!')
]



const role = [
    check('name').not().isEmpty().withMessage('O campo não pode ser vazio')
        .isLength({ min: 3, max: 20 }).withMessage('O campo deve ter entre 3 e 20 caracteres alfanuméricos')
        .not().isIn(badLanguage).withMessage('por favor não use palavrões no nome')
        .trim()

]



validateData.User = user
validateData.Role = role
validateData.Password = password
validateData.PasswordUpdate = passwordUpdate


module.exports = validateData