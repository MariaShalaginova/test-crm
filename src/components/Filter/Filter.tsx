import React from "react";
import styles from "./Filter.module.scss";
import DropdownFilter from "../Dropdownfilter/DropdownFilter";
import store from "../../store/store";
import close from "../../assets/close.svg";
import { observer } from "mobx-react-lite";
import DateMenu from "../Datemenu/DateMenu";
import arrowLeft from "../../assets/arrow_left.svg";
import arrowRight from "../../assets/arrow_right.svg";
import datePicker from "../../assets/datepicker.svg";
import { format } from "date-fns";

const Filter: React.FC = observer(() => {
  return (
    <div className={styles.container}>
      <div className={styles.container__buttons}>
        <DropdownFilter />
        {(store.filter === "Исходящие" || store.filter === "Входящие") && (
          <button
            className={styles.button}
            onClick={() => store.setFilter("Все типы")}
          >
            Сбросить фильтр <img src={close} alt="reset" />
          </button>
        )}
      </div>
      <div
        className={styles.container__date}
        onClick={() => store.setIsDateMenuOpen(!store.isDateMenuOpen)}
      >
        <img src={arrowLeft} alt="left Arrow" className={styles.img} />
        <img src={datePicker} alt="datePicker" className={styles.img} />
        {store.dateRange === "Указать даты" ? (
          <span>
            {store.startDate && format(store.startDate, "dd.MM.yy")}
            {"-"}
            {store.endDate && format(store.endDate, "dd.MM.yy")}
          </span>
        ) : (
          <span>{store.dateRange}</span>
        )}
        {/* <span>{store.dateRange}</span> */}
        <img src={arrowRight} alt="right Arrow" className={styles.img} />
      </div>

      {store.isDateMenuOpen && <DateMenu />}
    </div>
  );
});

export default Filter;
