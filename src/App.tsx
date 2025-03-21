import { useEffect } from "react";
import "./App.scss";
import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import store from "./store/store";
import SpinnerCat from "./components/Spinner/spinner";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  useEffect(() => {
    // Вызываем метод получения данных о звонках из хранилища
    const fetchData = async () => {
      await store.fetchCallsByDateRange();
    };

    fetchData();
  }, []);

  if (store.loading) {
    return (
      <div>
        <SpinnerCat />
      </div>
    );
  }

  if (store.error) {
    return (
      <div>
        <h1>Произошла ошибка при загрузке данных.</h1>
      </div>
    );
  }

  return (
    <>
      <Filter />
      <Table />
    </>
  );
});

export default App;
