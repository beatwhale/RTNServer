const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const companyRouter = require('./companyRouter')
const adminRouter = require('./adminRouter')
const checkRole = require('../middleware/checkRoleMiddleware')


router.use('/user', userRouter)
router.use('/company', companyRouter)
router.use('/admin', adminRouter)

module.exports = router