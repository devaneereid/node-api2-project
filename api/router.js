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
    const {title, contents} = req.body;
        if(!title && !contents){
            res.status(400).json({ errorMessage: "Please provide title and content"})
        } else {
            Data.insert({title, contents})
                .then(info => {
                    res.status(201).json(info)
                })
                .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: "There was an error while saving the post to the database",
                });
            })
        }
});

router.post("/:id/comments", (req, res) => {
    const newComment = req.body;
        if(newComment) {
            Data.insertComment(req.body)
                .then(comment => {
                    if (comment) {
                        res.status(201).json(comment)
                    } else {
                        res.status(404).json({
                            message: "The post with the specified ID does not exist."
                        })
                    }
                })
                .catch(error => {
                    console.log('Error posting comment', error)
                    res.status(500).json({
                        error: "There was an error while saving the post to the database",
                    });
                })
                } else {
                    res.status(400).json({
                        errorMessage: "Please provide title and contents for the post."
                    })
                }
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
    // const changes = req.body;
    Data.update(req.params.id, req.body)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The post information could not be modified.",
            });
        });
});


module.exports = router;


