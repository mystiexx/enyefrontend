import React, { Component } from "react";
import { Form } from "react-bootstrap";

class SearchComponent extends Component {
    render() {
        const { search, filter, content, payment } = this.props;
        return (
            <div className="d-flex justify-content-between">
                <div>
                    <Form inline>
                        <Form.Label>Search:</Form.Label>
                        <Form.Control onChange={search} type="text" className="ml-2" />
                    </Form>
                </div>

                <div className="d-flex justify-content-between">
                    <Form inline>
                        <Form.Label>Filter By:</Form.Label>
                        <Form.Control as="select" name="role" onChange={filter}>
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

                    <Form inline className="ml-2">
                        <Form.Label>Payment Method:</Form.Label>
                        <Form.Control as="select" name="role" onChange={payment}>
                            {content.map((data, i) => (
                                <option value={data.PaymentMethod} name="pay">
                                    {data.PaymentMethod}
                                </option>
                            ))}
                        </Form.Control>
                    </Form>
                    {}
                </div>
            </div>
        );
    }
}

export default SearchComponent;
