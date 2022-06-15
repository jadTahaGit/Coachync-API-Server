const express = require("express");
const router = express();
let Service = require("../models/service.model");

// show a list of all services (no filter yet)
router.get("/", (req, res) => {
  Service.find()
    .then((services) => res.json(services))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/add", (req, res) => {
  const title = req.body.title;
  const username = req.body.username;
  //   const descriptionTitle = req.body.Description.title;
  //   const descriptionTextArea = req.body.Description.TextArea;

  const newService = new Service({
    title,
    username,
    // descriptionTitle,
    // descriptionTextArea,
  });

  newService
    .save()
    .then(() => {
      res.json(
        "Service Added Successfully! :) "
        //   +JSON.stringify(req.body)
      );
    })
    .catch((err) => res.status(400).json("Error" + err));
});

// router.route("/:id").get((req, res) =)

module.exports = router;
