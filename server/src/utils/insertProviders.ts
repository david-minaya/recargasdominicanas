import { MIDAS_RED, TEST_PROVIDER, ZATACA } from '../constants/providers';
import { Provider } from '../entities/provider.entity';
import { User } from '../entities/user.entity';

export async function insertProviders() {

  await insert({
    id: TEST_PROVIDER,
    name: 'Proveedor de prueba',
    image: 'test-provider.png'
  });

  await insert({
    id: MIDAS_RED,
    name: 'MidasRed',
    image: 'midasred.jpeg',
    phone: '8094894100',
    email: 'soporte@midasred.do'
  });

  await insert({
    id: ZATACA,
    name: 'Zataca',
    image: 'zataca.jpg'
  });
}

async function insert(provider: Partial<Provider>) {
  if (!await Provider.findOne(provider.id)) {
    await Provider.save(Provider.create({
      ...provider,
      user: new User()
    }));
  }
}
