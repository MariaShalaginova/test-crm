import React, { useMemo } from "react";
import styles from "./Table.module.scss";
import CallRow from "../CallRow/CallRow";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import arrowDown from "../../assets/arrow_down.svg";
import arrowUp from "../../assets/arrow_up.svg";
import {
  getDateLabel,
  groupCallsByDate,
  handleSortByDurationOrDate,
} from "../../utils";
import Rows from "../../Types";

const Table: React.FC = observer(() => {
  const rows = store.filteredCallRows;

  // Группируем звонки по датам
  // const groupedCalls: { [key: string]: Rows[] } = groupCallsByDate(rows);
  const groupedCalls = useMemo(() => {
    return groupCallsByDate(rows);
  }, [rows]);

  // Форматируем звонки с заголовками

  return (
    <div className={styles.table}>
      <div className={styles.table__thead}>
        <div style={{ width: "5.4%" }}>Тип</div>
        <div
          className={styles.table__thead_time}
          onClick={() => handleSortByDurationOrDate("date")}
        >
          Время
          <div>
            <img
              src={store.order === "ASC" ? arrowDown : arrowUp}
              alt="open Arrow"
              className={styles.img}
            />
          </div>
        </div>

        <div style={{ width: "9%" }}>Сотрудник</div>
        <div style={{ width: "22.6%" }}>Звонок</div>
        <div style={{ width: "14.8%" }}>Источник</div>
        <div className={styles.table__thead_rate}>Оценка</div>
        <div
          className={styles.table__thead_duration}
          onClick={() => handleSortByDurationOrDate("duration")}
        >
          Длительность
          <div>
            <img
              src={store.order === "ASC" ? arrowDown : arrowUp}
              alt="Sort Arrow"
              className={styles.img}
            />
          </div>
        </div>
      </div>

      {Object.entries(groupedCalls).map(([date, calls]: [string, Rows[]]) => (
        <React.Fragment key={date}>
          {/* Не отображаем заголовок для сегодняшней даты */}
          {date !== new Date().toLocaleDateString() && (
            <div className={styles.table__header}>
              <div>{getDateLabel(date)}</div>
              <div className={styles.table__header_count}>{calls.length}</div>
            </div>
          )}
          {calls.map((call: Rows) => (
            <CallRow key={call.id} row={call} />
          ))}
        </React.Fragment>
      ))}

      {/* {rows.map((row) => (
        <CallRow key={row.id} row={row} />
      ))} */}
      {/* </tbody> */}
    </div>
  );
});

export default Table;
