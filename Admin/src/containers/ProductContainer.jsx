import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Download, Plus, ChevronDown } from "lucide-react";
import { fetchCategories } from "../services/categoryService";
import { fetchProducts, deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ProductContainer = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const limit = 3;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts({
          search: searchTerm,
          category: selectedCategory === "all" ? "" : selectedCategory,
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
  }, [searchTerm, selectedCategory, currentPage]);

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

  const handleExport = () => {
    if (products.length === 0) {
      alert("No products found");
      return;
    }

    const exportData = products.map((product) => ({
      Name: product.name,
      Price: product.price,
      Category: product.category?.name || "",
      Brand: product.brand || "",
      Stock: product.stock,
      Discount: product.discount || 0,
      Status: product.status,
      Featured: product.featured ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Products.xlsx");
  };

  const filterCategory = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  //const startItem = (currentPage - 1) * limit + 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  return (
    <div className="space-y-3">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Products</h1>

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
            <select
              value={selectedCategory}
              onChange={filterCategory}
              className="px-4 py-2.5 border border-gray-300 rounded-lg"
            >
              <option value="all">Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
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
      <div className="w-full overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full border-collapse" style={{ minWidth: "900px" }}>
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded cursor-pointer accent-blue-600"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Product name <ChevronDown size={10} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Price <ChevronDown size={10} />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-left sm:table-cell">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Category <ChevronDown size={10} />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-left sm:table-cell">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Brand <ChevronDown size={10} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Stock <ChevronDown size={10} />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-left md:table-cell">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Discount <ChevronDown size={10} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Final price <ChevronDown size={10} />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-left md:table-cell">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Status <ChevronDown size={10} />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-left md:table-cell">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Featured <ChevronDown size={10} />
                </button>
              </th>
              <th className="hidden px-4 py-3 text-left md:table-cell">
                <button className="flex items-center gap-1 text-xs font-medium tracking-wider text-gray-500 uppercase hover:text-gray-800">
                  Published on <ChevronDown size={10} />
                </button>
              </th>
              <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="px-6 py-10 text-sm text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const finalPrice =
                  product.finalPrice ??
                  product.price -
                    (product.price * (product.discount || 0)) / 100;

                return (
                  <tr
                    key={product._id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded cursor-pointer accent-blue-600"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center min-w-0 gap-3">
                        <img
                          className="flex-shrink-0 object-cover bg-gray-100 rounded w-9 h-9"
                          src={
                            product.image ||
                            "https://placehold.co/36x36/e2e8f0/94a3b8?text=?"
                          }
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/36x36/e2e8f0/94a3b8?text=?";
                          }}
                        />
                        <span className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>

                    <td className="hidden px-4 py-3 whitespace-nowrap sm:table-cell">
                      <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {product.category?.name || "No category"}
                      </span>
                    </td>

                    <td className="hidden px-4 py-3 text-sm text-gray-900 whitespace-nowrap sm:table-cell">
                      {product.brand || "-"}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          product.stock > 10
                            ? "text-green-600"
                            : product.stock > 0
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {product.stock || 0}
                      </span>
                    </td>

                    <td className="hidden px-4 py-3 whitespace-nowrap md:table-cell">
                      {product.discount ? (
                        <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">
                          {product.discount}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* ✅ Final Price BEFORE Status/Featured */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-semibold text-green-600">
                        ₹{Math.round(finalPrice).toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td className="hidden px-4 py-3 whitespace-nowrap md:table-cell">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.status || "draft"}
                      </span>
                    </td>

                    <td className="hidden px-4 py-3 whitespace-nowrap md:table-cell">
                      {product.featured ? (
                        <span className="px-2 py-0.5 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
                          Featured
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    <td className="hidden px-4 py-3 text-sm text-gray-500 whitespace-nowrap md:table-cell">
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/edit-product/${product._id}`)
                          }
                          className="px-2 py-1 text-sm font-medium text-indigo-600 rounded hover:text-indigo-900 hover:bg-indigo-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-2 py-1 text-sm font-medium text-red-600 rounded hover:text-red-900 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
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
