import React, { useEffect, useRef } from "react";
import styles from "./DateMenu.module.scss";
import { DateRangeMenuProps } from "../../Types";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import CustomDatePicker from "../Datepicker/DatePicker";

const DateMenu: React.FC<DateRangeMenuProps> = observer(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  //закрытие меню при нажатии мыши вне окна
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        store.setIsDateMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleSelect = (range: string) => {
    store.setDateRange(range);
    store.setIsDateMenuOpen(false);
    // console.log(store.dateRange);
  };

  return (
    <>
      <div ref={containerRef} className={styles.container}>
        <button
          className={store.dateRange === "3 дня" ? styles.selected : ""}
          onClick={() => handleSelect("3 дня")}
        >
          3 дня
        </button>
        <button
          className={store.dateRange === "Неделя" ? styles.selected : ""}
          onClick={() => handleSelect("Неделя")}
        >
          Неделя
        </button>
        <button
          className={store.dateRange === "Месяц" ? styles.selected : ""}
          onClick={() => handleSelect("Месяц")}
        >
          Месяц
        </button>
        <button
          className={store.dateRange === "Год" ? styles.selected : ""}
          onClick={() => handleSelect("Год")}
        >
          Год
        </button>

        <span>Указать даты</span>
        <CustomDatePicker />
      </div>
    </>
  );
});

export default DateMenu;
