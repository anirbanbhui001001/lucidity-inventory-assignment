import {
  Screen,
  NavBar,
  Card,
  Title,
  Form,
  Footer,
  Default,
} from "./components/React";

function App() {
  return (
    <>
      <NavBar />
      <Screen>
        <Card>
          <Default />
        </Card>
        <Card>
          <Title text={"Example UI Kit"} />
          <Form />
        </Card>
      </Screen>
      <Footer />
    </>
  );
}

export default App;
