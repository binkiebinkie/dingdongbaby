import { api } from ".";

export const auth = (data) => api.post(`auth`, data);
