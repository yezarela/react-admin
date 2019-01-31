import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import './DataTable.css';

/**
 * @param orderBy
 * @param order
 * @param data
 * @param pageSize
 * @param columns
 */
class DataTable extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      order: props.order || 'asc',
      orderBy: props.orderBy || 'noop',
      pageSize: props.pageSize || 5,
      page: 0
    };
  }

  handleRequestSort = (event, property) => {
    if (property === 'actions') {
      return;
    }

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ pageSize: event.target.value });
  };

  getSortedData(data = []): any[] {
    const { order, orderBy, pageSize, page } = this.state;
    const { searchTerm } = this.props;

    return data
      .filter(el => {
        return searchTerm
          ? Object.keys(el).filter(x => {
              return ('' + el[x]).toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
            }).length
          : true;
      })
      .sort((a, b) => {
        if (orderBy === 'created_at_s') {
          return order === 'desc'
            ? new Date(b[orderBy]).getTime() < new Date(a[orderBy]).getTime()
              ? -1
              : 1
            : new Date(a[orderBy]).getTime() < new Date(b[orderBy]).getTime()
            ? -1
            : 1;
        } else {
          return order === 'desc' ? (b[orderBy] < a[orderBy] ? -1 : 1) : a[orderBy] < b[orderBy] ? -1 : 1;
        }
      })
      .slice(page * pageSize, page * pageSize + pageSize);
  }

  render() {
    const { data, columns, renderEmptyRows, className, onEdit, onDelete, renderActions } = this.props;
    const { order, orderBy, pageSize, page } = this.state;
    const emptyRows = pageSize - Math.min(pageSize, data.length - page * pageSize);

    return (
      <Paper className={`root ${className}`}>
        <div className="tableWrapper">
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {columns.map(column => {
                  return (
                    <TableCell
                      key={column.id}
                      // numeric={column.numeric}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={event => this.handleRequestSort(event, column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  );
                })}

                {renderActions && (
                  <TableCell className="actions">
                    <TableSortLabel>Actions</TableSortLabel>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {this.getSortedData(data).map(n => (
                <TableRow hover tabIndex={-1} key={n.id}>
                  {columns.map(column => (
                    <TableCell key={column.id}>{n[column.id] || '-'}</TableCell>
                  ))}
                  {renderActions && (
                    <TableCell>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item>
                          <IconButton onClick={() => onEdit(n)} aria-label="Edit">
                            <EditIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={() => onDelete(n)} aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {emptyRows > 0 && renderEmptyRows && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={pageSize}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 9, 25]}
        />
      </Paper>
    );
  }
}

export default DataTable;
