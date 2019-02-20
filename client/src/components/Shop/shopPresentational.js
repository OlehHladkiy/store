import React from 'react';
import ProductBuyDialog from './productBuyDialog';
import RenderProduct from './renderProducts';
import CollapseCheckbox from '../../services/collapseCheckbox';
import './index.css';

const ShopPresentational = (props) => {
    const { applyFilters, limit, loadArticles } = props;
    return (
        <div className="main-content shop">
                <div className="user-menu">
                    <div className="stepper">
                        Browse products
                    </div>
                    <CollapseCheckbox
                        list={props.categories}
                        title="category"
                        initOpen={true}
                        applyFilters={(filters) => applyFilters(filters, 'category')}
                    />
                    <CollapseCheckbox
                        list={props.brands}
                        initOpen={false}
                        title="brands"
                        applyFilters={(filters) => applyFilters(filters, 'brand')}
                    />
                </div>
                <RenderProduct 
                    limit={limit}
                    size={props.articlesSize} 
                    articles={props.articles} 
                    loadArticles={loadArticles}
                />
                <ProductBuyDialog/>
            </div>
    );
}

export default ShopPresentational;
