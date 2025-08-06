interface BaseResponse<T> {
  timestamp: string;
  code: string;
  message: string;
  result?: T;
}
