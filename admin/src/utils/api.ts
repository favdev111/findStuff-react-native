import { http, http2, http_org, getAuthorization } from "./http";
import { ORIGINAL_ROOT } from "./config";

export const login = (params = {}) =>
  http_org.post("auth/login", { ...params });
export const register = (params = {}) =>
  http_org.post("auth/register", { ...params });
export const resetpass = (params = {}) =>
  http_org.post("auth/resetpass", { ...params });

export const getOtp = (params = {}) => http_org.post("auth/otp", { ...params });

export const getArts = (params = {}) => http.get("article/get", { params });
export const addArticle = (params = {}) =>
  http.put("article/add", { ...params });

export const editeArt = (id: string, params = {}) =>
  http.post(`article/edite/${id}`, { ...params });
export const delArt = (id: string) => http.delete(`article/delect/${id}`);
export const getArtId = (id: string, params = {}) =>
  http.get(`article/get/${id}`, { params });

export const fetchHero = (params = {}) => http.get("hero/get", { params });
export const delHero = (id: string) => http.delete(`hero/delect/${id}`);
export const editeHero = (id: string, params = {}) =>
  http.post(`hero/edite/${id}`, { ...params });

export const fetchComment = (params = {}) =>
  http.get("comment/get", { params });
export const delComment = (id: string) => http.delete(`comment/delect/${id}`);
export const editeComment = (id: string, params = {}) =>
  http.post(`comment/edite/${id}`, { ...params });

export const addProject = (params = {}) =>
  http.put("project/add", { ...params });
export const editeProject = (id: string, params = {}) =>
  http.post(`project/edite/${id}`, { ...params });
export const delProject = (id: string) => http.delete(`project/delect/${id}`);
export const fetchProject = (params = {}) =>
  http.get("project/get", { params });
export const fetchProjectId = (id: string, params = {}) =>
  http.get(`project/get/${id}`, { params });

export const fetchTag = (params = {}) => http.get("tag", { params });
export const addTag = (params = {}) => http.post("tag", { ...params });
export const delTag = (id: string) => http.delete(`tag/${id}`);
export const editTag = (id: string, params = {}) =>
  http.put(`tag/${id}`, { ...params });

export const fetchNews = (params = {}) => http.get("news", { params });
export const addNews = (params = {}) => http.post("news", { ...params });
export const delNews = (id: string) => http.delete(`news/${id}`);
export const editNews = (id: string, params = {}) =>
  http.put(`news/${id}`, { ...params });

export const fetchProfiles = (params = {}) => http.get("profile", { params });
export const addProfile = (params = {}) => http.post("profile", { ...params });
export const delProfile = (id: string) => http.delete(`profile/${id}`);
export const editProfile = (id: string, params = {}) =>
  http.put(`profile/${id}`, { ...params });

export const fetchContacts = (params = {}) => http.get("contact", { params });
export const addContact = (params = {}) => http.post("contact", { ...params });
export const delContact = (id: string) => http.delete(`contact/${id}`);
export const editContact = (id: string, params = {}) =>
  http.put(`contact/${id}`, { ...params });

export const fetchNotifications = (params = {}) =>
  http.get("notification", { params });
export const addNotification = (params = {}) =>
  http.post("notification", { ...params });
export const delNotification = (id: string) =>
  http.delete(`notification/${id}`);
export const editNotification = (id: string, params = {}) =>
  http.put(`notification/${id}`, { ...params });

export const fetchStuffPost = (params = {}) =>
  http.get("stuffpost", { params });
export const addStuffPost = (params = {}) =>
  http.post("stuffpost", { ...params });
export const delStuffPost = (id: string) => http.delete(`stuffpost/${id}`);
export const adsStuffPost = (id: string, ads: boolean) =>
  http2.post(`stuffpost/ads`, { _id: `${id}`, ads });
export const editStuffPost = (id: string, params = {}) =>
  http.put(`stuffpost/${id}`, { ...params });

export const uploadConfig = () => ({
  action: `${ORIGINAL_ROOT}upload/photo`,
  headers: {
    Authorization: getAuthorization()
  }
});
