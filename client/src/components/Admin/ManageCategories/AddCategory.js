import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

import { connect } from 'react-redux';
import { getCategories, deleteCategory, addCategory, updateCategory } from '../../../action/categories_actions';
import UpdateDialog from './updateDialog';

class AddCategory extends Component {

    state = {
        mouseOverTarget: null,
        idForUpdate: null,
        openDialogUpdate: false,
        openDialogNewItem: false
    }

    componentDidMount(){
        this.props.getCategories();
    }

    onDeleteItem(id){
        this.props.deleteCategory(id, this.props.categories);
    }

    renderList = (list) => {
        return list.map((list) => (
            <div className="list-item" onClick={() => this.handleOpenDialogUpdate(list._id)} key={list._id} onMouseEnter={() => this.setState({mouseOverTarget: list._id})} onMouseLeave={() => this.setState({mouseOverTarget: ''})} >
                {list.name}
                {   
                    this.state.mouseOverTarget == list._id ?
                        <FontAwesomeIcon icon={faTrash} className="icon" onClick={(event) => { event.stopPropagation(); this.onDeleteItem(list._id) }}/>
                    : null 
                }
            </div>
        ))
    }

    handleCloseDialogNewItem = () => {
        this.setState({openDialogNewItem: false})
    }

    handleOpenDialogNewItem = () => {
        this.setState({openDialogNewItem: true})
    }

    handleCloseDialogUpdate = () => {
        this.setState({
            openDialogUpdate: false,
            idForUpdate: null
        })
    }

    handleOpenDialogUpdate = (id) => {
        this.setState({
            openDialogUpdate: true,
            idForUpdate: id
        })
    }

    render() {
        return (
            <div className="add-block">
                <div className="items-container">
                    <div className="list-item add" onClick={() => this.handleOpenDialogNewItem()}>
                        <FontAwesomeIcon className="list-item-icon" icon={faPlus}/>
                        Add category
                    </div>
                    {
                        this.props.categories ? 
                            this.renderList(this.props.categories)
                        : <CircularProgress color="secondary"/>
                    }
                </div>
                <UpdateDialog 
                    type="category"
                    nameOfButton="Save"
                    action={(dataToSubmit, previousData, id) => this.props.updateCategory(dataToSubmit, previousData, id)} 
                    data={this.props.categories} 
                    open={this.state.openDialogUpdate} 
                    id={this.state.idForUpdate} 
                    handleClose={() => this.handleCloseDialogUpdate()}
                />
                <UpdateDialog
                    type="category"
                    nameOfButton="Add"
                    action={(dataToSubmit, previousData) => this.props.addCategory(dataToSubmit, previousData)}
                    data={this.props.categories} 
                    open={this.state.openDialogNewItem}
                    handleClose={() => this.handleCloseDialogNewItem()}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetchingCategories: state.kindOfCategory.isFetchingCategories,
    isFetchingDeleteCategory: state.kindOfCategory.isFetchingDeleteCategory,
    isFetchingAddCategory: state.kindOfCategory.isFetchingAddCategory,
    categories: state.kindOfCategory.categories,
    errorMessage: state.kindOfCategory.errorMessage
})

export default connect(mapStateToProps, {getCategories, addCategory, deleteCategory, updateCategory})(AddCategory);