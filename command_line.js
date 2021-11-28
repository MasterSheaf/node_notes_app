const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.1.0');

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        // builder allows us to describe all the 
        // options we'd like the add command to support
        // for add we have title and body
        title: {
            describe: 'Note title', // help string
            demandOption: true, // must be title if user used "add"
            type: 'string' // require it to be a string
        },
        body: {
            describe: 'Note body', // help string
            demandOption: true, // must be title if user used "add"
            type: 'string' // require it to be a string
        },
        filename: {
            describe: 'file where notes are stored', // help string
            demandOption: true, // must be title if user used "add"
            type: 'string' // require it to be a string
        }
    },
    handler(argv) {
        console.log('Title: ' + argv.title);
        console.log('Body: ' + argv.body);
        console.log('File: ' + argv.filename);
        notes.addNote(argv.filename, argv.title, argv.body);
    }
});

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        // builder allows us to describe all the 
        // options we'd like the add command to support
        // for add we have title and body
        title: {
            describe: 'Note title', // help string
            demandOption: true, // must be title if user used "add"
            type: 'string' // require it to be a string
        },
        filename: {
            describe: 'file where notes are stored', // help string
            demandOption: true, // must be title if user used "add"
            type: 'string' // require it to be a string
        }
    },
    handler(argv){
        console.log('Removing a new note');
        console.log('Title: ' + argv.title);
        console.log('File: ' + argv.filename);
        notes.removeNote(argv.filename, argv.title);
    }
});

// create read command
yargs.command({
    command: 'read',
    describe: 'Find and display a single note by title',
    handler(argv){
        notes.findNote(argv.filename, argv.title);
    }
});

// create list command
yargs.command({
    command: 'list',
    describe: 'List the existing notes',
    handler(argv) {
        notes.listNotes(argv.filename);
    }
});

yargs.parse();
