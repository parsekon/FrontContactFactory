import Contact from "../Contact";
import contactFactory from "../contactFactory";

// если адрес не найден, выводится сообщение trow ...
const getContactByAddress = async (address) => {
  const contactAddress = await contactFactory.ownerToContact(address);

  if (contactAddress === "0x0000000000000000000000000000000000000000") {
    throw new Error("Такой адрес не найден");
  }

  console.log("contactAddress:", contactAddress);
  const contact = Contact(contactAddress);
  const telegram = await contact.telegram();
  console.log("Telegram:", telegram);
  const discord = await contact.discord();
  console.log("Discord:", discord);
  const desc = await contact.desc();
  console.log("Desc:", desc);
  return { telegram, discord, desc };
};

export default getContactByAddress;
