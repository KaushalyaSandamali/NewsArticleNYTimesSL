import React, { useEffect } from "react";
import { TopStory } from "./TopStory";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { articles } from "../../Actions";
import CircularProgress from "@mui/material/CircularProgress";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fafafa",
  },
  media: {
    height: 300,
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
interface ITopStoriesProps {}
const TopStories: React.FC<ITopStoriesProps & PropsFromRedux> = ({
  topArticleList,
  getTopArticleList,
  isLoading,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getTopArticleList && getTopArticleList({ section: "world" });
  }, []);

  const getTopArticles = (section: any) => {
    getTopArticleList && getTopArticleList({ section });
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [spliceIndex, setSpliceIndex] = React.useState({startIndex:0, endIndex: rowsPerPage});

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    if(page != 0){
      setSpliceIndex({
      startIndex:page*rowsPerPage + 1 , endIndex: rowsPerPage * (page+1)
    })
    } else {
      setSpliceIndex({
        startIndex:page , endIndex: rowsPerPage
      })
    }
  },[page,rowsPerPage])

  return (
    <>
      <Container>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h2"
          align="center"
        >
          <div className={classes.buttons}>
            <Button
              onClick={() => {
                getTopArticles("world");
              }}
              variant="outlined"
              color="primary"
              data-testid='world-btn'
            >
              World News
            </Button>
            <Button
              onClick={() => {
                getTopArticles("science");
              }}
              variant="outlined"
              color="secondary"
              data-testid='science-btn'
            >
              Science
            </Button>
          </div>

          <NavLink to="/">
            <Link component="button" variant="body2">
              Go Back
            </Link>
          </NavLink>
          <TablePagination
            component="div"
            count={topArticleList?.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {isLoading && <CircularProgress disableShrink />}
          {!isLoading && (
            <div className="">
              <Grid container spacing={3}>
                {topArticleList
                  ?.slice(spliceIndex?.startIndex, spliceIndex?.endIndex)
                  .map((topstory: any) => (
                    <Grid item xs={12} sm={4} key={topstory.url}>
                      <TopStory topstory={topstory} />
                    </Grid>
                  ))}
              </Grid>
            </div>
          )}
        </Typography>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    topArticleList: state.article.topArticleList,
    isLoading: state.article.isLoading,
  };
};

const mapDispatchToProps = {
  getTopArticleList: articles.topArticleList.get,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TopStories);
