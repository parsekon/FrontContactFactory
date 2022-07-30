import { useRef, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import getContactByAddress from "../utils/getContactByAddress";

// компонет просмотра карточек
const ShowContact = () => {
  const [telegram, setTelegram] = useState();
  const [discord, setDiscord] = useState();
  const [desc, setDesc] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setLoading] = useState(false);
  const addressRef = useRef();
  const [currentAccount, setCurrentAccount] = useState(() =>
    localStorage.getItem("currentAccount")
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const address = addressRef.current.value;
    // устанавливаем сообщение об ошибки пустым, чтобы в случае не пустого адреса сообщение об ошибке не выводилось
    setErrorMessage("");
    setTelegram("");
    setDiscord("");
    setDesc("");

    // проверяем, что форма не пустая иначе выводится сообщение, что необходимо ввести адрес
    if (!address) {
      setErrorMessage("Нужно ввести адрес владельца");
      return;
    }

    setLoading(true);
    // обращаемся к контракту ContactFactory, получаем адрес контракта Contact по адресу владельца
    // по этому адресу обращаемся к контракту Contact
    // вызываем функции telegram, discord, desc

    try {
      const contact = await getContactByAddress(address);
      setTelegram(contact.telegram);
      setDiscord(contact.discord);
      setDesc(contact.desc);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // error необходимо привести к булевому типу иначе в консоли выводится ошибка. Для этого ставим !! это означает false
  return (
    <Layout>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Field>
          <label>Введите адрес</label>
          <input ref={addressRef} placeholder="Адрес контакта" />
        </Form.Field>
        <Message error header="Ну что ж такое" content={errorMessage} />
        <Button loading={isLoading} primary type="submit">
          Посмотреть
        </Button>
      </Form>
      {telegram && <h1>Telegram: {telegram}</h1>}
      {discord && <h1>Discord: {discord}</h1>}
      {desc && <h1>Description: {desc}</h1>}
    </Layout>
  );
};

export default ShowContact;
