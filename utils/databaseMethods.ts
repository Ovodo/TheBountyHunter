import axios from "axios";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bandbindex.com"
    : "http://localhost:3000";

export const postAddress = async (address: string) => {
  try {
    const response = await axios.post(`${baseUrl}/api/user`, {
      address,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
