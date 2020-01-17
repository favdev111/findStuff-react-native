import { http, getAuthorization } from "./http";
import { API_ROOT } from "./config";

export const login = (params = {}) => http.post("auth/signin", { ...params });

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

export const fetchLostPost = (params = {}) => http.get("lostpost", { params });
export const addLostPost = (params = {}) =>
  http.post("lostpost", { ...params });
export const delLostPost = (id: string) => http.delete(`lostpost/${id}`);
export const editLostPost = (id: string, params = {}) =>
  http.put(`lostpost/${id}`, { ...params });

export const fetchFoundPost = (params = {}) =>
  http.get("foundpost", { params });
export const addFoundPost = (params = {}) =>
  http.post("foundpost", { ...params });
export const delFoundPost = (id: string) => http.delete(`foundpost/${id}`);
export const editFoundPost = (id: string, params = {}) =>
  http.put(`foundpost/${id}`, { ...params });

export const uploadConfig = () => ({
  action: `${API_ROOT}/upload/photo`,
  headers: {
    Authorization: getAuthorization()
  }
});
