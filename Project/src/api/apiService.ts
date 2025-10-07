import axios from "axios";

const BASE_URL = "http://localhost:8000"; // change to your backend IP or localhost

export const apiService = {
  async getNewsCSVPreview(source: string) {
    const endpoints: Record<string, string> = {
      CCTV: "/cctv-news",
      FINNHUB: "/finnhub-news",
      AAPL: "/aapl-news",
      CNBC: "/cnbc-news",
      YAHOO: "/yahoo-news"
    };

    const url = `${BASE_URL}${endpoints[source]}`;
    const response = await axios.get(url);
    return response.data;
  },

  async downloadCSV(fileName: string) {
    const url = `${BASE_URL}/download/${fileName}`;
    const response = await axios.get(url, { responseType: "blob" });
    return response;
  }
};
