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
	app.get("/app/roll/", (req, res) => {
		res.send(roll(6, 2, 1));
	})

	// 5. Endpoint to accept JSON/URLEncoded data body for sides/dice/rolls
	app.post("/app/roll/", (req, res) => {
		const sides = parseInt(req.body.sides);
		const dice = parseInt(req.body.dice);
		const rolls = parseInt(req.body.rolls);
		res.send(roll(sides, dice, rolls));
	})

	// 6. Endpoint to accept /app/roll/:sides/
	app.get("/app/roll/:sides/", (req, res) => {
		const sides = parseInt(req.params.sides);
		res.send(roll(sides, 2, 1));
	})

	// 7. Endpoint to accept /app/roll/:sides/:dice/
	app.get("/app/roll/:sides/:dice/", (req, res) => {
		const sides = parseInt(req.params.sides);
		const dice = parseInt(req.params.dice);
		res.send(roll(sides, dice, 1));
	})

	// 8. Endpoint to accept /app/roll/:sides/:dice/:rolls/
	app.get("/app/roll/:sides/:dice/:rolls", (req, res) => {
		const sides = parseInt(req.params.sides);
		const dice = parseInt(req.params.dice);
		const rolls = parseInt(req.params.rolls);
		res.send(roll(sides, dice, rolls));
	})	

	// 2. Assign default endpoint
	app.get("*", (req, res) => {
		res.status(404).send("404 NOT FOUND");
	})

	app.listen(port);
}

main();
