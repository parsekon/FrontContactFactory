import { useEffect, useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import getContactByAddress from "../utils/getContactByAddress";
import { useRouter } from "next/router";
import provider from "../provider";
import Contact from "../Contact";
import contactFactory from "../contactFactory";

const UserPage = () => {
  const router = useRouter();
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [desc, setDesc] = useState("");
  const [currentAccount, setCurrentAccount] = useState();
  const [errorMessageT, setErrorMessageT] = useState();
  const [successMessageT, setSuccessMessageT] = useState();
  const [errorMessageD, setErrorMessageD] = useState();
  const [successMessageD, setSuccessMessageD] = useState();
  const [errorMessageDesc, setErrorMessageDesc] = useState();
  const [successMessageDesc, setSuccessMessageDesc] = useState();

  useEffect(() => {
    setCurrentAccount(sessionStorage.getItem("currentAccount"));
  }, [currentAccount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessageT("");
    setSuccessMessageT("");

    const signer = provider.getSigner();
    console.log("signer >>>", signer);
    const addressContact = await contactFactory.ownerToContact(currentAccount);
    const contractWithSigner = Contact(addressContact).connect(signer);
    console.log(contractWithSigner);

    if (!!telegram) {
      try {
        const response = await contractWithSigner.setTelegram(telegram);
        setSuccessMessageT("Хэш транзакции: " + response.hash);
      } catch (error) {
        console.error(error);
        setErrorMessageT(error.message);
      }
    } else if (!!discord) {
      try {
        const response = await contractWithSigner.setDiscord(discord);
        setSuccessMessageD("Хэш транзакции: " + response.hash);
      } catch (error) {
        console.error(error);
        setErrorMessageD(error.message);
      }
    } else if (!!desc) {
      try {
        const response = await contractWithSigner.setDesc(desc);
        setSuccessMessageDesc("Хэш транзакции: " + response.hash);
      } catch (error) {
        console.error(error);
        setErrorMessageDesc(error.message);
      }
    }
  };

  return (
    <Layout>
      {currentAccount ? (
        <>
          <h1>Редактировать контакты:</h1>

          <Form
            error={!!errorMessageT}
            success={!!successMessageT}
            onSubmit={handleSubmit}
          >
            <Form.Field
              control={Input}
              label="Изменить Telegram"
              placeholder="Введите новый Telegram"
              value={telegram}
              onChange={(event) => setTelegram(event.target.value)}
            />
            <Message
              style={{ wordBreak: "break-word" }}
              error
              header="Ну что ж такое"
              content={errorMessageT}
            />
            <Message success header="Успех" content={successMessageT} />
            <Button primary type="submit">
              Сохранить Telegram
            </Button>
          </Form>

          <Form
            error={!!errorMessageD}
            success={!!successMessageD}
            onSubmit={handleSubmit}
          >
            <Form.Field
              control={Input}
              label="Изменить Discord"
              placeholder="Введите новый Discord"
              value={discord}
              onChange={(event) => setDiscord(event.target.value)}
            />
            <Message
              style={{ wordBreak: "break-word" }}
              error
              header="Ну что ж такое"
              content={errorMessageD}
            />
            <Message success header="Успех" content={successMessageD} />
            <Button primary type="submit">
              Сохранить Discord
            </Button>
          </Form>

          <Form
            error={!!errorMessageDesc}
            success={!!successMessageDesc}
            onSubmit={handleSubmit}
          >
            <Form.Field
              control={Input}
              label="Изменить description"
              placeholder="Введите новый description"
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
            />
            <Message
              style={{ wordBreak: "break-word" }}
              error
              header="Ну что ж такое"
              content={errorMessageDesc}
            />
            <Message success header="Успех" content={successMessageDesc} />
            <Button primary type="submit">
              Сохранить description
            </Button>
          </Form>

          <Button primary onClick={() => router.push("/user")}>
            назад в профиль
          </Button>
        </>
      ) : (
        <h1>Аторизуйтесь, пожалуйста</h1>
      )}
    </Layout>
  );
};

export default UserPage;
