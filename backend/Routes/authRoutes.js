const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/authController');
const User = require('../models/User');

router.post('/signup', signup);
router.post('/login', login);

router.post('/account', async (req, res) => {
  try {
    const { name, email, phone, homeNumber, street, landmark, city, state } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        phone,
        address: { homeNumber, street, landmark, city, state }
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Account details saved successfully', user: updatedUser });
  } catch (error) {
    console.error('Error saving account details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
