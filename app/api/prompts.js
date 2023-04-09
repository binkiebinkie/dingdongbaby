import { api } from ".";

export const readUnlockedPrompts = async (params) =>
  api.get(`prompts/unlocked`, { params });

export const readUnlockedPrompt = async (id, params) =>
  api.get(`prompts/unlocked/${id}`, { params });

export const readLockedPrompts = async (params) =>
  api.get(`prompts/locked`, { params });

// should include difficulty in data object
export const assignRandomPromptToUser = async (data) =>
  api.post(`prompts/assign-random-prompt`, data);

// export const readLockedPrompts = async (params) =>
// api.get(`prompts/unlocked`, { params });
// export const readMe = (params) => api.get(`users/me`, { params });
// export const createUser = (data) => api.post(`users/`, data);
// export const updateUser = (data) => api.patch(`user`, data);
// export const deleteUser = (id) => api.delete(`users/${id}`);

// export const updateUserCompletedPrompts = (id, promptId) =>
//   api.patch(`users/${id}/completed-prompts/${promptId}`);
// export const updateUserUnlockedPrompts = (id, promptId) =>
//   api.patch(`users/${id}/unlocked-prompts/${promptId}`);

// export const updateUserOnboarding = (onboarding) =>
//   api.patch(`users/onboarding`, { onboarding });

// todo: add random prompt by id to user objcet,
