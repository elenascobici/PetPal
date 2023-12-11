// PetSearch.js
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PetCard from './PetCard';
import SortAndFilter from './SortAndFilter';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import "./style.css";

function PetSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [pets, setPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({}); 
  
    const itemsPerPage = 8;
  
    useEffect(() => {
        console.log("Running useEffect");
        const type = searchParams.get('type');
        setFilters({
          type: type || '',
        });
      }, []);
  
    const query = useMemo(() => ({
      page: parseInt(searchParams.get("page") ?? 1),
      search: searchParams.get("search") ?? ''
    }), [searchParams]);
  
    useEffect(() => {
      const fetchData = async () => {
        const param = new URLSearchParams(query);
        const token = localStorage.getItem('access_token');
        const url = new URL(`http://localhost:8000/pet/search/?${param}`);
  
        Object.keys(filters).forEach(key => {
          if (filters[key]) {
            url.searchParams.append(key, filters[key]);
          }
        });
  
        if (searchTerm) {
          url.searchParams.append('name', searchTerm);
        }
  
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          const data = await response.json();
          console.log("Pagination data from backend:", data);
  
          setPets(data.results);
  
          const totalItems = data.count;
          setTotalPages(Math.ceil(totalItems / itemsPerPage));
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, [currentPage, filters, searchTerm, query]);
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
    
    return (
        <div className="main px-6 pt-6">
            <div id="title">Pet Listings</div>
            <div id="subtitle">Click on a pet to edit</div>

            <SearchBar set={setSearchParams} val={query.search} />
            <SortAndFilter setFilters={setFilters} />
            

            <div className="grid petGrid">
                {pets.map(pet => (
                    <div className="grid-item grid-item-pet" key={pet.id}>
                        <PetCard key={pet.id} pet={pet} />
                    </div>
                ))}
            </div>

            {/* <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            /> */}

            <div class="col-12">
                <p className="pageInfo">
                { query.page < totalPages
                ? <button className="page-btn" onClick={() => setSearchParams({...query, page: query.page + 1})}>Next</button>
                : <></> }
                
                { query.page > 1 
                ? <button className="page-btn" onClick={() => setSearchParams({...query, page: query.page - 1})}>Previous</button>
                : <></> }
                </p>
                {totalPages !== 0 && <p>Page {query.page} out of {totalPages}</p>}
            </div>
            
            
        </div>
        
    );
}
    


export default PetSearch;