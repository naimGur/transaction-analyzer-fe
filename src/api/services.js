import { API_BASE_URL } from "./config";

export async function uploadCSV(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/files`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload CSV");
  }

  return response.json();
}

export async function analyzeMerchants() {
  const response = await fetch(`${API_BASE_URL}/analyze/merchants`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to analyze merchants");
  }

  return response.json();
}

export async function analyzePatterns() {
  const response = await fetch(`${API_BASE_URL}/analyze/patterns`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to analyze patterns");
  }

  return response.json();
}
