import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getBrands, getCategories} from '../../action/categories_actions';
import {productsFromServer} from '../../action/product_actions';
import ShopPresentational from './shopPresentational';

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

    applyFilters = (filters, key) => {
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
            <ShopPresentational
                {...this.props}
                loadArticles={this.loadArticles}
                applyFilters={this.applyFilters}
                limit={this.state.limit}
            />
        )   
    }
}

const mapStateToProps = (state) => ({
    brands: state.kindOfCategory.brands,
    categories: state.kindOfCategory.categories,
    articles: state.product.articles,
    articlesSize: state.product.articlesSize,
    isFetchingArticles: state.product.isFetchingArticles,
    errorMessage: state.product.errorMessage
})  

export default connect(mapStateToProps, {getBrands, getCategories, productsFromServer})(Shop);