require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");
const path = require("path");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const _input = fs.readFileSync(path.resolve("./input.txt"), "utf8");
console.log(_input);

const _output = path.resolve("./output.mp3");
console.log(_output);

async function TTS() {
	try {
		console.log("Speech synthesis initializing.");
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: "onyx",
			input: _input,
		});

		if (fs.existsSync(_output)) {
			fs.unlinkSync(_output);
		}

		const buffer = Buffer.from(await mp3.arrayBuffer());
		await fs.promises.writeFile(_output, buffer);
		console.log("Speech synthesis complete.");
	} catch (error) {
		console.log("Speech synthesis failed.");
		console.error(error);
	}
}
TTS();
