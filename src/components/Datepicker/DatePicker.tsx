import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.scss";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import CustomInput from "../DateInput/DateInput";
import { DatePickerProps } from "../../Types";
import SpinnerCat from "../Spinner/spinner";

const CustomDatePicker: React.FC<DatePickerProps> = observer(() => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    store.setStartDate(start);
    store.setEndDate(end);
    store.setDateRange("Указать даты", start, end);

    if (start && end) {
      store.fetchCallsByDateRange(); // Вызываем метод для отправки запроса
    }

    console.log(store.dateRange);
    console.log(start);
    console.log(end);
  };

  if (store.loading) {
    return (
      <div>
        <SpinnerCat />
      </div>
    );
  }

  return (
    <div className={styles.datePicker}>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        // isClearable
        placeholderText="__.__.__ - __.__.__"
        dateFormat="dd.MM.yy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        customInput={<CustomInput />}
        // icon={datepicker}
      />
    </div>
  );
});

export default CustomDatePicker;
