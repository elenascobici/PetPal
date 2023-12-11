import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function SortAndFilter({ setFilters }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleSortChange = (value) => {
        setFilters(filters => ({ ...filters, sort: value }));
    };

    // const handleFilterChange = (name, value) => {
    //     setFilters(filters => ({ ...filters, [name]: value }));
    // };

    const handleTypeChange = (value) => {
        setFilters(filters => ({ ...filters, "type": value }));
        searchParams.append('type', value);
        setSearchParams(searchParams.toString());
    };

    const handleStatusChange = (value) => {
        setFilters(filters => ({ ...filters, "status": value }));
        searchParams.append('status', value);
        setSearchParams(searchParams.toString());
    };

    const handleAgeChange = (value) => {
        setFilters(filters => ({ ...filters, "age": value }));
        searchParams.append('age', value);
        setSearchParams(searchParams.toString());
    };
    const handleSizeChange = (value) => {
        setFilters(filters => ({ ...filters, "size": value }));
        searchParams.append('size', value);
        setSearchParams(searchParams.toString());
    };

    return (
        <div className="new-container my-3">
        {/* <Row> */}
        {/* <Col xs={12} sm={2}> */}
            {/* <div className="row justify-content-center"> */}
                {/* <div className="col-md-3 mb-2"> */}
                <div className="grid filter-grid">
                    <Dropdown className="dropdown-space filter-grid-space1" onSelect={handleSortChange}>
                    <Dropdown.Toggle className="custom-color" variant="info" id="dropdown-basic">
                        Sort
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="">Default</Dropdown.Item>
                        <Dropdown.Item eventKey="name">Sort by Name</Dropdown.Item>
                        <Dropdown.Item eventKey="age">Sort by Age</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
        {/* </Col> */}
                {/* </div>
                <div className="col-md-3 mb-2"> */}
                {/* <Col xs={12} sm={2}> */}
                    <Dropdown className="dropdown-space" onSelect={handleTypeChange}>
                    <Dropdown.Toggle className="custom-color" variant="info" id="dropdown-basic">
                        Pet Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="">All</Dropdown.Item>
                        <Dropdown.Item eventKey="Cat">Cat</Dropdown.Item>
                        <Dropdown.Item eventKey="Dog">Dog</Dropdown.Item>
                        <Dropdown.Item eventKey="Aquatic">Aquatic</Dropdown.Item>
                        <Dropdown.Item eventKey="Birds">Birds</Dropdown.Item>
                        <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    {/* </Col> */}
                {/* </div>
                <div className="col-md-3 mb-2"> */}
                {/* <Col xs={12} sm={2}> */}
                    <Dropdown className="dropdown-space" onSelect={handleStatusChange}>
                    <Dropdown.Toggle className="custom-color" variant="info" id="dropdown-basic">
                        Status
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Available">Available</Dropdown.Item>
                        <Dropdown.Item eventKey="Adopted">Adopted</Dropdown.Item>
                        <Dropdown.Item eventKey="Withdrawn">Withdrawn</Dropdown.Item>
                        <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    {/* </Col> */}
                {/* </div>
                <div className="col-md-3 mb-2"> */}
                {/* <Col xs={12} sm={2}> */}
                    <Dropdown className="dropdown-space filter-grid-space2" onSelect={handleAgeChange}>
                    <Dropdown.Toggle className="custom-color" variant="info" id="dropdown-basic">
                        Age
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="">All</Dropdown.Item>
                        <Dropdown.Item eventKey="1">1</Dropdown.Item>
                        <Dropdown.Item eventKey="2">2</Dropdown.Item>
                        <Dropdown.Item eventKey="3">3</Dropdown.Item>
                        <Dropdown.Item eventKey="4">4</Dropdown.Item>
                        <Dropdown.Item eventKey="5">5</Dropdown.Item>
                        <Dropdown.Item eventKey="6">6</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    {/* </Col> */}
                {/* </div>
                <div className="col-md-3 mb-2"> */}
                {/* <Col xs={12} sm={2}> */}
                    <Dropdown className="filter-grid-last" onSelect={handleSizeChange}>
                    <Dropdown.Toggle className="custom-color" variant="info" id="dropdown-basic">
                        Size
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="">All</Dropdown.Item>
                        <Dropdown.Item eventKey="Small">Small</Dropdown.Item>
                        <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
                        <Dropdown.Item eventKey="Large">Large</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    {/* </Col> */}
                {/* </div> */}
            {/* </div> */}
            {/* </Row> */}
            </div>
        </div>
    );
}

export default SortAndFilter;
