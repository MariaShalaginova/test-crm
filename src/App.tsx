import { useEffect } from "react";
import "./App.scss";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import store from "./store/store";

function App() {
  useEffect(() => {
    // Вызываем метод получения данных о звонках из хранилища
    const fetchData = async () => {
      await store.fetchCallsByDateRange();
    };

    fetchData();
  }, []);

  return (
    <>
      <Filter />
      <Table />
    </>
  );
}

export default App;
