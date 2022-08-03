import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import getContactByAddress from "../utils/getContactByAddress";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
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
      console.error(error);
    }
  };
  getInfo(currentAccount);

  if (!currentAccount) {
    return (
      <Layout>
        <h1>Аторизуйтесь, пожалуйста</h1>
      </Layout>
    );
  } else if (!telegram) {
    return (
      <Layout>
        <h1>Создайте крточку с контактами</h1>
        <Button primary onClick={() => router.push("/add")}>
          Создать Контакт
        </Button>
      </Layout>
    );
  }
  return (
    <Layout>
      <>
        <h1>User: {currentAccount}</h1>
        {telegram && <h1>Telegram: {telegram}</h1>}
        {discord && <h1>Discord: {discord}</h1>}
        {desc && <h1>Description: {desc}</h1>}
        <Button primary onClick={() => router.push("/edit")}>
          Редактировать контакты
        </Button>
      </>
    </Layout>
  );
};

export default UserPage;
