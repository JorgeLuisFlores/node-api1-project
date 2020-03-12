// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

//GET
server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'The users information could not be retrieved.',
                err
            });
        });
});

//GET by ID
server.get('/users/:id', (req, res) => {
    const {
        id
    } = req.params;

    db.findById(id)
        .then(users => {
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.'
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'The user information could not be retrieved.',
                err
            });
        });
});

//POST
server.post('/users', (req, res) => {
    const userInfo = req.body;
    const {
        name,
        bio
    } = userInfo
    if (!name || !bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    db.insert(userInfo)
        .then(user => {
            res.status(201).json({
                success: true,
                user
            });
        })

        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        });
});


//DELETE
server.delete('/users/:id', (req, res) => {
    const {
        id
    } = req.params;

    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The user with the specified ID does not exist.'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'The user could not be removed.',
                err
            })
        });
});

//PUT
server.put('/users/:id', (req, res) => {
    const {
        id
    } = req.params;
    const changes = req.body;
    const {
        name,
        bio
    } = changes
    if (!name || !bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }

    db.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json({
                    success: true,
                    updated
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The user with the specified ID does not exist.'
                });
            }
        })

        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'The user information could not be modified.',
                err
            })
        });
});



server.listen(4000, () => {
    console.log('Listening on port 4000');
});