import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

class TableHeader extends Component {
    render() {
        return (
            <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Latitude</TableCell>
                <TableCell align="center">Longitude</TableCell>
                <TableCell align="center">Credit Card Number</TableCell>
                <TableCell align="center">Credit Card Type</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Domain Name</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Mac Address</TableCell>
                <TableCell align="center">URL</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Last Login</TableCell>
                <TableCell align="center">Payment Method</TableCell>
            </TableRow>
        );
    }
}

export default TableHeader;
