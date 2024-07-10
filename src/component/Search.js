import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import "./Search.css"

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };
  return (
    <div style={{ marginBottom: "1rem"}}>
      <Form
        onSubmit={handleSearch}
        style={{ width: "300px", marginRight: "10px", display:"flex" }}
      >
        <FormControl
          type="text"
          placeholder="Search city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="dark" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default Search;
