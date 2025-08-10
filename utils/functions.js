import { Instance } from "@/instance/instance";

// Minimal HTTP helpers only
export async function get(path, config = {}) {
  const response = await Instance.get(path, config);
  return response.data;
}

export async function post(path, body = {}, config = {}) {
  const response = await Instance.post(path, body, config);
  return response.data;
}

export async function put(path, body = {}, config = {}) {
  const response = await Instance.put(path, body, config);
  return response.data;
}

export async function del(path, config = {}) {
  const response = await Instance.delete(path, config);
  return response.data;
}

export async function update(path, body = {}, config = {}) {
  const response = await Instance.patch(path, body, config);
  return response.data;
}
