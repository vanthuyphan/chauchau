import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from 'mdi-react/AddIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import UserTableFilterButton from './UserTableFilterButton';
import Popup from "reactjs-popup";
import AddUser from './AddUser';


const UsersTableToolbar = ({ numSelected, handleDeleteSelected, onRequestSort,submit,visiblePopup }) => 
  (
  <div className="material-table__toolbar-wrap">
    <Toolbar className="material-table__toolbar">
      {/* <IconButton
        onClick={() => { alert("Afdffing users") }}
        className="material-table__toolbar-button"
      >

      </IconButton> */}
       {visiblePopup ? (
          <Popup trigger={<AddIcon />} modal>
             <AddUser onSubmit={submit}  />
          </Popup>
        ) : (
            <div></div>
          )}
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
  submit: PropTypes.func.isRequired,
  visiblePopup: PropTypes.bool.isRequired,
};

export default UsersTableToolbar;
