class HttpException extends Error {
  status: number;
  // _message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default HttpException;
