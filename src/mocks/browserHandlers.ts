// https://mswjs.io/
import { HttpResponse, http, ResponseResolver, PathParams, RequestHandler } from "msw";
import { BASE_URL, CITIES, PROVINCES } from "./consts";
import { JsonBodyType } from "msw/lib/core/handlers/RequestHandler";

type CitiesNumbers = "1" | "2" | "3" | "4" | "5" | "6"

export const handlers = [
  http.get<PathParams, ResponseResolver>(`${BASE_URL}/provinces`, ({ request }) => {
    return HttpResponse.json({ results: PROVINCES }, { status: 200 });
  }),

  http.get<PathParams, RequestHandler>(`${BASE_URL}/cities/:id`, async ({ request }) => {
    const urlArray = request.url.split("/");
    const id = (urlArray.at(-1)) as CitiesNumbers;
    const cities = CITIES[id];
    const response =
      Number(id) < 7
        ? HttpResponse.json({ results: cities }, { status: 200 })
        : HttpResponse.json({ detail: "پیدا نشد." }, { status: 404 });
    return response;
  }),

  http.post<PathParams, RequestHandler>(`${BASE_URL}/submit`, async ({ request, params }) => {

    const body: JsonBodyType = await request.json()
    const throwError = (detail: string, field: string, error: string) => HttpResponse.json({
      status: "failed",
      code: "validation_error",
      detail,
      extra: [
        {
          field,
          error
        }
      ]
    }, {
      status: 400
    })
    if (!!!body.first_name) {
      return throwError('info', 'first_name', 'first_name is mandatory')
    }
    if (!!!body.last_name) {
      return throwError('info', 'last_name', 'last_name is mandatory')
    }
    if (body.type === 'personal' && !!!body.national_code) {
      return throwError('info', 'national_code', 'national_code is mandatory')
    }
    if (body.type === 'personal' && !!!body.phone) {
      return throwError('info', 'phone', 'phone is mandatory')
    }
    if (body.type === 'legal' && !!!body.registration_number) {
      return throwError('info', 'registration_number', 'registration_number is mandatory')
    }
    if (body.type === 'legal' && !!!body.tel) {
      return throwError('info', 'tel', 'tel is mandatory')
    }
    if (!!!body.city) {
      return throwError('address', 'city', 'city is mandatory')
    }
    if (!!!body.province) {
      return throwError('address', 'province', 'province is mandatory')
    }
    if (!!!body.bank_name) {
      return throwError('bank', 'bank_name', 'bank_name is mandatory')
    }
    if (!!!body.iban) {
      return throwError('bank', 'iban', 'iban is mandatory')
    }

    return HttpResponse.json(
      { detail: "اطلاعات شما با موفقیت ثبت شد." },
      { status: 200 }
    );
  }),
];
