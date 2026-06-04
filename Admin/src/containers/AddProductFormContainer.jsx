import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { MoreVertical, ChevronDown } from "lucide-react";
import ReactQuillEditor from "../components/ReactQuillEditor";
import { fetchCategories } from "../services/categoryService";
import {
  createProduct,
  updateProductApi,
  fetchProductById,
} from "../services/productService";

const AddProductFormContainer = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    price: "",
  });

  const [activeSection, setActiveSection] = useState("pricing");

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const product = await fetchProductById(id);

        setFormData({
          name: product?.name || "",
          description: product?.description || "",
          image: product?.image || "",
          category: product?.category?._id || product?.category || "",
          price: product?.price || "",
        });
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // quill editor
  const handleQuillChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value || "",
    }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        price: Number(formData.price) || 0,
        regularPrice: Number(formData.regularPrice) || 0,
        salePrice: Number(formData.salePrice) || 0,
      };

      let res;

      if (isEditMode) {
        res = await updateProductApi(id, payload);
      } else {
        res = await createProduct(payload);
      }

      if (res?._id || res?.success) {
        alert(
          isEditMode
            ? "Product Updated Successfully ✅"
            : "Product Created Successfully ✅",
        );

        if (!isEditMode) {
          setFormData({
            name: "",
            description: "",
            image: "",
            category: "",
            price: "",
            regularPrice: "",
            salePrice: "",
          });
        }
      } else {
        alert(res?.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  const price = Number(formData.price) || 0;
  

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Add a product</h1>
            <p className="mt-2 text-gray-600">
              Create and publish your product
            </p>
          </div>

          <button
            type="submit"
            disabled={
              !formData.name ||
              !formData.description ||
              !formData.category ||
              loading
            }
            className="px-6 py-3 text-white bg-blue-600 rounded-lg disabled:bg-gray-400"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Publishing..."
              : isEditMode
                ? "Update Product"
                : "Publish Product"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">
            {/* TITLE */}
            <div className="p-6 bg-white border rounded-lg">
              <label className="block mb-3 font-bold">Product Title</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="p-6 bg-white border rounded-lg">
              <ReactQuillEditor
                value={formData.description}
                onChange={handleQuillChange}
              />
            </div>

            {/* IMAGE */}
            <div className="p-6 bg-white border rounded-lg">
              <label className="block mb-3 font-bold">Image URL</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full p-3 border rounded-lg"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="preview"
                  className="object-cover w-full h-48 mt-4 border rounded-lg"
                />
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* CATEGORY */}
            <div className="p-6 bg-white border rounded-lg">
              <div className="flex justify-between mb-4">
                <h2 className="font-bold">Category</h2>
                <MoreVertical size={18} />
              </div>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICING */}
            <div className="p-6 bg-white border rounded-lg">
              <button
                type="button"
                onClick={() =>
                  setActiveSection(activeSection === "pricing" ? "" : "pricing")
                }
                className="flex justify-between w-full"
              >
                <span className="font-bold">Pricing</span>
                <ChevronDown
                  className={`transition ${
                    activeSection === "pricing" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeSection === "pricing" && (
                <div className="mt-4 space-y-3">
                  {/* PRICE */}
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Main price"
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductFormContainer;
