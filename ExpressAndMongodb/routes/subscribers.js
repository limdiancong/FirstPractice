const express = require('express');
const router = express.Router()
const Subscriber = require("../models/subscriber");
const subscriber = require('../models/subscriber');

//getting all 
router.get('/', async (req, res) => {
    try {
        const Subscribers = await Subscriber.find()
        res.json(Subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//geting one 
router.get('/:id', getSubscriber, (req, res) => {
    //getSubscriber return res.subscriber 
    res.json(res.subscriber)
})


//creating one 
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//uodating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})
//delteing one 
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: `deleted ${res.subscriber.name}` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})


async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({ message: "Subscriber not found " })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next();
}
module.exports = router