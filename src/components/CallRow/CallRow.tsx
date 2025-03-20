import React, { useState } from "react";
import styles from "./CallRow.module.scss";
import incoming from "../../assets/incoming.svg";
// import avatar from "../../assets/avatar.svg";
import Rate from "../Rate/Rate";
import Rows from "../../Types";
import outgoing from "../../assets/outgoing.svg";
import { formatCallDuration, formatCallTime } from "../../utils";
import store from "../../store/store";
import noanswer from "../../assets/no_answer.svg";
import missed from "../../assets/missed.svg";
import CustomAudioPlayer from "../Audioplayer/Audioplayer";
// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const CallRow: React.FC<{ row: Rows }> = observer(({ row }) => {
  const [rating, setRating] = useState<string | null>(null);
  // console.log(toJS(row));
  const getAudioRecord = (e: React.MouseEvent) => {
    e.stopPropagation(); // Остановить всплытие события
    if (row.record) {
      store.setCurrentRowId(row.id);
      store.setIsAudioPlayerOpen(true);
      store.getAudioRecord(row.record, row.partnership_id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__row}>
        <div className={styles.container__row_type}>
          {row.in_out === 1 && row.status === "Не дозвонился" && (
            <img src={noanswer} alt="noanswer" />
          )}
          {row.in_out === 1 && row.status === "Дозвонился" && (
            <img src={incoming} alt="incoming" />
          )}
          {row.in_out === 1 && row.status === "Пропущенный" && (
            <img src={missed} alt="missed" />
          )}
          {row.in_out === 0 && <img src={outgoing} alt="outgoing" />}
        </div>

        <div className={styles.container__row_time}>
          {formatCallTime(row.date)}
        </div>
        <div className={styles.container__row_avatar}>
          <img src={row.person_avatar} alt="avatar" />
        </div>

        <div
          style={{ width: "22.6%" }}
          className={styles.container__row_number}
        >
          {/* {row.partner_data.name ? row.partner_data.name : row.from_number} */}
          {row.in_out === 0 ? row.to_number : row.from_number}
        </div>
        <div
          style={{ width: "14.8%" }}
          className={styles.container__row_source}
        >
          {row.source}
        </div>
        <div style={{ width: "32%" }} className={styles.container__row_rating}>
          <Rate initialRating={rating} setRating={setRating} />
        </div>
        {row.time != 0 && (
          <div
            className={styles.container__row_duration}
            onClick={getAudioRecord}
          >
            {/* {store.callTimeDuration} */}
            {formatCallDuration(row.time)}
          </div>
        )}

        {store.isAudioPlayerOpen && (
          // store.currentRecordId === row.record &&
          <CustomAudioPlayer
            id={row.id}
            recordId={row.record}
            partnershipId={row.partnership_id}
            time={row.time}
          />
        )}
      </div>
    </div>
  );
});

export default CallRow;
