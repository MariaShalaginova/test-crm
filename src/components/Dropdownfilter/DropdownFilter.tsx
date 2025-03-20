import React from "react";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import styles from "./DropdownFilter.module.scss";
import arrow from "../../assets/arrow.svg";

const DropdownFilter: React.FC = observer(() => {
  const filters = ["Все типы", "Входящие", "Исходящие"];

  const toggleDropdown = () => {
    store.setCallFilterIsOpen(!store.isCallFilterOpen);
  };

  const handleFilterClick = (filter: string) => {
    store.setFilter(filter); // Устанавливаем фильтр
    store.setCallFilterIsOpen(false);
  };
  const isActiveFilter =
    store.filter === "Входящие" || store.filter === "Исходящие";

  return (
    <div className={styles.dropdown}>
      <button
        className={`${styles.dropdown_toggle} ${
          isActiveFilter ? styles.active : ""
        }`}
        onClick={toggleDropdown}
      >
        {store.filter} <img src={arrow} alt="arrow" />
      </button>

      {store.isCallFilterOpen && (
        <div className={styles.dropdown__menu}>
          {filters.map((filter) => (
            <div
              key={filter}
              className={styles.dropdown__menu_item}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default DropdownFilter;
