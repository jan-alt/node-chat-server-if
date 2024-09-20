const {Server} = require('socket.io')
const Message = require('../models/Message')

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL  
    }})  
    io.on('connection', (socket) => {
        socket.on('create-room', ({yourId, partnerId}) => {
            const roomId = [yourId, partnerId].sort().join('_')
            socket.join(roomId)
        })
        socket.on('message', async ({yourId, partnerId, message}) => {
    
            const newMessage = new Message({ sender: yourId, receiver: partnerId, message })
            await newMessage.save()
            const roomId = [yourId, partnerId].sort().join('_')
            io.to(roomId).emit('list_message', newMessage)
        })
    })
}