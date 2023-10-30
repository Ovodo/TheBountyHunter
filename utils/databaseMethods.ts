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
export const getDetails = async (address: string) => {
  try {
    const response = await axios.get(`${baseUrl}/api/data`, {
      params: {
        address: address,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const levelUp = async (address: string) => {
  try {
    const response = await axios.get(`${baseUrl}/api/levelUp`, {
      params: {
        address: address,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const claimRewards = async (address: string, Rewards: string) => {
  try {
    const response = await axios.get(`${baseUrl}/api/claim`, {
      params: {
        address: address,
        Rewards: Rewards,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const mintToken = async (address: string, NFT: string) => {
  try {
    const response = await axios.get(`${baseUrl}/api/mint`, {
      params: {
        address: address,
        NFT: NFT,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
