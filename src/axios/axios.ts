import axiosInstance from "@/axios/axios-instance.ts";

const axios = {
  get<T>(url: string, queries?: Object) {
    let queryStr = '';

    if (queries) {
      const queriesKeys = Object.keys(queries);
      const queriesValues = Object.values(queries)

      if (queriesKeys.length !== 0) queryStr += "?"

      for (let i = 0; i < queriesKeys.length; i++) {
        const key = queriesKeys[i];
        queryStr += key + "=" + queriesValues[i];
        if (i !== queriesKeys.length - 1) queryStr += '&'
      }
    }

    return axiosInstance.get<T>(url + queryStr)
  },

  post<T>(url: string, params?: Object) {
    return axiosInstance.post<T>(url, params)
  }
}

export default axios