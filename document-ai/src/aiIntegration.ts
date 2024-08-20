import axios from "axios";



//async function getAIPoweredBotResponse(prompt: string): Promise<string>{
//    const apiUrl= "http://localhost:3000";
//
//    try{
//        const response = await axios.post(apiUrl, { prompt });
//        return response.data.bot.trim();
//    }
//    catch (error: unknown) {
//      if (axios.isAxiosError(error)) {
//          // Now TypeScript knows this is an Axios error
//          console.error("Error Fetching response:", error.message);
//          if (error.response) {
//              console.error(error.response.data);
//              console.error(error.response.status);
//              console.error(error.response.headers);
//          } else if (error.request) {
//              console.error(error.request);
//          } else {
//              console.error('Error', error.message);
//          }
//      } else {
//          // Handle the case where it's not an AxiosError
//          console.error('An unexpected error occurred:', error);
//      }
//      return 'Something Went wrong';
//    }
//}

async function getAIPoweredBotResponse(prompt: string): Promise<string> {
  const apiUrl = "http://localhost:3000";
  try {
      const response = await axios.post(apiUrl, { prompt });
      if (response.data && response.data.bot) {
          return response.data.bot;
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
