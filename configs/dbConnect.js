module.exports = async () => {
    try {
        await require('mongoose')
            .connect(process.env.MONGOURL)
        console.log('Connected to MongoDB even on a non-Friday!')
    } catch (e) {
        console.log('No connection established')
    }
}