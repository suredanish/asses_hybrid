const ROUTER = require('express').Router();

const CONTROLLER = require('../controller/seller')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../middleware/auth');


//Creating user routes to fetch users data
ROUTER.get('/user', async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ message: 'No user found' })
        }
        return res.json({ user: user })
    } catch (error) {
        return res.json({ error: error });
    }
})

module.exports = ROUTER;
