# Environment Variables

### Server

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| NODE_ENV | Variable used to run the server on `development` or `production` mode. | String | Optional | `development` |
| HOST | Host of the server. | String | Required | `localhost` |
| POST | Port of the server. | Number | Required | `2000` |
| DEBUG | Enable the debug mode | Boolean | Optional | `true` |

### Database

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| DB_HOST | Name of the database. | String | Optional | `local_db` |
| DB_POST | Port of the database. | Number | Optional | `3307` |
| DB_NAME | Name of the database. | String | Required | `db_name` |
| DB_USER | User of the database. | String | Required | `db_app_name` |
| DB_PASS | Password of the database. | String | Required | `db_pass` |
| DB_SOCKET_PATH | Socket path of the database. This variable if used to connect to the database without use the DB_HOST and DB_PORT. | String | Optional | `/cloudsql/project:region:instance` |

### Cors

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| ALLOWED_DOMAINS | Domains that are allow to send request to this server. | List of URLs separated by comma. | Required | `http://localhost:2000, http://localhost:3000` |
| CROSS_ORIGIN_RESOURCE_POLICY | Allow request resourses from a different origin. This variable must to use one of the following values: `same-site`, `same-origin`, `cross-origin`. | String | Optional | `same-site` |

### Session

This variables are used to configure the session and the cookies.

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| SESSION_NAME | Name of the session. | String | Optional | `red` |
| SESSION_SECRET | Secret of the session. | List of words, numbers and symbols separated by comma. | Required | `kasdjf422, secret, &*hjks8` |
| COOKIE_MAX_AGE | The expiration date of the cookie in milliseconds. | Number | Required | `315576000000` 10 years |
| COOKIE_SECURE | Set the cookie as secure. | Boolean | Optional | `true` |
| COOKIE_SAME_SITE | Specifies the value that going to be used in the `SameSite Set-Cookie` attribute. The value of this variable must be one of the followings: `none`, `lax` or `strict`. | String | Optional | `none` |
| COOKIE_DOMAIN | Specifies the value for the Domain Set-Cookie attribute. | String | Optional | `.localhost` |

### Owner user

The owner user is the main user of the system and is the user with the most elevated privileges in the system.

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| OWNER_NAME | Name of the owner user. | String | Required | `Pedro` |
| OWNER_EMAIL | Email of the owner user. | String | Required | `pedro@example.do` |
| OWNER_PASSWORD | Password of the owner user. | String | Required | `password` |

### Google Cloud

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| GCS_BUCKET | Name of the bucket where the files going to be stored on Google Cloud Storage. | String | Required | `local-storage` |
| GOOGLE_APPLICATION_CREDENTIALS | Path of the JSON file that contain the Google Service Account key. This file is use for example to Access to Google Cloud Storage. This variable is just necesary when the server is run out of Google Cloud. | String | Optional | `service-account.json` |

### Sendgrid

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| SENDGRID_API_KEY | Api key of sendgrid used to send emails. | String | Required | |
| EMAIL_RECIPIENTS | Email of the person who will receive the emails sent by Sendgrid. | string | Optional | `support@email.com` |

### Hubspot

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| HUBSPOT_API_KEY | Api key of Hubsport. | Json | Required | `'{}'` |

### Google contacts

Variables used to access to Google Contant and create new contacts when a new user is created. This variables are **Deprecated**.

| Name | description | Type | Required | Example |
|:-----|:------------|:-----|:---------|:--------|
| GOOGLE_CLIENT_ID | Google client id. | String | Optional | |
| GOOGLE_CLIENT_SECRET | Google client secret. | String | Optional | |
| GOOGLE_REDIRECT_URI | Google redirect uri. | String | Optional | |
| GOOGLE_ACCESS_TOKEN | Google access token. | Json | Optional | `'{}'` |
