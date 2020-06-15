var express = require('express')
var router = express.Router()
const RoleController = require('../controllers/RoleController')
const validateData = require('../helpers/validateData')
const checkData = require('../helpers/checkData')

const { isAdmin } = require('../helpers/permission')


router.get('/roles', RoleController.index)
router.get('/role/new', (req, res) => {
    res.render('role/new')
})
router.get('/role/:id', RoleController.view)
router.get('/role/edit/:id', RoleController.edit)



router.post('/role',
    [
        validateData.Role,
        checkData.Id
    ],
    RoleController.post)
router.post('/role/delete/', RoleController.delete)
router.post('/role/update',
    validateData.Role,
    RoleController.update)

module.exports = router