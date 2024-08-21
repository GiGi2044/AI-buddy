import axios from "axios";

async function getAIPoweredBotResponse(question: string): Promise<string> {
  const apiUrl = "http://localhost:3000/ask";
  try {
    const response = await axios.post(apiUrl, { question });
    // Adjusted to handle the response structure you logged
    if (response.data && response.data.answer) {  // Use 'answer' if that's what your server uses
      return response.data.answer;
    } else {
      console.log('Received unexpected data format:', response.data);
      throw new Error('Received unexpected data format');
    }
  } catch (error) {
    console.error("Error fetching response from AI service:", error);
    throw new Error(`Failed to fetch AI response: ${error || 'Unknown error'}`);
  }
}

export { getAIPoweredBotResponse };
