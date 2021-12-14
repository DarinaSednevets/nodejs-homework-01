const path = require('path');
const fs = require('fs').promises;
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id.toString() === contactId);
    if (!contact) {
        return null;
    }
    return contact;
}


async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id.toString() === contactId);

    if (idx === -1) {
        return null;
    }
    const newContact = contacts.filter((_, index) => index !== idx);
    await updateContacts(newContact);
    return contacts[idx];
}

async function addContact(data) {
    const newContact = { ...data, id: v4() };
    const contacts = await listContacts();
    const updatedContactsList = [...contacts, newContact]
    await updateContacts(updatedContactsList);
    return newContact;
}

async function updateContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}