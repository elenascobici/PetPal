import React from 'react';

function SearchBar({ setSearchTerm }) {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <>
            <form className="formInputs" id="search">
                <div className="form-row d-flex justify-content-center" id="searchBar">
                    <div className="form-group col d-flex justify-content-center align-center">
                        <input 
                            type="search" 
                            className="form-control" 
                            placeholder="Search for pets ..." 
                            onChange={handleSearchChange} 
                        />
                        <a className="btn border-0 position-absolute" id="searchButton" >
                            <i className="bi bi-search" id="searchIcon"></i>
                        </a>
                    </div>
                </div>
            </form>
            <form className="formInputs" id="searchSmall">
                <div className="form-row d-flex justify-content-center" id="searchBar">
                    <div className="form-group col d-flex justify-content-center align-center">
                        <input className="form-control" type="search" placeholder="Search" onChange={handleSearchChange} />
                        <button className="btn border-0 position-absolute" id="searchButton" type="submit">
                            <i className="bi bi-search" id="searchIcon"></i>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SearchBar;
