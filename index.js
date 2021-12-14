const contactsOperations = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            try {
                const contacts = await contactsOperations.listContacts();
                console.table(contacts);
            } catch (error) {
                console.log(error.message)
            }
            break;

        case 'get':
            try {
                const contact = await contactsOperations.getContactById(id);
                console.log(contact);
            } catch (error) {
                console.log(error.message)
            }
            break;


        case 'remove':
            try {
                const removeContact = await contactsOperations.removeContact(id);
                console.table(removeContact);
            } catch (error) {
                console.log(error.message)
            }
            break;


        case 'add':
            try {
                const newContact = await contactsOperations.addContact({ name, email, phone });
                console.table(newContact);
            } catch (error) {
                console.log(error.message)
            }
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};



invokeAction(options);