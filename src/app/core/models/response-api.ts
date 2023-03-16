import { ResultRespond } from '../enums/result-respond';

export class ResponseApi<T> {
  code: string;
  result: ResultRespond;
  message: string;
  data: T;
  error: any;
  pagingResponse?: any;

  constructor(
    result: number = -1,
    message: string = '',
    data: any = null,
    code: string = ''
  ) {
    this.result = result;
    this.message = message;
    this.data = data;
    this.code = code;
  }
}
