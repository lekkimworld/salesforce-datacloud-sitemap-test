import express, { NextFunction, Request, Response } from "express";
import { join } from "path";
import { config as dotenv_config } from "dotenv";
import { engine } from "express-handlebars";
import { buildHandlebarContext } from "./utils";
dotenv_config();

// create app and configure handlebars
const app = express();
app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
    })
);
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "..", "views"));

/**
 * Sitemap as static files do not serve correct mimetype
 */
app.get("/public/sitemap.js", (_req, res) => {
    res.type("javascript");
    res.sendFile(join(__dirname, "..", "public", "sitemap.js"));
});

/**
 * Render page requested
 */
app.get("/:path([a-z0-9]+.html)?", (req, res) => {
    // extract name
    const path = req.params.path || "index.html";
    const name = path.substring(0, path.indexOf("."));

    // render page with name
    res.render(
        name,
        buildHandlebarContext({
            title: name,
        }),
        (err, html) => {
            if (err) {
                // unable to render page - probably not found
                res.status(404).render(
                    "404",
                    buildHandlebarContext({
                        title: "Ouch! That page was not found...",
                        name,
                        page: `views/${name}.handlebars`,
                    })
                );
            } else {
                res.status(200).type("html").send(html);
            }
        }
    );
});

// listen for requests
app.listen(process.env.PORT || 8080);
