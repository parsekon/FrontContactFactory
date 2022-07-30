import { useEffect, useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import contactFactory from "../contactFactory";
import provider from "../provider";

const AddContact = () => {
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!telegram) {
      setErrorMessage("Необходимо заполнить поле Telegram");
    }
    const signer = provider.getSigner();
    const contactFactoryWithSigner = contactFactory.connect(signer);
    console.log("func:", contactFactoryWithSigner);
    try {
      // в случае использования перегражунных функций необходимо
      // использовать синтаксис с квадратными скобками и прописывать функцию с аргументами в кавычках
      let response;
      if (discord) {
        response = await contactFactoryWithSigner[
          "createContact(string,string)"
        ](telegram, discord);
      } else {
        response = await contactFactoryWithSigner["createContact(string)"](
          telegram
        );
        console.log("createContact(string)");
      }
      setSuccessMessage("Хэш транзакции: " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout>
      <Form
        error={!!errorMessage}
        success={!!successMessage}
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Telegram"
            value={telegram}
            onChange={(event) => setTelegram(event.target.value)}
            placeholder="Введите Telegram"
          />
          <Form.Field
            control={Input}
            label="Discord"
            value={discord}
            onChange={(event) => setDiscord(event.target.value)}
            placeholder="Введите Discord"
          />
        </Form.Group>
        <Message
          style={{ wordBreak: "break-word" }}
          error
          header="Ну что ж такое"
          content={errorMessage}
        />
        <Message success header="Успех" content={successMessage} />
        <Button primary>Сохранить</Button>
      </Form>
    </Layout>
  );
};

export default AddContact;
