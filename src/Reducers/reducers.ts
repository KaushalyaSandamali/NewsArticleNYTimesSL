import { Articles } from "../Constants";

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
  REGISTER_ACCESS_TOKEN_FAIL,
} = Articles;
const INITIAL_STATE = {
  articleList: [],
  searchedArticleList: [],
  topArticleList: [],
  isLoading: false,
  accessToken: "",
};
export default (state = INITIAL_STATE, { payload, type }: any) => {
  switch (type) {
    case GET_ARTICLES:
      return Object.assign({}, state, {
        ...state,
        articleList: [],
        isLoading: true,
      });
    case GET_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        articleList: payload?.data,
        isLoading: false,
      });
    case GET_ARTICLES_FAIL:
      return Object.assign({}, state, {
        ...state,
        articleList: [],
        isLoading: false,
      });
    case SEARCH_ARTICLE:
      return Object.assign({}, state, {
        ...state,
        searchedArticleList: state.articleList,
        isLoading: true,
      });
    case SEARCH_ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        searchedArticleList: payload?.data,
        isLoading: false,
      });
    case SEARCH_ARTICLE_FAIL:
      return Object.assign({}, state, {
        ...state,
        searchedArticleList: state.articleList,
        isLoading: false,
      });
    case GET_TOP_ARTICLES:
      return Object.assign({}, state, {
        ...state,
        topArticleList: state.articleList,
        isLoading: true,
      });
    case GET_TOP_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        topArticleList: payload?.data,
        isLoading: false,
      });
    case GET_TOP_ARTICLES_FAIL:
      return Object.assign({}, state, {
        ...state,
        topArticleList: state.articleList,
        isLoading: false,
      });
    case GET_ACCESS_TOKEN:
      return Object.assign({}, state, {
        ...state,
      });
    case GET_ACCESS_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        accessToken: payload?.data,
      });
    case GET_ACCESS_TOKEN_FAIL:
      return Object.assign({}, state, {
        ...state,
      });
    case REGISTER_ACCESS_TOKEN:
      return Object.assign({}, state, {
        ...state,
      });
    case REGISTER_ACCESS_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        accessToken: payload?.data,
      });
    case REGISTER_ACCESS_TOKEN_FAIL:
      return Object.assign({}, state, {
        ...state,
      });
    default:
      return state;
  }
};
