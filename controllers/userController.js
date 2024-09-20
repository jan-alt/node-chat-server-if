const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ field: 'username', message: `User ${username} not found` })
        if (!user.comparePassword(password)) return res.status(404).json({ field: 'password', message: 'Incorrect password!' })
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SIGNATURE, { expiresIn: '1h' })
        res.json({ token })
    } catch (error) {
        res.json({ field: 'username', message: 'Server error' })
    }
}

exports.register = async (req, res) => {
    try {
        const body = req.body
        let newUser = new User(body)
        await newUser.save()
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SIGNATURE, { expiresIn: '1h' })
        res.json({ token })
        // res.json({ field: 'username', message: 'User created' })
    } catch (error) {
        console.log(error)
        res.json({ field: 'username', message: 'Server error' })
    }
}

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')    
        if (!user) return res.status(404).json({ field: 'username', message: 'User not found' })
        res.json({ user })
    } catch (error) {
        res.json({ field: 'username', message: 'Server error' })
    }
}

exports.getUsers = async (req, res) => {
    try {

        const userId = req.userId;
        const users = await User.find({ _id: { $ne: userId } }).select('-password');

        if (!users) return res.status(404).json({ field: 'username', message: 'User not found' })
        res.json({ users })

    } catch (error) {
        res.json({ field: 'username', message: 'Server error' })
    }
}