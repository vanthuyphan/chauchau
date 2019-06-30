import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'mdi-react/AddIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import UserTableFilterButton from './UserTableFilterButton';

const UsersTableToolbar = ({ numSelected, handleDeleteSelected, onRequestSort }) => (
  <div className="material-table__toolbar-wrap">
    <Toolbar className="material-table__toolbar">
        <IconButton
            onClick={() => {alert("Afdffing users")}}
            className="material-table__toolbar-button"
        >
            <AddIcon />
        </IconButton>
            <div>
        {numSelected > 0 && (
        <h5 className="material-table__toolbar-selected">{numSelected} <span>selected</span></h5>
        )}
      </div>
      <div>
        {numSelected > 0 ? (
          <IconButton
            onClick={handleDeleteSelected}
            className="material-table__toolbar-button"
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <UserTableFilterButton onRequestSort={onRequestSort} />
        )}
      </div>
    </Toolbar>
  </div>
);

UsersTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default UsersTableToolbar;
