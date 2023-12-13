
export type TProvince = { name: string; id: number | string };
export type TCity = { name: string; id: number | string };
export interface IUserInfo {
  first_name: string;
  last_name: string;
  type: string;
  city: string;
  province: string;
  bank_name: string;
  iban: string;
  national_code: string;
  phone: string;
  registration_number: string;
  tel: string;
}



interface IError {
  status: string;
  code: "validation_error";
  detail: "info" | "bank" | "address" | "";
  extra: {
    field: string;
    error: string;
  }[]
}
