import { program } from "commander";
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();


// TODO: рефакторити
async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      return console.table(contactsList);
      break;
    case "get":
      const getContact = await getContactById(id);
      return console.log(getContact);
      break;
    case "add":
      const newContact = await addContact(data);
      return console.log(newContact);
      break;
    case "remove":
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
