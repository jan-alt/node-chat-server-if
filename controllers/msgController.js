const msg = require('../models/Message')

exports.getMsgs = async (req, res) => {
    try {
        const yourId = req.params.yourId
        const partnerId = req.params.partnerId
        console.log(yourId, partnerId)
        let messages =[];
        messages = await msg.find({
            $or : [
                { sender: yourId, receiver : partnerId },
                { sender: partnerId, receiver : yourId }
            ]
        })
        res.json({messages});
    }
    catch
    {
        res.status(500).json({message: "Something is amiss"})
    }

}
