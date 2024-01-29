## Error when running a production build of the application

When you run a production build of the app and you get the following errors:

- *You are currently using minified code outside of NODE_ENV === "production"*

- *Minified React error #321; visit https://reactjs.org/docs/error-decoder.html?invariant=321 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.*

This is because you are building the app with the `@recargas-dominicanas/core` library linked locally (npm link ../core/lib). To avoid this error, install the published version of the library running `npm install @recargas-dominicanas/core`.

## Download the app update doesn't work

When the user try to download a new version of the applicacion, the download update dialog is show but the download doesn't start. Also if we debug the application we see that the `CookieManager.getInstance().getCookie('<url>')` return null. This happend because the device has a old version of chorme installed, to solve this error update Chrome to the lastest version.
