import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Download, Plus, ChevronDown } from "lucide-react";
import { fetchCategories } from "../services/categoryService";
import { fetchProducts, deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

const ProductContainer = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 3;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({
          search: searchTerm,
          page: currentPage,
          limit,
        });

        setProducts(data.products || []);
        setTotalPages(data.pages);
        setTotalItems(data.total);
      } catch (err) {
        console.error(err);
      }
    };

    loadProducts();
  }, [searchTerm, currentPage]);

  // 🔹 Load Categories
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data || []);
    };

    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      const data = await fetchProducts({
        search: searchTerm,
        page: currentPage,
        limit,
      });

      // Current page empty aana previous page-ku po
      if (data.products.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        return;
      }

      setProducts(data.products || []);

      setTotalPages(data.pages);
      setTotalItems(data.total);
    } catch (err) {
      console.log(err);
    }
  };

  //const startItem = (currentPage - 1) * limit + 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  return (
    <div className="space-y-3">
      <div>
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Products</h1>

        <div className="mb-4">
          <span>All </span>
          <span className="text-body-tertiary fw-semibold">({totalItems})</span>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search
                size={20}
                className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
              />
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex gap-3">
            <select className="px-4 py-2.5 border border-gray-300 rounded-lg">
              <option value="all">Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Add Product Button */}
          <Link
            to="/add-products"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Product</span>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer accent-blue-600"
                />
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase transition-colors hover:text-gray-600">
                  PRODUCT NAME
                  <ChevronDown size={10} />
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase transition-colors hover:text-gray-600">
                  Price
                  <ChevronDown size={10} />
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase transition-colors hover:text-gray-600">
                  Category
                  <ChevronDown size={10} />
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase transition-colors hover:text-gray-600">
                  PUBLISHED ON
                  <ChevronDown size={10} />
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="transition-colors duration-150 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer accent-blue-600"
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 inline-block w-10 h-10 border rounded-md border-translucent">
                        <img
                          className="object-cover w-10 h-10"
                          src={
                            product.image ||
                            "https://www.simpleimageconvert.com/images/icons/photo.png"
                          }
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://www.simpleimageconvert.com/images/icons/photo.png";
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ₹ {product.price}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      {product.category?.name || "No Category"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="ml-3 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          Showing {startItem} to {endItem} Items of {totalItems}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-2 border rounded disabled:opacity-50"
          >
            ❮
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "border"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-2 border rounded disabled:opacity-50"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
