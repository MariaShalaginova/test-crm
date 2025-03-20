import store from "./store/store";
import Rows from "./Types";
const ratings = ["Плохо", "Хорошо", "Отлично"];

//функция получения рандомной оценки звонка
export const getRandomRating = () => {
  const randomIndex = Math.floor(Math.random() * ratings.length);
  return ratings[randomIndex];
};

//функция для изменения формата времени
export const formatCallTime = (dateString: string) => {
  if (!dateString.includes(" ")) return "00.00";
  const timePart = dateString.split(" ")[1];
  const [hours, minutes] = timePart.split(":");
  return `${hours.padStart(2, "0")}.${minutes.padStart(2, "0")}`;
};

//функция для сортировки по длительности звонка
export const handleSortByDurationOrDate = (sortBy: "date" | "duration") => {
  const newDirection = store.sortDirection === "ASC" ? "DESC" : "ASC"; // Меняем направление сортировки
  store.setSortDirection(newDirection);
  // store.sortCalls("duration", newDirection);
  store.setSort(sortBy, newDirection); // Вызываем метод сортировки в store
};

//функция группировки звонков по дате
export const groupCallsByDate = (calls: Rows[]): { [key: string]: Rows[] } => {
  return calls.reduce((acc: { [key: string]: Rows[] }, call: Rows) => {
    const callDate = new Date(call.date).toLocaleDateString(); // Получаем дату в формате "дд.мм.гггг"
    if (!acc[callDate]) {
      acc[callDate] = [];
    }
    acc[callDate].push(call);
    return acc;
  }, {});
};

export const getDateLabel = (date: string) => {
  const today = new Date().toLocaleDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = yesterday.toLocaleDateString();

  if (date === today) {
    return "Сегодня";
  } else if (date === yesterdayFormatted) {
    return "Вчера";
  } else {
    return date;
  }
};

export const formatCallDuration = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
