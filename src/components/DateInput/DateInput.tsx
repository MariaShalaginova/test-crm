import styles from "./DateInput.module.scss";
import React from "react";
import datepicker from "../../assets/datepicker.svg";
import { observer } from "mobx-react-lite";

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = observer(
  ({ value, onClick }) => {
    return (
      <div className={styles.datepickerInput}>
        <input
          type="text"
          value={value}
          onClick={onClick}
          readOnly
          placeholder="__.__.__ - __.__.__"
          className={styles.datepickerInput__input}
        />
        <img
          src={datepicker}
          alt="Calendar"
          className={styles.datepickerInput__icon}
          onClick={onClick}
        />
      </div>
    );
  }
);

export default CustomInput;
