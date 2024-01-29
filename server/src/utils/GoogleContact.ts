import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_ACCESS_TOKEN
} = process.env;

export class GoogleContact {

  private auth: OAuth2Client;

  constructor() {

    this.auth = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );

    this.auth.setCredentials(JSON.parse(GOOGLE_ACCESS_TOKEN!));
  }

  async createContact(customer: any) {
  
    const people = google.people({ version: 'v1', auth: this.auth });
    
    await people.people.createContact({
      requestBody: {
        names: [{ givenName: `${customer.name} (${customer.businessName})` }],
        phoneNumbers: [{ value: customer.phone }],
        emailAddresses: [{ value: customer.email }]
      },
    });
  }
}