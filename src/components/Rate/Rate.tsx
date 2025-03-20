import { RateProps } from "../../Types";
import { getRandomRating } from "../../utils";
import styles from "./Rate.module.scss";
// import store from "../../store/store";
import { useEffect } from "react";
const Rate: React.FC<RateProps> = ({ initialRating, setRating }) => {
  useEffect(() => {
    if (!initialRating) {
      const rating = getRandomRating(); // Генерируем случайную оценку
      setRating(rating); // Сохраняем оценку в состоянии CallRow
    }
  }, [initialRating, setRating]);

  // const rating = store.rating;
  // const rating = getRandomRating();
  let ratingClass = "";
  if (initialRating === "Плохо") {
    ratingClass = styles["rate__bad"];
  } else if (initialRating === "Хорошо") {
    ratingClass = styles["rate__good"];
  } else if (initialRating === "Отлично") {
    ratingClass = styles["rate__excellent"];
  }

  return <div className={`${styles.rate} ${ratingClass}`}>{initialRating}</div>;
};

export default Rate;
