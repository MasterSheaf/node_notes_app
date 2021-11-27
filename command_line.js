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
    handler: function (argv) {
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
    handler: () => {
        console.log('Removing a new note');
    }
});

// create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function () {
        console.log('Reading a note');
    }
});

// create list command
yargs.command({
    command: 'list',
    describe: 'List the existing notes',
    handler: () => {
        console.log('Listing notes');
    }
});

yargs.parse();
