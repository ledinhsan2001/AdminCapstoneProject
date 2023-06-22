import axiosConfig from "../axiosConfig";

export const apiGetAllUserLimit = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/user/get-all-limit",
                params: page,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetAllUser = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/user/get-all",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetUserPublic = (_id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/user/detail-public",
                params: { _id },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetUser = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/user/detail",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetAdmin = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/user/detail-admin",
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiPutUser = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "put",
                url: "/api/user/put",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteUser = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "put",
                url: "/api/user/drop",
                params: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
