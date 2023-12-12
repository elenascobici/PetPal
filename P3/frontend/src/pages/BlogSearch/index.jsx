import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import SearchBar from './SearchBar';
import BlogCard from './BlogCard';
import Pagination from './Pagination';
import './style.css'; 

const BlogSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") ?? 1));
    const [totalPages, setTotalPages] = useState(0);

    console.log(currentPage, totalPages);

    const itemsPerPage = 10;

    useEffect(() => {
        const newPage = parseInt(searchParams.get("page") ?? 1);
        setCurrentPage(newPage);
    }, [searchParams]);

    const query = useMemo(() => ({
        page: parseInt(searchParams.get("page") ?? 1),
        search: searchParams.get("search") ?? ''
    }), [searchParams]);



    useEffect(() => {
        const param = new URLSearchParams(query);
        const authToken = localStorage.getItem('access_token'); 

        const fetchBlogs = async () => {
        const url = new URL('http://localhost:8000/blogs/list');
        url.searchParams.append('page', currentPage);
        if (searchTerm) {
            url.searchParams.append('search', searchTerm);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`, 
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data.results);
        
        const totalItems = data.count;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
    };

        fetchBlogs().catch(error => {
            console.error('Error fetching blogs:', error);
        });
    }, [currentPage, searchTerm]);

    const handlePageChange = (newPage) => {
        setCurrentPage({ page: newPage, search: searchTerm });
    };

    return (
        <div className="page-container-blog">
            <h1 id="title-app"> Pet Blogs </h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="blog-list">
                {blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
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
};

export default BlogSearch;
