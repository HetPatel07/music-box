import React from "react";
import Button from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';

const SearchBar = (props) => {  
  return ( 
    <Form className="d-flex w-50 m-auto mt-5">
    <Form.Control
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
      onChange={props.onSearchChange}      
    />
    <Button type="button" onClick={props.onSearchClick}>Search</Button>
  </Form>
  );
};

export default SearchBar;
