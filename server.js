#!/usr/bin/env node

import roll from "./lib/roll.js";
import minimist from "minimist";
import express from "express";

const args = minimist(process.argv.slice(2));
const app = express();

function main() {

	// 1. Assign port
	let port = args.port || 5000;
	if (typeof(args.port) == "boolean") {
		port = 5000;
	}

	// Setup usage of express
	app.use(express.urlencoded({extended: true}));
	
	// 3. Check endpoint; return 200 OK
	app.get("/app", (req, res) => {
		res.status(200).send("200 OK");
	})

	// 4. Endpoint for two six-sided dice

	// 2. Assign default endpoint
	app.get("*", (req, res) => {
		res.status(404).send("404 NOT FOUND");
	})

	//app.listen(port);
}

main();