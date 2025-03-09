import axios from "axios";

export const readStatistics = async () => {
  const options = {
    method: "GET",
    url: `/api/statistics`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return {
      error: error.message || "An error occurred while fetching statistics",
    };
  }
};
