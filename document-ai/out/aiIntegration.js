"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIPoweredBotResponse = getAIPoweredBotResponse;
const axios_1 = require("axios");
async function getAIPoweredBotResponse(question) {
    const apiUrl = "https://ai-buddy-uh26.onrender.com/ask";
    try {
        const response = await axios_1.default.post(apiUrl, { question });
        // Adjusted to handle the response structure you logged
        if (response.data && response.data.answer) { // Use 'answer' if that's what your server uses
            return response.data.answer;
        }
        else {
            console.log('Received unexpected data format:', response.data);
            throw new Error('Received unexpected data format');
        }
    }
    catch (error) {
        console.error("Error fetching response from AI service:", error);
        throw new Error(`Failed to fetch AI response: ${error || 'Unknown error'}`);
    }
}
//# sourceMappingURL=aiIntegration.js.map