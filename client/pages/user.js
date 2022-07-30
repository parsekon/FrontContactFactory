import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import getContactByAddress from "../utils/getContactByAddress";

const UserPage = () => {
  const [telegram, setTelegram] = useState();
  const [discord, setDiscord] = useState();
  const [desc, setDesc] = useState();
  const [currentAccount, setCurrentAccount] = useState(() =>
    localStorage.getItem("currentAccount")
  );

  (async () => {
    try {
      const contact = await getContactByAddress(currentAccount);
      setTelegram(contact.telegram);
      setDiscord(contact.discord);
      setDesc(contact.desc);
      console.log("currentAccount", currentAccount);
    } catch (error) {
      console.error(error.message);
    }
  })();

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
