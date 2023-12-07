import axiosInstance from "@/axios/axios-instance.ts";

const axios = {
  get(url: string, query?: Object) {
    let queryStr = '';

    if (query) {
      const queryKeys = Object.keys(query);
      const queryValues = Object.values(query)

      if (queryKeys.length !== 0) queryStr += "?"

      for (let i = 0; i < queryKeys.length; i++) {
        const key = queryKeys[i];
        queryStr += key + "=" + queryValues[i];
        if (i !== queryKeys.length - 1) queryStr += '&'
      }
    }

    return axiosInstance.get(url + queryStr)
  },

  post(url: string, params?: Object) {
    return axiosInstance.post(url, params)
  }
}

export default axios