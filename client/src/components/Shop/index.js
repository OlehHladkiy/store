import React, { Component } from 'react';
import CollapseCheckbox from '../../services/collapseCheckbox';
import {connect} from 'react-redux';
import {getBrands, getCategories} from '../../action/categories_actions';
import {productsFromServer} from '../../action/product_actions';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import ProductBuyDialog from './productBuyDialog';
import RenderProduct from './renderProducts';
import './index.css';

class Shop extends Component {
    state = {
        limit: 12,
        skip: 0,
        filters: {
            brand: [],
            category: []
        }
    }

    componentDidMount(){
        this.props.getBrands();
        this.props.getCategories();
        
        this.props.productsFromServer(
            this.state.limit,
            this.state.skip,
            this.state.filters
        );
    }

    applyFilters(filters, key){
        const newFilters = {...this.state.filters};
        newFilters[key] = filters;

        this.setState({
            filters: newFilters
        }, () => {
            this.showFiltersResult(newFilters)
        })
    }

    showFiltersResult(filters){
        this.props.productsFromServer(
            this.state.limit,
            0,
            filters
        )
        this.setState({
            skip: 0
        })
    }

    loadArticles = () => {
        let skip = this.state.skip + this.state.limit;

        this.props.productsFromServer(
            this.state.limit,
            skip,
            this.state.filters,
            this.props.articles
        );
        this.setState({
            skip
        })
    }

    render() {
        return (
            <div className="main-content shop">
                <div className="user-menu">
                    <div className="stepper">
                        Browse products
                    </div>
                    <CollapseCheckbox
                        list={this.props.categories}
                        title="category"
                        initOpen={true}
                        applyFilters={(filters) => this.applyFilters(filters, 'category')}
                    />
                    <CollapseCheckbox
                        list={this.props.brands}
                        initOpen={false}
                        title="brands"
                        applyFilters={(filters) => this.applyFilters(filters, 'brand')}
                    />
                </div>
                <RenderProduct 
                    skip={this.state.skip} 
                    articles={this.props.articles} 
                    loadArticles={this.loadArticles}
                    />
                <ProductBuyDialog/>
            </div>
        )   
    }
}

const mapStateToProps = (state) => ({
    brands: state.kindOfCategory.brands,
    categories: state.kindOfCategory.categories,
    articles: state.product.articles,
    isFetchingArticles: state.product.isFetchingArticles,
    errorMessage: state.product.errorMessage
})  

export default connect(mapStateToProps, {getBrands, getCategories, productsFromServer})(Shop);