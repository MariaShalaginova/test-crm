interface PartnerData {
  id: string;
  name: string;
  phone: string;
}

interface AbuseAnswer {
  message: string;
  from_support: number;
  support_read_status: number;
  person_read_status: number;
}

interface Abuse {
  date: string;
  person_name: string;
  message: string;
  support_read_status: number;
  support_answer_status: number;
  answers: AbuseAnswer[];
}

export default interface Rows {
  id: number;
  partnership_id: string;
  partner_data: PartnerData;
  date: string;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: string;
  record: string;
  line_number: string;
  line_name: string;
  in_out: number;
  from_site: number;
  source: string;
  disconnect_reason: string;
  abuse: Abuse;
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;
}

export interface RateProps {
  className?: string;
  initialRating: string | null;
  setRating: (rating: string) => void;
}

export interface AudioProps {
  recordId: string;
  partnershipId: string;
  id: number;
  time: number;
}

export interface DateRangeMenuProps {
  onSelect?: (range: string) => void;
  formattedDate?: string;
}

export interface DatePickerProps {
  onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
}
