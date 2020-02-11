const express = require("express");

const Data = require("../data/db");

const router = express.Router();

// GET Request
router.get("/", (req, res) => {
    Data.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving data",
        });
    });
});

router.get("/:id", (req,res) => {
    Data.findById(req.params.id)
        .then(data => {
            if(data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The post information could not be retrieved.",
            });
        });
});

router.get("/:id/comments", (req, res) => {
    Data.findCommentById(req.params.id)
        .then(data => {
            if(data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The comments information could not be retrieved."
            })
        })
})

// POST Request
router.post('/', (req, res) => {
    Data.insert(req.body)
        .then(info => {
            if(info){
                res.status(201).json(info);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the post to the database",
            });
        });
});

// DELETE Request
router.delete("/:id", (req, res) => {
    Data.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json({
                message: "The data has been nuked"
            });
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist.",
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The post could not be removed",
        });
    });
});

// PUT Request
router.put('/:id', (req, res) => {
    const changes = req.body;
    Data.update(req.params.id, changes)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The post information could not be modified.",
            });
        });
});

module.exports = router;


