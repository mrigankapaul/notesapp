// const validator = require('validator')
// console.log(getNotes())
// // console.log(validator.isEmail('mrigankaexample.com'))
// console.log(validator.isURL('http://www.google.com'))
// const success = chalk.green.bold
// const inversedSuccess = success.inverse
// console.log(inversedSuccess('Success123!'))
// console.log(process.argv[2])
const note = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')
const { title } = require('process')

//customize yargs
yargs.version('1.1.0')

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        note.addNote(argv.title, argv.body)
    }
})

// create remove command 

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler(argv) {
        note.removeNote(argv.title)
    },
    builder: { 
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    }
})

// create a read command 
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler(argv) {
        const readNote = note.readNote(argv.title)
        if(readNote){
            console.log(chalk.green.bold(' Title: '+ readNote.title + ' Body: '+ readNote.body))
        } else {
            console.log(chalk.red.inverse('No Note found for the title'))       
        }
    },
    builder: { 
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    }
})

// create a list command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler() {
        note.listNotes().forEach(note => console.log(chalk.blue(note.title)));
    }
})

yargs.parse()

// add, remove, read, list 

// console.log(yargs.argv)   