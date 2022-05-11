import { apiInstance } from ".";

const api = apiInstance();

export const CeoBnbCreate = async (params: any, success: any, fail: any) => {
  await api
    .post(`/accommodation/`, params, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(success)
    .catch(fail);
};


export const getMyBnbList = async (params: any, success: any, fail: any) => {
  await api.get(`/accommodation/my`).then(success).catch(fail);
}

export const getMyReservationList = async (params: any, success: any, fail: any) => {
  await api.get(`/accommodation/reservation/my`).then(success).catch(fail);
}

export const getMyBnbDetail = async (accommodation_id: any, success: any, fail: any) => {
  await api.get(`/accommodation/detail/${accommodation_id}`).then(success).catch(fail);
}