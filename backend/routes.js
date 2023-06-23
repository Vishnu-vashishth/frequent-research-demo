const express = require('express');
const router = express.Router();
// const { Country, State, City, User } = require('./models');
let country = require('country-state-city').Country;
let state = require('country-state-city').State;
let city = require('country-state-city').City;
const User = require('./models');
router.get('/countries', async (req, res) => {
    try {
       
        const countries =   country.getAllCountries();
        res.json(countries);
      
    } catch (err) {
        res.json({ message: err });
    }
    }
);

// Assuming you have already imported the necessary modules and set up the server

router.get('/getstate/:id', async (req, res) => {
    try {
       
      const states = await state.getStatesOfCountry(req.params.id);
      res.json(states);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  


router.get('/getcities/:country/:state', async (req, res) => {
    try {
        const cities = await city.getCitiesOfState(req.params.country,req.params.state);
    
        res.json(cities);
    } catch (err) {
        res.json({ message: err });
    }
    }

);

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
    }
);

router.post('/user-data', async (req, res) => {
    const age = Math.floor((new Date() - new Date(req.body.dob).getTime()) / 3.15576e+10);
    const email = req.body.email;
    const users = await User.findOne({email:email});
    if (users.length > 0) {
        return res.status(401).json({ message: "User already exists" });
    } 
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        country: country.getCountryByCode(req.body.country).name,
        state: state.getStateByCodeAndCountry(req.body.state,req.body.country).name,
        city: req.body.city,
        dob: req.body.dob,
        age: age,

        
    });

    try {

        const savedUser = await user.save();
         return res.status(200).json(savedUser);
    } catch (err) {
        return res.json({ message: err });
    }
    }


);


module.exports = router;
