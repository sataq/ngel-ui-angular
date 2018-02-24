"use strict";
const jsonServer = require('json-server');
const bodyParser = require("body-parser");
const _ = require('lodash');
const faker = require("faker");

module.exports = function startMockServer() {
    console.log("Starting JSON Server");

    const server = jsonServer.create();
    server.use(jsonServer.defaults());
    server.use(jsonServer.rewriter(require("./routes.json")));
    server.use(bodyParser.json());

    let db = require("./db.js");
    const router = jsonServer.router(db());
    const dbstore = _.cloneDeep(router.db.object);

    let selectedSchools;

    server.post("/resetmockdbhard", (req, res) => {
        res.status(200);
        res.end();
    });

    server.post("/resetmockdb", (req, res) => {
        res.status(200);
        res.end();
    });

    server.use(router);
    server.listen(3000);
};
