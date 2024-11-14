export interface ErrorInterface {
  _id?: string;
  responseBody: string;
  error: string;
  url: string;
  body: object;
  params: object;
  headers: object;
  type: string;
  requestUser: object;
}
