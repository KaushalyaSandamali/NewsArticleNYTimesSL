import { put, call, takeLatest } from "redux-saga/effects";
import * as Actions from "../Actions";
import * as API from "../Services";
import { Articles } from "../Constants";

const { articles } = Actions;
const { getArticleList, searchArticleList, getTopArticleList, getAccessTokenByParams, registerAccessTokenByParams } = API.articles;
const { articleList, searchArticle, topArticleList, getAccessToken, registerAccessToken } = articles;
const { GET_ARTICLES, SEARCH_ARTICLE, GET_TOP_ARTICLES, GET_ACCESS_TOKEN, REGISTER_ACCESS_TOKEN } = Articles;

export const ArticleSaga = {
  articles: {
    getArticles: function* (action: any): any {
      try {
        const { response } = yield call(getArticleList);
        yield put(articleList.success(response?.docs));
      } catch (error) {
        yield put(articleList.fail(new Error()));
      }
    },
    searchArticles: function* (action: any): any {
      const {text} = action?.payload?.data ?? {};
      try {
        const { response } = yield call(searchArticleList, text);
        yield put(searchArticle.success(response?.docs));
      } catch (error) {
        yield put(searchArticle.fail(new Error()));
      }
    },
    getTopArticles: function* (action: any): any {
      const {section} = action?.payload?.data ?? {};
      try {
        const { results } = yield call(getTopArticleList, section);
        yield put(topArticleList.success(results));
      } catch (error) {
        yield put(topArticleList.fail(new Error()));
      }
    },
    getAccessToken: function* (action: any): any {
      const params = action?.payload?.data ?? {};
      try {
        const {access_token} = yield call(getAccessTokenByParams, params);
        yield put(getAccessToken.success(access_token));
      } catch (error) {
        yield put(getAccessToken.fail(new Error()));
      }
    },
    registerAccessToken: function* (action: any): any {
      const params = action?.payload?.data ?? {};
      try {
        const {access_token} = yield call(registerAccessTokenByParams, params);
        yield put(registerAccessToken.success(access_token));
      } catch (error) {
        yield put(registerAccessToken.fail(new Error()));
      }
    },
  },
};

export default [
  takeLatest(GET_ARTICLES, ArticleSaga.articles.getArticles),
  takeLatest(SEARCH_ARTICLE, ArticleSaga.articles.searchArticles),
  takeLatest(GET_TOP_ARTICLES, ArticleSaga.articles.getTopArticles),
  takeLatest(GET_ACCESS_TOKEN, ArticleSaga.articles.getAccessToken),
  takeLatest(REGISTER_ACCESS_TOKEN, ArticleSaga.articles.registerAccessToken),
];
