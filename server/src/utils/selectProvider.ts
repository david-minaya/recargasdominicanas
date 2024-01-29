import { PROVIDER_DOESNT_FOUND } from '../constants/error-types';
import { TEST_PROVIDER, MIDAS_RED, ZATACA } from '../constants/providers';
import { Midasred } from '../providers/midasred';
import { Provider } from '../providers/provider';
import { TestProvider } from '../providers/testProvider';
import { Zataca } from '../providers/zataca';
import { ServerError } from './serverError';

export async function selectProvider(providerId: number): Promise<Provider> {
  switch (providerId) {
    case TEST_PROVIDER: 
      return await TestProvider.createInstance();
    case MIDAS_RED:
      return await Midasred.createInstance();
    case ZATACA:
      return await Zataca.createInstance();
    default:
      throw new ServerError(500, PROVIDER_DOESNT_FOUND);
  }
}
