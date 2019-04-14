const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vechicle = require("../models/vechicles");

router.get("/", (req, res, next) => {
  Vechicle.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const vechicle = new Vechicle({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    brand: req.body.brand,
    model: req.body.model
  });
  vechicle
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /Vechicles",
        createdVechicle: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:vechicleId", (req, res, next) => {
  const id = req.params.vechicleId;
  Vechicle.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:vechicleId", (req, res, next) => {
  const id = req.params.vechicleId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Vechicle.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:vechicleId", (req, res, next) => {
  const id = req.params.vechicleId;
  Vechicle.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;