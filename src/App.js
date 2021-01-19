import React, { Component } from "react";
import { Container, Card, Form, Spinner } from "react-bootstrap";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHeader from "./components/TableHeader";
import TablePagination from "@material-ui/core/TablePagination";
import { getDetails } from "./services/Details";
import "./App.css";
import SearchComponent from "./components/SearchComponent";

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            data2: [],
            loading: true,
            page:0,
            rowsPerPage: 20,
        };
    }

    getList = async () => {
        let { data } = await getDetails();
        this.setState({ data: data.records.profiles || [], data2: data.records.profiles ||  [],  loading: false });
    };

    handleSearch = (e) => {
        let string = e.target.value;
        if (string === "") {
            this.setState({ data: this.state.data });
        } else {
            let data = this.state.data2.filter(
                (content) =>
                    content.FirstName.toLowerCase().includes(string.toLowerCase()) ||
                    content.LastName.toLowerCase().includes(string.toLowerCase())
            );
            this.setState({ data });
        }
    };

    handleChange = (e) => {
        let string = e.target.value;
        if (string === "") {
            this.setState({ data: this.state.data });
        } else {
            let data = this.state.data2.filter((content) =>
                content.Gender.toLowerCase() === string.toLowerCase()
            );
            this.setState({ data });
        }
    };

    handleFilter = (e) => {
        let string = e.target.value;
        if (string === "") {
            this.setState({ data: this.state.data });
        } else {
            let data = this.state.data2.filter((content) =>
                content.PaymentMethod.toLowerCase() === string.toLowerCase()
            );
            this.setState({ data });
        }
    };

    handleChangePage = (event, newPage) => {
        this.setState({page:newPage})
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: +event.target.value});
        this.setState({page:0});
    };

    componentDidMount() {
        this.getList();
    }

    render() {
        const { data,  loading, page, rowsPerPage } = this.state;
        return (
            <div className="body">
                <Container className="p-5" fluid>
                    {loading ? (
                        <div className="text-center" style={{ marginTop: 120 }}>
                            <Spinner variant="secondary" animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <div>
                            <h2>Transaction Details</h2>

                            <Card>
                                <Card.Body>
                                    <div>
                                        <SearchComponent 
                                        search={this.handleSearch} 
                                        filter={this.handleChange} 
                                        content={data}
                                        payment={this.handleFilter}
                                        />
                                      
                                    </div>
                                    <br />
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader size="small" style={{ minWidth: 650 }}>
                                            <TableHead>
                                                <TableHeader />
                                            </TableHead>

                                            {data.slice(page * rowsPerPage, page *  rowsPerPage + rowsPerPage).map((data, i) => (
                                                <TableBody key={i}>
                                                    <TableRow>
                                                        <TableCell align="right">
                                                            {Math.round(i + 1)}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.FirstName}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.LastName}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.Gender}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.Latitude}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.Longitude}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.CreditCardNumber}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.CreditCardType}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.Email}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.DomainName}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.PhoneNumber}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.MacAddress}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.URL}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.UserName}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {" "}
                                                            {moment(data.LastLogin).format("ll")}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {data.PaymentMethod}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            ))}
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[25]}
                                        component="div"
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Card.Body>
                            </Card>
                         
                        </div>
                    )}
                </Container>
            </div>
        );
    }
}

export default App;
