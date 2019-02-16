import React from 'react';
import ProductCard from './productCards';
import CircularProgress from '@material-ui/core/CircularProgress'; 

const RenderProduct = (props) => {

    const renderProducts = () => (
        props.articles ? 
            props.articles.map(item => (
                <ProductCard key={item._id} article={item}/>
            ))
        : <div className="loader">
            <CircularProgress color="secondary"/>
          </div>
    )

    return (
        <div className="content">
                    {
                        props.articles && props.articles.length === 0 ?
                            <div className="no-result">
                                No Result
                            </div>
                        :
                        <React.Fragment>
                            <div className="articles-container">
                                {
                                    renderProducts()
                                }
                            </div>
                            {
                                props.articles && props.articles.length < props.skip ? null :
                                <div className="more-btn" onClick={() => props.loadArticles()}>
                                    More
                                </div>
                            }
                        </React.Fragment>
                    }
                </div>
    );
}

export default RenderProduct;
