const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body)=>{
    const notes = loadNotes();
    //const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title);
    
    if(!duplicateNote)
    {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('Note added'));
    }
    else{
        console.log(chalk.red.inverse('Note title taken'));
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const loadNotes = ()=>{
    try{
        const bufferData = fs.readFileSync('notes.json');
        const stringData = bufferData.toString();
        const notes = JSON.parse(stringData)
        return notes;
    }
    catch(e){
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse("Note removed"));
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse("No note found"));
    }
    // console.log(`Removing this:${title}`)
}

const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.inverse("Your notes are: "))
    notes.forEach(note=>{
        console.log(chalk.blue.inverse(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note)
        console.log(chalk.green.inverse(`Body of tile ${title} is ${note.body}`))
    else
        console.log(chalk.red.inverse("No note found"));
}   

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};