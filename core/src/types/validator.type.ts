export interface IValidator {
  deps?: any;
  message: string;
  validate: (value: string) => boolean;
}
