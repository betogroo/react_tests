var express = require('express')
var router = express.Router()
const IndexController = require('../controllers/IndexController')
const validateData = require('../helpers/validateData')
const { isAdmin, isUser } = require('../helpers/permission')

//router.get('/', IndexController.index)
router.get('/', IndexController.index)
router.get('/logout', IndexController.logout)
router.get('/test', IndexController.test)


router.post('/', IndexController.post)
router.post('/auth',
validateData.Password,
IndexController.auth)

module.exports = router