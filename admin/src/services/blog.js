import axiosConfig from "../axiosConfig";

export const apiAddBlog = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "post",
                url: "/api/blog/create",
                data: payload,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetAllBlogLimit = (page) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/blog/all",
                params: page,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetDetailBlog = (_id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "get",
                url: "/api/blog/detail",
                params: _id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDeleteBlog = (_id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: "delete",
                url: "/api/blog/drop",
                params: _id,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
