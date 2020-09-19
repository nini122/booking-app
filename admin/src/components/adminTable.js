import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class AdminTable extends React.Component {
    render() {
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.barname}</TableCell>
                <TableCell>{this.props.address}</TableCell>
                <TableCell>{this.props.ads}</TableCell>
                <TableCell><img src={this.props.image} alt="advertise"/></TableCell>
            </TableRow>
        )
    }
}

export default AdminTable;