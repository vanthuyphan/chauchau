import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import UsersTableHead from './UsersTableHead';
import UsersTableToolbar from './UsersTableToolbar';
import UsersDataService from '../service/UsersDataService';
// let counter = 0;

// function createData(firstName, middleName, lastName, phone, email, address) {
//   counter += 1;
//   return {
//     id: firstName, middleName, lastName, phone, email, address,
//   };
// }

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

export default class UserTable extends PureComponent {
  constructor(props) {
    super(props);
  this.state = {
    order: 'asc',
    orderBy: 'firstName',
    selected: [],
    data: [],
    // data: [
    //     createData('Cupcake', 305, 3.7, 67, 4.3,'aa'),
    //     createData('Donut', 452, 25.0, 51, 4.9,'bb'),
    //     createData('Eclair', 262, 16.0, 24, 6.0,'cc'),
    // ],
    page: 0,
    rowsPerPage: 5,
    visiblePopup: true,
  };
  this.refreshCourses = this.refreshCourses.bind(this);
}

componentDidMount() {
  this.refreshCourses();
}

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    const { orderBy: stateOrderBy, order: stateOrder } = this.state;

    if (stateOrderBy === property && stateOrder === 'desc') { order = 'asc'; }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };
  submit = values => {
    this.setState({visiblePopup: false})
    // print the form values to the console
    console.log(values)
    UsersDataService.addClient(values)
      .then(
        (response) => {
          console.log(response);
          this.setState({ returnData: response.data })
          alert("Add new user with username: "+ this.state.returnData.username);
          this.refreshCourses()
        },
      );

  }
  handleDeleteSelected = () => {
    const { data } = this.state;
    let copyData = [...data];
    const { selected } = this.state;

    for (let i = 0; i < selected.length; i += 1) {
      copyData = copyData.filter(obj => obj.id == selected[i]);
    }

    UsersDataService.deleteClient(selected)
      .then(
        (response) => {
          console.log(response);
          this.setState({ message: response.data })
          alert(this.state.message);
          this.refreshCourses()
        },
      );

    this.setState({selected: [] });
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  refreshCourses() {
    UsersDataService.retrieveAllClient()
      .then(
        (response) => {
          console.log(response);
          this.setState({ data: response.data, visiblePopup: true});
        },
      );
  }

  render() {
    const {
      data, order, orderBy, selected, rowsPerPage, page,visiblePopup
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
            </div>
            <UsersTableToolbar
              numSelected={selected.length}
              handleDeleteSelected={this.handleDeleteSelected}
              onRequestSort={this.handleRequestSort}
              submit={this.submit}
              visiblePopup={visiblePopup}
            />
            <div className="material-table__wrap">
              <Table className="material-table">
                <UsersTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data
                    .sort(getSorting(order, orderBy))
                    .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                    .map((d) => {
                      const isSelected = this.isSelected(d.id);
                      return (
                        <TableRow
                          className="material-table__row"
                          role="checkbox"
                          onClick={event => this.handleClick(event, d.id)}
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={d.id}
                          selected={isSelected}
                        >
                          <TableCell className="material-table__cell" padding="checkbox">
                            <Checkbox checked={isSelected} className="material-table__checkbox" />
                          </TableCell>
                          {/* <TableCell
                            className="material-table__cell"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {d.name}
                          </TableCell> */}
                          <TableCell className="material-table__cell" align="right">{d.firstName}</TableCell>
                          <TableCell className="material-table__cell" align="right">{d.middleName}</TableCell>
                          <TableCell className="material-table__cell" align="right">{d.lastName}</TableCell>
                          <TableCell className="material-table__cell" align="right">{d.email}</TableCell>
                          <TableCell className="material-table__cell" align="right">{d.phoneNumber}</TableCell>
                          <TableCell className="material-table__cell" align="right">{d.address}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              className="material-table__pagination"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}
