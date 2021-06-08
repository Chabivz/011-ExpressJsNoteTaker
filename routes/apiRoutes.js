const db = require('../db/db.json');
const router = require('express').Router();
const fs = require('fs');

router.get('/notes', (req, res) => {
    res.json(db);
});

router.post('/notes', (req, res) => {
    const id = Math.floor(Math.random()*10000)
    const title = req.body.title;
    const text = req.body.text;
    
    const newNotes = {
        id: id,
        title: title,
        text: text
    }
    
    db.push(newNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db);
});

router.delete('/notes/:id', (req, res) => {
    // const id = req.params.id;
    // const id = res.params.id;
    const { id } = req.params;

    console.log(id);    
    const index = db.findIndex((data, index) => data.id == id);
    db.splice(index, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db);
});



module.exports = router;