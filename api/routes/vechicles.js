const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const Vechicle = require('../models/vechicles');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET'
    });
});

router.post('/', (req, res, next) => {
    const vechicle = new Vechicle({
        _id: mongoose.Schema.Types.ObjectId,
        type: req.body.vtype,
        brand: req.body.brand,
        model: req.body.model
    });
    vechicle.save()
    .then(result => {console.log(result);})
    .catch(err => {console.log(err)});

    res.status(200).json({
        message: 'Handling POST',
        createdVech: vechicle
    });
});

router.get('/:vechicleid', (req, res, next) => {
    const id = req.params.vechicleid;
    if (id==='special'){
        res.status(200).json({
            message: 'Handling GETbyID special'
        });
    }
    else{
        res.status(200).json({
            message: 'Handling GETbyID general'
        });
    }
});

module.exports=router;