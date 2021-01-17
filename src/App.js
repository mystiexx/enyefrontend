import React, { Component } from "react";
import { Container, Table, Card, Form, Spinner } from "react-bootstrap";
import moment from "moment";
import Pagination from "./Pagination";
import { getDetails } from "./services/Details";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: true,
        };
    }

    getList = async (page = 1) => {
        let { data } = await getDetails(page);
        this.setState({ data: data.records.profiles || [], size: data.size, loading: false });
    };

    handleSearch = (e) => {
        let string = e.target.value;
        if (string === "") {
            this.setState({ data: this.state.data });
        } else {
            let data = this.state.data.filter(
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
            let data = this.state.data.filter((content) =>
                content.Gender.toLowerCase().includes(string.toLowerCase())
            );
            this.setState({ data });
        }
    };

   

    componentDidMount() {
        this.getList();
    }
    render() {
        const { data, size, loading } = this.state;
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
                                 
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <Form inline>
                                                <Form.Label>Search:</Form.Label>
                                                <Form.Control
                                                    onChange={this.handleSearch}
                                                    type="text"
                                                    className="ml-2"
                                                />
                                            </Form>
                                        </div>

                                        <div>
                                            <Form inline>
                                                <Form.Label>Filter By:</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="role"
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="" name="gender">
                                                        -Gender-
                                                    </option>
                                                    <option value="Male" name="gender">
                                                        Male
                                                    </option>
                                                    <option value="Female" name="gender">
                                                        Female
                                                    </option>
                                                </Form.Control>
                                            </Form>
                                            {}
                                        </div>
                                    </div>
                                    <br />
                                    <Table  borderd hover responsive size="sm">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Gender</th>
                                                <th>Latitude</th>
                                                <th>Longitude</th>
                                                <th>Credit Card Number</th>
                                                <th>Credit Card Type</th>
                                                <th>Email</th>
                                                <th>Domain Name</th>
                                                <th>Phone Number</th>
                                                <th>Mac Address</th>
                                                <th>URL</th>
                                                <th>Username</th>
                                                <th>Last Login</th>
                                                <th>Payment Method</th>
                                            </tr>
                                        </thead>

                                        {data.map((data, i) => (
                                            <tbody key={i}>
                                                <tr key={i}>
                                                    <td>{Math.round(i + 1)}</td>
                                                    <td>{data.FirstName}</td>
                                                    <td>{data.LastName}</td>
                                                    <td>{data.Gender}</td>
                                                    <td>{data.Latitude}</td>
                                                    <td>{data.Longitude}</td>
                                                    <td>{data.CreditCardNumber}</td>
                                                    <td>{data.CreditCardType}</td>
                                                    <td>{data.Email}</td>
                                                    <td>{data.DomainName}</td>
                                                    <td>{data.PhoneNumber}</td>
                                                    <td>{data.MacAddress}</td>
                                                    <td>{data.URL}</td>
                                                    <td>{data.UserName}</td>
                                                    <td> {moment(data.LastLogin).format("ll")}</td>
                                                    <td>{data.PaymentMethod}</td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </Table>
                                </Card.Body>
                            </Card>
                            <Pagination
                                total={size}
                                per_page={20}
                                pagination={page => this.getList(page)}
                            />
                        </div>
                    )}
                </Container>
            </div>
        );
    }
}

export default App;
