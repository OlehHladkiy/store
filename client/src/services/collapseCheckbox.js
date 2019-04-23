import React, { Component } from "react";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import "./collapseCheckbox.css";

export default class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: []
  };

  componentDidMount() {
    this.setState((state, props) => ({
      open: props.initOpen
    }));
  }

  renderIcon = () =>
    this.state.open ? (
      <FontAwesomeIcon icon={faAngleUp} />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} />
    );

  toggleCheck(id) {
    const checkedCopy = [...this.state.checked];
    let index = checkedCopy.indexOf(id);
    if (index !== -1) {
      checkedCopy.splice(index, 1);
    } else {
      checkedCopy.push(id);
    }
    this.setState(
      {
        checked: checkedCopy
      },
      () => {
        this.props.applyFilters(checkedCopy);
      }
    );
  }

  renderList = () =>
    this.props.list
      ? this.props.list.map(item => (
          <ListItem
            className="list-item-checkbox"
            key={item._id}
            onClick={() => this.toggleCheck(item._id)}
          >
            <ListItemText primary={item.name} />
            <Checkbox
              color="primary"
              checked={this.state.checked.indexOf(item._id) !== -1}
            />
          </ListItem>
        ))
      : null;

  toggleOpen = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  render() {
    const { title } = this.props;
    return (
      <div>
        <List>
          <ListItem divider={true} onClick={this.toggleOpen}>
            <ListItemText primary={title} />
            {this.renderIcon()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List>{this.renderList()}</List>
          </Collapse>
        </List>
      </div>
    );
  }
}
