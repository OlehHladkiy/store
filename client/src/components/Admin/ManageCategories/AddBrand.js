import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

import { connect } from 'react-redux';
import { getBrands, deleteBrand, addBrand, updateBrand} from '../../../action/categories_actions';
import UpdateDialog from './updateDialog';


class AddBrand extends Component {

    state = {
        mouseOverTarget: null,
        idForUpdate: null,
        openDialogUpdate: false,
        openDialogNewItem: false
    }

    componentDidMount(){
        this.props.getBrands();
    }

    onDeleteItem(id){
        this.props.deleteBrand(id, this.props.brands);
    }

    renderList = (list) => {
        return list.map((list) => (
            <div className="list-item" onClick={() => this.handleOpenDialogUpdate(list._id)} key={list._id} onMouseEnter={() => this.setState({mouseOverTarget: list._id})} onMouseLeave={() => this.setState({mouseOverTarget: ''})} >
                {list.name}
                {   
                    this.state.mouseOverTarget == list._id ?
                        <FontAwesomeIcon icon={faTrash} className="icon" onClick={(event) => { event.stopPropagation(); this.onDeleteItem(list._id)}}/>
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
                        Add brand
                    </div>
                    {
                        this.props.brands ? 
                            this.renderList(this.props.brands)
                        : <CircularProgress color="secondary"/>
                    }
                </div>
                <UpdateDialog 
                    type="brand"
                    nameOfButton="Save"
                    action={(dataToSubmit, previousData, id) => this.props.updateBrand(dataToSubmit, previousData, id)} 
                    data={this.props.brands} 
                    open={this.state.openDialogUpdate} 
                    id={this.state.idForUpdate} 
                    handleClose={() => this.handleCloseDialogUpdate()}
                />
                <UpdateDialog
                    type="brand"
                    nameOfButton="Add"
                    action={(dataToSubmit, previousData) => this.props.addBrand(dataToSubmit, previousData)}
                    data={this.props.brands} 
                    open={this.state.openDialogNewItem}
                    handleClose={() => this.handleCloseDialogNewItem()}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isFetchingBrands: state.kindOfCategory.isFetchingBrands,
    isFetchingDeleteBrand: state.kindOfCategory.isFetchingDeleteBrand,
    isFetchingAddBrand: state.kindOfCategory.isFetchingAddBrand,
    brands: state.kindOfCategory.brands,
    errorMessage: state.kindOfCategory.errorMessage
})

export default connect(mapStateToProps, { getBrands, deleteBrand, addBrand, updateBrand })(AddBrand);