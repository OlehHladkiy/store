import React, { Component } from 'react';
import {connect} from 'react-redux';
import { productsFromServer } from '../../action/product_actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArticlesPresentational from './articlesPresentational';
import UserLayout from '../../hoc/userLayout';

class Articles extends Component {

      state = {
            page: 0,
            rowsPerPage: 5,
            skip: 0,
      }

      componentDidMount(){
            const {rowsPerPage, skip} = this.state;
            this.props.productsFromServer(rowsPerPage, skip);
      }

      handleNextPage = () => {
            if(this.props.articles.length <= this.state.page * this.state.rowsPerPage + this.state.rowsPerPage){
                  console.log('loading');
                  let skip = this.state.skip + this.state.rowsPerPage;
                  this.props.productsFromServer(this.state.rowsPerPage, skip, null, this.props.articles);
                  this.setState({
                        skip
                  })
            }
            this.setState((prevState) => ({
                  page: prevState.page + 1,
            }))
      }

      handlePrevPage = () => {
            this.setState((prevState) => ({
                  page: prevState.page - 1,
            }))
      }

      render() {
            return (
                  <UserLayout {...this.props}>
                        {
                              this.props.isFetchingArticles === true 
                              ?
                                    <CircularProgress color="secondary"/>
                              :
                                    <ArticlesPresentational
                                          articles={this.props.articles}
                                          page={this.state.page}
                                          rowsPerPage={this.state.rowsPerPage}
                                          prevPage={this.handlePrevPage}
                                          nextPage={this.handleNextPage}
                                          wholeSize={this.props.wholeSize}
                                    />     
                        }
                  </UserLayout>
            )
      }
}

const mapStateToProps = (state) => ({
      articles: state.product.articles,
      articlesSize: state.product.articlesSize,
      isFetchingArticles: state.product.isFetchingArticles, 
      wholeSize: state.product.wholeSize
})

export default connect(mapStateToProps, {productsFromServer})(Articles);