import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from 'mdi-react/FilterListIcon';

class UserTableFilterButton extends React.Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSort = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          className="material-table__toolbar-button"
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <FilterListIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className="material-table__filter-menu"
        >
          <MenuItem onClick={this.handleSort('firstName')} className="material-table__filter-menu-item">First Name</MenuItem>
          <MenuItem onClick={this.handleSort('middleName')} className="material-table__filter-menu-item">
            Middle Name
          </MenuItem>
          <MenuItem onClick={this.handleSort('lastName')} className="material-table__filter-menu-item">Last Name</MenuItem>
          <MenuItem onClick={this.handleSort('phone')} className="material-table__filter-menu-item">Phone</MenuItem>
          <MenuItem onClick={this.handleSort('email')} className="material-table__filter-menu-item">Email</MenuItem>
          <MenuItem onClick={this.handleSort('address')} className="material-table__filter-menu-item">Address</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default UserTableFilterButton;
