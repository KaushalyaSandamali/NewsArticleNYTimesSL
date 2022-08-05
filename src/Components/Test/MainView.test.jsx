import React from "react";
import { describe, expect, jest } from "@jest/globals";
import {
  render,
  waitFor,
  cleanup,
  screen,
  fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MainPage } from "../MainPage";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import * as Actions from "../../Actions";
import { history } from "store";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "rootReducer";
import rootSaga from "rootSaga";
import { getArticles } from "./getArticles";
import { getTopStories } from "./getTopStories";
import userEvent from "@testing-library/user-event";

jest.setTimeout(60000);

jest.mock("axios");
jest.mock("jwt-decode", () => () => ({
  decodeJWT: {},
}));
describe("Ny Times News Testing Scenario 1", () => {
  let store;
  /**
   * @description mock redux store
   */

  const sagaMiddleware = createSagaMiddleware();
  store = createStore(rootReducer(history), applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MainPage />
        </Provider>
      );
    });

    /**
     * @description get mock values for getArticles
     */
    getArticles();
    const articlesRes = await fetch("/getArticles");

    await act(async () => {
      store.dispatch(
        Actions.articles.searchArticle.success(JSON.parse(articlesRes.body))
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("Covering Sequence Table should loading properly", async () => {
    const _ElementArticles = await waitFor(() =>
      document.querySelectorAll("[data-testid=article-story]")
    );
    expect(_ElementArticles.length).toBe(10);

    const _ElementSearchBtn = await waitFor(() =>
      document.querySelector("[data-testid='search-article']")
    );

    fireEvent.click(_ElementSearchBtn);
    userEvent.type(_ElementSearchBtn, "world");
    fireEvent.keyDown(_ElementSearchBtn, {
      key: "Enter",
      keyCode: 13,
    });

    /**
     * @description get mock values for getArticles
     */
    getArticles();
    const articlesRes = await fetch("/getArticles");

    await act(async () => {
      store.dispatch(
        Actions.articles.searchArticle.success(JSON.parse(articlesRes.body))
      );
    });

    const _ElementSearchedArticles = await waitFor(() =>
      document.querySelectorAll("[data-testid=article-story]")
    );
    expect(_ElementSearchedArticles.length).toBe(10);

    const _ElementLinkTop = await waitFor(() =>
      document.querySelector("[data-testid=go-to-top-stories]")
    );
    fireEvent.click(_ElementLinkTop);

    /**
     * @description get mock values for getTopStories
     */
    getTopStories();
    const topArticlesRes = await fetch("/getTopStories");

    await act(async () => {
      store.dispatch(
        Actions.articles.topArticleList.success(JSON.parse(topArticlesRes.body))
      );
    });

    const _ElementWorldBtn = await waitFor(() =>
      document.querySelector("[data-testid='world-btn']")
    );
    expect(_ElementWorldBtn).toBeEnabled();
    const _ElementTopStories = await waitFor(() =>
      document.querySelectorAll("[data-testid=top-story]")
    );
    expect(_ElementTopStories.length).toBe(10);
  });
});
