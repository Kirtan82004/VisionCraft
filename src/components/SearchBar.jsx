import React from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery, filterProducts } from "../store/filterSlice"; // Redux actions

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useSelector((state) => state.filter.searchQuery);

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));

    // Predefined navigation links
    const navigationRoutes = ["home", "about", "products", "cart", "profile","faq","terms","privacy-policy","news"];
    
    if (navigationRoutes.includes(query.toLowerCase())) {
      navigate(`/${query.toLowerCase()}`); // Navigate to the page
    } else {
      dispatch(filterProducts(query)); // Filter products based on name, category, or brand
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search eyewear, lenses, etc."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
    </div>
  );
};

export default SearchBar;
