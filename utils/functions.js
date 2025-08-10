import { Instance } from "@/instance/instance";

export async function get(path, config = {}) {
  const response = await Instance.get(path, config);
  return response.data;
}

