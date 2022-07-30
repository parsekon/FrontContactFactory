import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import getContactByAddress from "../utils/getContactByAddress";

const UserPage = () => {
  const [telegram, setTelegram] = useState();
  const [discord, setDiscord] = useState();
  const [desc, setDesc] = useState();
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    setCurrentAccount(sessionStorage.getItem("currentAccount"));
  }, [currentAccount]);

  const getInfo = async (account) => {
    try {
      const contact = await getContactByAddress(account);
      setTelegram(contact.telegram);
      setDiscord(contact.discord);
      setDesc(contact.desc);
    } catch (error) {
      console.error(error.message);
    }
  };
  getInfo(currentAccount);

  return (
    <Layout>
      <h1>User: {currentAccount}</h1>
      {/* <Button primary onClick={handleClick}>
        {currentAccount}
      </Button> */}
      {telegram && <h1>Telegram: {telegram}</h1>}
      {discord && <h1>Discord: {discord}</h1>}
      {desc && <h1>Description: {desc}</h1>}
    </Layout>
  );
};

export default UserPage;
