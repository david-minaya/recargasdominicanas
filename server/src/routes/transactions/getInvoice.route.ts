import { number, string } from '../../utils/validators';
import { permission, validate } from '../../middlewares';
import { get, route } from '../../utils/routeBuilder';
import { BUSINESS_USER_SEND_TRANSACTION } from '../../constants/permissions';
import { selectProvider } from '../../utils/selectProvider';
import { ProviderRepo } from '../../repositories/Provider.repo';
import { Contract } from '../../entities/contract.entity';

const validator = {
  productId: number,
  nic: string
}

permission(BUSINESS_USER_SEND_TRANSACTION)
validate(validator)
get('/invoice/:productId/:nic')
export const getInvoice = route(async req => {
  const providerProduct = await ProviderRepo.getProduct(parseInt(req.params.productId));
  const provider = await selectProvider(providerProduct.provider.id);
  const invoice = await provider.getInvoice(providerProduct.key, req.params.nic);
  await saveContract(invoice.nic, invoice.name);
  return invoice;
});

async function saveContract(nic: string, name: string) {
  const contract = await Contract.findOne({ nic });
  if (!contract) {
    await Contract.save(Contract.create({ nic, name }));
  }
}
