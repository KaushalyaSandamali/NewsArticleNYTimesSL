import { Articles } from "../Constants";

interface IReturnAction<T> {
  type: string;
  payload: {
    data: Array<T> | object;
    isLoading: boolean;
  };
}

interface IAPIAction {
  [key: string]: {
    save?: <T>(data: Array<T> | object) => IReturnAction<T>;
    update?: <T>(data: Array<T> | object) => IReturnAction<T>;
    get?: <T>(data: Array<T> | object) => IReturnAction<T>;
    success: <T>(data: Array<T> | object) => IReturnAction<T>;
    fail: <E>(data: Array<E> | object) => IReturnAction<E>;
  };
}
const {
  GET_ARTICLES,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAIL,
  SEARCH_ARTICLE,
  SEARCH_ARTICLE_SUCCESS,
  SEARCH_ARTICLE_FAIL,
  GET_TOP_ARTICLES,
  GET_TOP_ARTICLES_SUCCESS,
  GET_TOP_ARTICLES_FAIL,
  GET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN_SUCCESS,
  GET_ACCESS_TOKEN_FAIL,
  REGISTER_ACCESS_TOKEN,
  REGISTER_ACCESS_TOKEN_SUCCESS,
  REGISTER_ACCESS_TOKEN_FAIL
} = Articles;

export const articles: IAPIAction = {
  articleList: {
    get: (data) => ({
      type: GET_ARTICLES,
      payload: {
        data,
        isLoading: true,
      },
    }),
    success: (data) => ({
      type: GET_ARTICLES_SUCCESS,
      payload: {
        data,
        isLoading: false,
      },
    }),
    fail: (data) => ({
      type: GET_ARTICLES_FAIL,
      payload: {
        data,
        isLoading: false,
      },
    }),
  },
  searchArticle: {
    get: (data) => ({
      type: SEARCH_ARTICLE,
      payload: {
        data,
        isLoading: true,
      },
    }),
    success: (data) => ({
      type: SEARCH_ARTICLE_SUCCESS,
      payload: {
        data,
        isLoading: false,
      },
    }),
    fail: (data) => ({
      type: SEARCH_ARTICLE_FAIL,
      payload: {
        data,
        isLoading: false,
      },
    }),
  },
  topArticleList: {
    get: (data) => ({
      type: GET_TOP_ARTICLES,
      payload: {
        data,
        isLoading: true,
      },
    }),
    success: (data) => ({
      type: GET_TOP_ARTICLES_SUCCESS,
      payload: {
        data,
        isLoading: false,
      },
    }),
    fail: (data) => ({
      type: GET_TOP_ARTICLES_FAIL,
      payload: {
        data,
        isLoading: false,
      },
    }),
  },
  getAccessToken: {
    get: (data) => ({
      type: GET_ACCESS_TOKEN,
      payload: {
        data,
        isLoading: true,
      },
    }),
    success: (data) => ({
      type: GET_ACCESS_TOKEN_SUCCESS,
      payload: {
        data,
        isLoading: false,
      },
    }),
    fail: (data) => ({
      type: GET_ACCESS_TOKEN_FAIL,
      payload: {
        data,
        isLoading: false,
      },
    }),
  },
  registerAccessToken: {
    get: (data) => ({
      type: REGISTER_ACCESS_TOKEN,
      payload: {
        data,
        isLoading: true,
      },
    }),
    success: (data) => ({
      type: REGISTER_ACCESS_TOKEN_SUCCESS,
      payload: {
        data,
        isLoading: false,
      },
    }),
    fail: (data) => ({
      type: REGISTER_ACCESS_TOKEN_FAIL,
      payload: {
        data,
        isLoading: false,
      },
    }),
  },
};
