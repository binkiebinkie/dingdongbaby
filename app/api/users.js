import { api } from ".";

export const readMe = (params) => api.get(`users/me`, { params });
export const createUser = (data) => api.post(`users/`, data);
export const updateUser = (data) => api.patch(`user`, data);
export const deleteUser = (id) => api.delete(`users/${id}`);

export const updateUserCompletedPrompts = (id, promptId) =>
  api.patch(`users/${id}/completed-prompts/${promptId}`);
export const updateUserUnlockedPrompts = (id, promptId) =>
  api.patch(`users/${id}/unlocked-prompts/${promptId}`);

export const updateUserOnboarding = (data) =>
  api.patch(`users/onboarding/`, { data });
