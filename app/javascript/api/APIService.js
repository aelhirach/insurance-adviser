import axios from "axios";

// Default config options
const defaultOptions = {
    baseURL: `${process.env.APP_URL || window.location.origin}/api`,
    headers: {'Content-Type': 'application/json'}
};


let instanceAxios = axios.create(defaultOptions);
instanceAxios.interceptors.request.use(
    (config) =>
    {
      config.params = config.params || {};
      return config

    }, (error) => {
          return Promise.reject(error)
    }

)



const cache = {};


class APIService {


  async loadQuoteById(id){

    const url = `/quotes/${id}`

      if (cache[url]) {
        return cache[url];
      }

      const result = await instanceAxios.get(url);
      cache[url] = result.data; //
      return result.data;


  }

  async requestQuote(request) {
      const url = "/quotes"
      const result = await instanceAxios.post(url, request);
      return result.data;
   }



}

export default new APIService();
