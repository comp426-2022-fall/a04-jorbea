#!/usr/bin/env node

export default function roll(sides, dice, rolls) {
	
	let results = [];
	let sum = 0;
	let min = 1;
	const max = sides;
	
	if (dice > 1) {
		min = min * dice;
	}

	for (let i = 0; i < rolls; i++) {
		for (let j = 0; j < dice; j++) {
			sum = sum +
				Math.floor(Math.random() * (max - min + 1)) + min;
		}
		results.push(sum);
		sum = 0;
	}

	return {
		"sides": sides,
		"dice": dice,
		"rolls": rolls,
		"results": results
	};
}
