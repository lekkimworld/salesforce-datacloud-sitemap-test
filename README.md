# Salesforce Data Cloud Sitemap
Example webapp used to demonstrate the use of sitemaps with the Web SDK in Salesforce Data Cloud. Reference documentation for the sitemap structure and syntax may be found in the [documentation](https://developer.salesforce.com/docs/atlas.en-us.c360a_api.meta/c360a_api/c360a_api_sitemap.htm).

An example sitemap for the app can be found in `public/sitemap.js`. It may be run by the application by either uploading it in the Sitemap section of the Data Cloud WebSDK configuration or by setting the environment variable `LOCAL_SITEMAP` to true. 

The app is very simple and loads pages based on path supplied in the URL. The path supplies (e.g. `index.html`) is translated into a corresponding [Handlebars](https://handlebarsjs.com/) template from the `views` folder by stripping what's after the first period (`.`). 

Examples: 
* `/index.html` becomes `views/index.handlebars`
* `/foo.html` becomes `views/foo.handlebars`

If the template cannot be found we render `views/404.handlebars`.

When uploading a Sitemap to Data Cloud it is simply added at the bottom of the loaded Web SDK provided from Setup. It's simply inserted into a `try-catch`` block like shown below:
``` javascript
// SITEMAP AND INIT
try {
    (function() {
        // <<<<< UPLOADED SITEMAP GOES HERE >>>>>
    }
    )()
} catch (e) {
    console.error("[CDP WEB SDK]", e);
}
```
There is (currently) no validation when uploading the Sitemap into Data Cloud so you could potentially use this to run any piece of Javascript in the browser loading the Web SDK URL.

## Configuration
For applicable environment variables to configure the node.js app see `src/environment.d.ts`. Add environment variables 
to a `.env` file in the application folder.

## Running
```
npm install
npm run start
```
