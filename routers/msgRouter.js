const {Router} = require('express')
const auth = require('../middlewares/auth')
const { getMsgs } = require('../controllers/msgController')

const msgRouter = Router()
msgRouter.get('/messages/:yourId/:partnerId', auth, getMsgs)

module.exports = msgRouter