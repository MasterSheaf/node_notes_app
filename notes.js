const fs = require('fs');

const getNotes = () => {
    return "Your notes..."
}

// save a note to the data store
const addNote = (filename, title, body) => {

    const notes = loadNotes(filename);

    // make sure this note title doesn't already exist
    const duplicateNotes = notes.filter( (note) => {
        // gets called for each element of the array
        // return true if it is a duplicate and therefor
        // gets pushed intol the duplicateNotes array
        return (note.title === title);
    });

    if (duplicateNotes.length != 0){
        // this one is already in the list
        // so we ignore it
        console.log(`Ignoring duplicate note - ${title}`);
        return;
    }

    notes.push({
        "title": title,
        "body": body
    });

    console.log("New Database...");

    console.log(notes);

    saveNotes(filename, notes);
}

const saveNotes = (filename, notes) => {

    const content = JSON.stringify(notes);

    fs.writeFileSync(filename,content,{encoding:'utf8',flag:'w'});
}

const loadNotes = (filename) => {

    // expecting an array of note objects
    var listOfNotes = [];

    // open the file
    if (fs.existsSync(filename)) {

        // read out the data in a string format
        const fileContents = fs.readFileSync(filename, "utf8");
        
        // if file is empty for some reason we still want to succeed
        if (fileContents.length > 0) {
            // parse it into object(s)
            listOfNotes = JSON.parse(fileContents);
        }

        console.log(listOfNotes);

    } else {
        console.log(`${filename} does not exist`);
    }
    
    return listOfNotes;
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote
}