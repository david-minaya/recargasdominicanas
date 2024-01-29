import { IProvider } from './provider.type';

export interface IProviderConfig {
  id: number;
  name: string;
  value: string;
  provider: IProvider;
}
