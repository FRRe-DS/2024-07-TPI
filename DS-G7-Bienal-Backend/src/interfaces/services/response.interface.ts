export type TypeData = '' | 'WARN' | 'ERROR' | 'SUCCESS' | 'INFO';
export interface ResponseInterface<T> {
  code?: number;
  message?: string;
  payload?: T;
  monitoringCode?: string;
  errors?: string[];
  data?: DataInterface[];
}

export interface DataInterface {
  message?: string;
  type?: TypeData;
  monitoringCode?: string;
}

