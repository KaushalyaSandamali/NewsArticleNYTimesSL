import axios from "axios";

export default {
  getArticleList: (): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:Arts&sort=newest&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  searchArticleList: (params: any): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${params}&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`,
          {
            headers: {
              Accept: "application/json",
              // "Access-Control-Allow-Origin": "*",
              // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
              "Content-Type": "application/json",
              // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJwYXNzd29yZCI6ImJlc3RQYXNzdzByZCIsImlhdCI6MTY1OTY4NDI1NCwiZXhwIjoxNjU5Njg3ODU0fQ.oRlvQchz_4UKte-C7lEog9Av6gOxOYYULVhUHMTN_Rk`
            },
          }
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  getTopArticleList: (params: any): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/${params}.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  getAccessTokenByParams: (params: any): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://localhost:8000/auth/login`, params);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  registerAccessTokenByParams: (params: any): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { data } = await axios.post(`http://localhost:8000/auth/register`, params);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
