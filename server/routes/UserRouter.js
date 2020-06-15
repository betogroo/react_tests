var express = require('express')
var router = express.Router()
const UserController = require('../controllers/UserController')
const { isAdmin, isUser } = require('../helpers/permission')
const validateData = require('../helpers/validateData')
const checkData = require('../helpers/checkData')




router.get('/users',
    //isAdmin,
    UserController.index)

router.get('/users/:page',
UserController.index)
router.get('/users/:page/:sort',
UserController.index)
    
router.get('/user', (req, res) => {
    res.redirect('/users')
})
router.get('/user/new',
    //isAdmin,
    UserController.new)
router.get('/profile', UserController.profile)
router.get('/profile/password', UserController.editPassword)
router.get('/user/:id', UserController.view)
router.get('/user/edit/:id', UserController.edit)

router.post('/profile/password',
    validateData.PasswordUpdate,
    UserController.updatePassword)



router.post('/user',
    [
        validateData.User,
        checkData.Email,
        checkData.Cpf
    ],
    UserController.post)
router.post('/user/delete/', UserController.delete)

router.post('/user/update',
    validateData.User,
    UserController.update)

router.post('/profile/update',
    [validateData.User, validateData.Password],
    UserController.updateProfile)

module.exports = router