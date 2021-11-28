const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Your notes..."
}

const removeNote = (filename, title) => {

    const notes = loadNotes(filename);

    // make sure this note title doesn't already exist
    const allButTheRemovedNotes = notes.filter( (note) => {
        // gets called for each element of the array
        // return true if it is a duplicate and therefor
        // gets pushed intol the duplicateNotes array
        return (note.title !== title);
    });

    if (allButTheRemovedNotes.length == notes.length) {
        console.log(chalk.white.bgRed(`No Note Found Titled '${title}' to Remove!`));
    } else {
        console.log(chalk.black.bgGreen(`Removed '${title}'`));
    }
    //console.log("New Database...");

    //console.log(allButTheRemovedNotes);

    saveNotes(filename, allButTheRemovedNotes);
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

    //console.log("New Database...");

    //console.log(notes);

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

        //console.log(listOfNotes);

    } else {
        console.log(`${filename} does not exist`);
    }
    
    return listOfNotes;
}

const listNotes = (filename) => {

    const notes = loadNotes(filename);

    notes.forEach(element => {
        console.log('----' + chalk.bgBlackBright.white.bold(element.title) + "----");
        console.log(chalk.blue(element.body));
    });
}

const findNote = (filename, title) => {

    const notes = loadNotes(filename);

    debugger;

    const noteWeAreLookingFor = notes.find( (note) => {
        return (note.title === title);
    })

    if (noteWeAreLookingFor === undefined) {
        console.log(chalk.red(`No Note Found Titled '${title}'`));
    } else {
        console.log('----' + chalk.bgBlackBright.white.bold(noteWeAreLookingFor.title) + "----");
        console.log(chalk.blue(noteWeAreLookingFor.body));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    findNote: findNote
}