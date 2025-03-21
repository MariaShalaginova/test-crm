import { makeAutoObservable, toJS } from "mobx";
import axios from "axios";
import Rows from "../Types";
import { format, subDays, subWeeks, subMonths, subYears } from "date-fns";

const API_URL = "https://api.skilla.ru/mango";
const token = "testtoken";

class Store {
  rows: Rows[] = [];
  filter: string = "Все типы";
  isCallFilterOpen: boolean = false;
  isAudioPlayerOpen: boolean = false;
  audioUrl: string = "";
  currentRecordId: string | null = null;
  currentRowId: number | null = null;
  rating: string = "";
  sortDirection: string = "ASC";
  dateRange: string = "3 дня";
  startDate: Date | string | null = "";
  endDate: Date | string | null = "";
  isDateMenuOpen: boolean = false;
  isDatePickerOpen: boolean = false;
  sortBy: "date" | "duration" | undefined = undefined; // Параметр сортировки
  order: "ASC" | "DESC" | undefined = "ASC"; // Направление сортировки
  filteredRows: Rows[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSort(sortBy: "date" | "duration", order: "ASC" | "DESC") {
    this.sortBy = sortBy;
    this.order = order;
    this.fetchCallsByDateRange(); // Отправляем запрос с новыми параметрами сортировки
  }
  setLoading(loading: boolean) {
    this.loading = loading;
    console.log("Loading:", loading);
  }

  setError(error: boolean) {
    this.error = error;
  }

  // Метод для отправки запроса по временным интервалам
  async fetchCallsByDateRange() {
    let dateStart: string | null = null;
    let dateEnd: string | null = null;

    const now = new Date();

    switch (this.dateRange) {
      case "3 дня":
        dateStart = format(subDays(now, 3), "yyyy-MM-dd");
        dateEnd = format(now, "yyyy-MM-dd");
        break;
      case "Неделя":
        dateStart = format(subWeeks(now, 1), "yyyy-MM-dd");
        dateEnd = format(now, "yyyy-MM-dd");
        break;
      case "Месяц":
        dateStart = format(subMonths(now, 1), "yyyy-MM-dd");
        dateEnd = format(now, "yyyy-MM-dd");
        break;
      case "Год":
        dateStart = format(subYears(now, 1), "yyyy-MM-dd");
        dateEnd = format(now, "yyyy-MM-dd");
        break;
      case "Указать даты":
        // Проверяем, что даты не null и являются объектами Date
        if (this.startDate && this.endDate) {
          dateStart = format(this.startDate, "yyyy-MM-dd");
          dateEnd = format(this.endDate, "yyyy-MM-dd");
        } else {
          console.error(
            "Некорректные значения дат:",
            this.startDate,
            this.endDate,
            dateStart,
            dateEnd
          );
          return;
        }
        break;
      default:
        break;
    }

    if (dateStart && dateEnd) {
      console.log(dateStart, dateEnd);
      await this.getRows(dateStart, dateEnd, this.sortBy, this.order);
    }
  }

  //получение данных списка звонков с сервера
  async getRows(
    dateStart: string,
    dateEnd: string,
    sortBy?: "date" | "duration",
    order?: "ASC" | "DESC"
    // inOut?: number
  ) {
    try {
      this.setLoading(true);
      this.setError(false);
      console.log("Отправка запроса с параметрами:", {
        date_start: dateStart,
        date_end: dateEnd,
        sort_by: sortBy,
        order: order,
        // in_out: inOut,
      });
      const params: Record<string, string> = {
        date_start: dateStart,
        date_end: dateEnd,
      };

      // Добавляем параметры сортировки, если они переданы
      if (sortBy) {
        params.sort_by = sortBy;
      }
      if (order) {
        params.order = order;
      }

      const response = await axios.post(
        `${API_URL}/getList`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: params,
        }
      );
      this.rows = response.data.results;
    } catch (e) {
      console.log(e);
      this.setError(true);
    } finally {
      //   console.log(this.rows);
      console.log(toJS(this.rows));
      this.setLoading(false);
    }
  }

  //получение аудиозаписи
  async getAudioRecord(recordId: string, partnershipId: string) {
    try {
      this.setLoading(true);
      this.setError(false);
      const response = await axios.post<ArrayBuffer>(
        `${API_URL}/getRecord?record=${recordId}&partnership_id=${partnershipId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
      //   console.log(response.data);
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      this.audioUrl = URL.createObjectURL(blob); // Создаем временный URL для Blob
      this.currentRecordId = recordId;
      // console.log(this.audioUrl);
      // console.log(this.currentRecordId);
      // console.log(response.data);
    } catch (error) {
      this.setError(true);
      console.error("Ошибка при получении аудиозаписи:", error);
    } finally {
      this.setLoading(false);
    }
  }

  setCurrentRowId(id: number) {
    this.currentRowId = id;
  }
  // setCallTimeDuration(duration: string) {
  //   this.callTimeDuration = duration;
  // }
  setFilter(filter: string) {
    this.filter = filter;
  }

  setIsAudioPlayerOpen(isAudioPlayerOpen: boolean) {
    this.isAudioPlayerOpen = isAudioPlayerOpen;
  }

  setCallFilterIsOpen(isCallFilterOpen: boolean) {
    this.isCallFilterOpen = isCallFilterOpen;
  }

  setAudioUrl(audioUrl: string) {
    this.audioUrl = audioUrl;
  }

  setRating(rating: string) {
    this.rating = rating;
  }

  setSortDirection(sortDirection: string) {
    this.sortDirection = sortDirection;
  }

  setIsDateMenuOpen(isDateMenuOpnen: boolean) {
    this.isDateMenuOpen = isDateMenuOpnen;
  }

  setDateRange(range: string, startDate?: Date | null, endDate?: Date | null) {
    this.dateRange = range;
    if (startDate) {
      this.startDate = startDate.toISOString();
    }
    if (endDate) {
      this.endDate = endDate.toISOString();
    }
  }

  filterRowsByDateRange() {
    if (this.dateRange === "Указать даты" && this.startDate && this.endDate) {
      this.filteredRows = this.rows.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= this.startDate! && rowDate <= this.endDate!;
      });
    } else {
      // Логика для других диапазонов (3 дня, неделя, месяц, год)
      this.filteredRows = this.rows; // Показываем все данные
    }
  }

  setStartDate(date: Date | null) {
    this.startDate = date;
  }

  setEndDate(date: Date | null) {
    this.endDate = date;
  }

  setIsDatePickerOpen(isDatePickerOpen: boolean) {
    this.isDatePickerOpen = isDatePickerOpen;
  }

  //функция для фильтра по типу звонка
  get filteredCallRows() {
    if (this.filter === "Входящие") {
      return this.rows.filter((row) => row.in_out === 1);
    } else if (this.filter === "Исходящие") {
      return this.rows.filter((row) => row.in_out === 0);
    } else {
      return this.rows;
    }
  }
}

export default new Store();
