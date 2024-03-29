// Prereqs
const express = require('express');
const fs = require('fs');
const path = require('path');
// Express
const app = express();
const PORT = process.env.PORT || 3000;
// DB
let dataBase = require('./db/db.json');
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.get ('/', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get ('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
app.get('/api/notes', (req, res)=>{
    res.json(dataBase);
})
app.post ('/api/notes', (req, res)=> {
    const newNote = req.body;
    newNote.id = Math.floor(Math.random() * 9999);
    dataBase.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(dataBase));
    res.json(dataBase);
}); 
app.delete('/api/notes/:id', async (req, res) => {
    const db = dataBase;
    const noteId = req.params.id;
    for (let i = 0; i < db.length; i++) {
      const id = parseInt(noteId);
      if (db[i].id === id) {
        db.splice(i, 1);
        fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db));
        res.json(db);
      }
    }
  });
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
});
