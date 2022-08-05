import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Article } from "../Article";
import CircularProgress from "@mui/material/CircularProgress";
import { connect, ConnectedProps } from "react-redux";
import TablePagination from "@mui/material/TablePagination";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fafafa",
  },
  media: {
    height: 300,
  },
});

interface IArticlesProps {}

const Articles: React.FC<IArticlesProps & PropsFromRedux> = ({
  searchedArticleList,
  isLoading,
}) => {
  const classes = useStyles();
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
    setRowsPerPage(parseInt(event.target.value, 10));
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
      <TablePagination
        component="div"
        count={searchedArticleList?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isLoading && <CircularProgress disableShrink />}
      {!isLoading && (
        <div className="">
          <Grid container spacing={3}>
            {searchedArticleList?.slice(spliceIndex?.startIndex, spliceIndex?.endIndex).map((article: any, index: number) => (
              <Grid item xs={12} sm={4} key={article._id}>
                <Article article={article} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.article.isLoading,
    searchedArticleList: state.article.searchedArticleList,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Articles);
