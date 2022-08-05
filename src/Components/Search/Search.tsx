import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { connect, ConnectedProps } from "react-redux";
import { articles } from "../../Actions";

interface ISearchProps {
}

const Search: React.FC<PropsFromRedux> = ({ searchArticleList }) => {
  const [text, setText] = useState("");
  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const searchArticles = (text: any) => {
    searchArticleList && searchArticleList({ text });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    searchArticles(text);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          data-testid='search-article'
          label="Search articles"
          type="text"
          name="text"
          value={text}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon
                  onClick={(e: any) => searchArticles(e.target.value)}
                />
              </IconButton>
            ),
          }}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    articleList: state.article.articleList,
    isLoading: state.article.isLoading,
  };
};

const mapDispatchToProps = {
  searchArticleList: articles.searchArticle.get,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Search);
