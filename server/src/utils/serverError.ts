export class ServerError extends Error {
  
  public code: number;
  public message: string;
  public error: any;

  constructor(code: number, message: string, error?: any) {
    super(message);
    this.code = code;
    this.message = message;
    this.error = error;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
