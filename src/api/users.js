import { api } from ".";

export const readMe = (params) => api.get(`users/me`, { params });
export const createUser = (data) => api.post(`users/`, data);
export const updateUser = (data) => api.patch(`user`, data);
export const deleteUser = (id) => api.delete(`users/${id}`);

export const updateUserCompletedPrompt = (promptId, data) =>
  api.patch(`users/completed-prompt/${promptId}`, data);
export const updateUserCompletedPromptAsset = (promptId, data) =>
  api.patch(`users/completed-prompts-asset/${promptId}`, data);
export const updateUserUnlockedPrompts = (id, promptId) =>
  api.patch(`users/${id}/unlocked-prompts/${promptId}`);

export const updateUserCredentials = (data) =>
  api.patch(`users/update-credentials`, data);

export const updateUserOnboarding = (data) =>
  api.patch(`users/onboarding/`, { data });
