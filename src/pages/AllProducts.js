import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import AdminProductsTable from "../components/AdminProductCard";
import { FaFilter } from "react-icons/fa";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    let results = [...allProduct];

    // Apply search filter
    if (searchTerm) {
      results = results.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter - THIS WAS MISSING
    if (selectedCategory !== "all") {
      results = results.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "price-high":
        results.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case "price-low":
        results.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      default:
        break;
    }

    setFilteredProducts(results);
  }, [allProduct, searchTerm, selectedCategory, sortOption]);

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(allProduct.map((product) => product.category)),
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white py-2 px-4 flex justify-between items-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Product Management</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="p-4 space-y-4">
        

        {/**upload prouct component */}
        {openUploadProduct && (
          <UploadProduct
            onClose={() => setOpenUploadProduct(false)}
            fetchData={fetchAllProduct}
          />
        )}
        {/* Products Table */}
        <AdminProductsTable
          allProduct={filteredProducts}
          fetchAllProduct={fetchAllProduct}
        />

      </div>
    </div>
  );
};

export default AllProducts;
