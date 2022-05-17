import { apiInstance } from ".";

const api = apiInstance();

export const getMyAllDiary = async (params: any, success: any, fail: any) => {
  await api.get(`/diary/my-diary`).then(success).catch(fail);
};

export const writeDiary = async (params: any, success: any, fail: any) => {
  await api.post(`/diary`, params).then(success).catch(fail);
};

export const updateDiary = async (diaryId: number, params: any, success: any, fail: any) => {
  await api.patch(`/diary/${diaryId}`, params).then(success).catch(fail);
};