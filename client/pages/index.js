import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import Layout from "../components/Layout";

const Index = () => {
  const router = useRouter();
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Here you can write your own contacts or view any contacts</h1>
      <Button.Group>
        <Button primary onClick={() => router.push("/show")}>view</Button>
        <Button.Or text="||" />
        <Button positive onClick={() => router.push("/add")}>write</Button>
      </Button.Group>
    </Layout>
  );
};

export default Index;
