import { APIResponse } from "./types";

const API_URL: string = "https://api.trace.moe/search?url=";

export async function fetchDataScene(imageUrl: string): Promise<APIResponse> {
  try {
    const response = await fetch(`${API_URL}${encodeURIComponent(imageUrl)}`);

    if (!response.ok) {
      console.log(Error(`HTTP error! status: ${response.status}`));
    }
    return await response.json();
  } catch (error) {
    console.log("error find scene : ", error);
    throw error;
  }
}
