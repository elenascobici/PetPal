import React from 'react';


function SortAndFilter({ setFilters }) {
    const handleSortChange = (event) => {
        setFilters(filters => ({ ...filters, sort: event.target.value }));
    };

    const handleFilterChange = (event) => {
        setFilters(filters => ({ ...filters, [event.target.name]: event.target.value }));
    };

    return (
        <div className="new-container my-3">
            <div className="row justify-content-center">
                <div className="col-md-3 mb-2">
                    <select className="dropdown-item" onChange={handleSortChange}>
                        <option value="">Sort</option>
                        <option value="name">Sort by Name</option>
                        <option value="age">Sort by Age</option>
                    </select>
                </div>
                <div className="col-md-3 mb-2">
                    <select className="dropdown-item" name="type" onChange={handleFilterChange}>
                        <option value="">Pet Type</option>
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                        <option value="Aquatic">Aquatic</option>
                        <option value="Birds">Birds</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col-md-3 mb-2">
                    <select className="dropdown-item" name="status" onChange={handleFilterChange}>
                        <option value="">Status</option>
                        <option value="Available">Available</option>
                        <option value="Adopted">Adopted</option>
                        <option value="Withdrawn">Withdrawn</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
                <div className="col-md-3 mb-2">
                    <select className="dropdown-item" name="age" onChange={handleFilterChange}>
                        <option value="">Age</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div className="col-md-3 mb-2">
                    <select className="dropdown-item" name="size" onChange={handleFilterChange}>
                        <option value="">All Sizes</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SortAndFilter;
