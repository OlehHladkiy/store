import React from 'react';
import './index.css';
import ListArticle from './listArticle';
import {withRouter} from 'react-router-dom';

const ArticlesPresentational = (props) => {
      const {page, rowsPerPage, articles = [], history, prevPage, nextPage} = props;

      const renderListArticle = () => (
            articles ?
            articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                  <ListArticle
                        update={() => history.push(`/admin/add_product/${item._id}`)}
                        key={item._id}
                        previousData={articles}
                        {...item}
                  />
            )) : null
      )
      
      return (
            <div className="list-article-container">
                  <h2>Articles</h2>
                  {renderListArticle()}
                  <div>
                        <button disabled={page === 0} className="pag-btn left" onClick={() => prevPage()}> > </button>
                        <span>{page + 1}</span>
                        <button disabled={articles.length <= (page + 1) * rowsPerPage} className="pag-btn" onClick={() => nextPage()}> > </button>
                  </div>
            </div>
      )
}

//disabled={articles.length <= (page + 1) * rowsPerPage}

export default withRouter(ArticlesPresentational);
