export declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            // port for express to listen on (defaults to 8080)
            PORT: number;

            // url to Salesforce Data Cloud websdk
            WEBSDK_URL: string;

            // set to true'ish value (1, t, true) to load sitemap from /public/sitemap.js instead of 
            // with the websdk url
            LOCAL_SITEMAP: string;
        }
    }
}
