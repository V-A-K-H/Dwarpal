const jwt = require('jsonwebtoken');
const adminauthenticate = require('../../middleware/adminauthenticate');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const auth = require('../../middleware/auth');
/* global localStorage, */
const config = require('config');
const {check, validationResult} = require('express-validator');
const Admin = require('../../models/admin');
const student = require('../../models/student');
router.get('/auth/:auth', adminauthenticate, async (req, res) => {
  const adminProfile = await student.find();
  res.status(200).json(adminProfile);
});
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const {email, password} = req.body;
    try {
      let admin = await Admin.findOne({email});

      if (!admin) {
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
      }
      // checks if the user exsists or not
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
      }
      const payload = {
        user: {
          id: admin.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({jwtToken: token});
        // try{localStorage.setItem("sessionUser",token);}
      });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
