import * as hubspot from '@hubspot/api-client';

export class Hubspot {

  private client: hubspot.Client;

  constructor() {
    this.client = new hubspot.Client({
      apiKey: process.env.HUBSPOT_API_KEY
    });
  }

  public async registerCustomer(customer: any) {

    const [contact, deal] = await Promise.all([
      this.createContact(customer),
      this.createDeal(customer)
    ]);
  
    await this.associateDealAndContact(deal.body.id, contact.body.id);
  }
  
  private async createContact(customer: any) {
    return this.client.crm.contacts.basicApi.create({
      properties: {
        firstname: customer.name,
        businessname: customer.businessName,
        idnumber: customer.id,
        phone: customer.phone,
        email: customer.email,
        city: customer.city,
        address: customer.address,
        system: customer.system,
        hubspot_owner_id: '71402035',
        lifecyclestage: 'lead'
      }
    });
  }
  
  private async createDeal(customer: any) {
    return this.client.crm.deals.basicApi.create({
      properties: {
        dealname: `${customer.name} (${customer.businessName})`,
        pipeline: 'default',
        dealstage: '13140122',
        dealtype: 'newbusiness',
        hubspot_owner_id: '71402035',
        amount: '5000'
      }
    });
  }
  
  private async associateDealAndContact(dealId: string, contactId: string) {
    return this.client.crm.deals.associationsApi.create(
      dealId,
      'contact',
      contactId,
      'deal_to_contact'
    );
  }
}
