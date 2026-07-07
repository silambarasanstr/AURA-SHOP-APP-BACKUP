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
    images: [],

    category: "",

    price: "",
    discount: "",

    stock: "",
    sku: "",
    brand: "",

    featured: false,
    status: "active",
  });

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
          images: product?.images || [],

          category: product?.category?._id || product?.category || "",

          price: product?.price || "",
          discount: product?.discount || "",

          stock: product?.stock || "",
          sku: product?.sku || "",
          brand: product?.brand || "",

          featured: product?.featured || false,
          status: product?.status || "active",
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
        stock: Number(formData.stock) || 0,
        discount: Number(formData.discount) || 0,

        finalPrice:
          Number(formData.price || 0) -
          (Number(formData.price || 0) * Number(formData.discount || 0)) / 100,
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
            : "Product Created Successfully ✅"
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

    setFormData({
      name: "",
      description: "",
      image: "",
      images: [],

      category: "",

      price: "",
      discount: "",

      stock: "",
      sku: "",
      brand: "",

      featured: false,
      status: "active",
    });
  };

  const price = Number(formData.price) || 0;
  const discount = Number(formData.discount) || 0;
  const finalPrice = price - (price * discount) / 100;

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Add a product
            </h1>
            <p className="mb-6 text-gray-500">
              Create and publish your product 👋
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
            className="px-6 py-3 text-white bg-blue-600 rounded cursor-pointer disabled:bg-gray-400"
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
            <div className="p-6 bg-white border rounded">
              <label className="block mb-3 font-bold">Product Title</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="w-full p-3 border rounded"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="p-6 bg-white border rounded">
              <ReactQuillEditor
                value={formData.description}
                onChange={handleQuillChange}
              />
            </div>

            {/* IMAGE */}
            <div className="p-6 bg-white border rounded">
              <label className="block mb-3 font-bold">Image URL</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full p-3 border rounded"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="preview"
                  className="object-cover w-full h-48 mt-4 border rounded"
                />
              )}
            </div>
            <div className="p-6 bg-white border rounded">
              <label className="block mb-3 font-bold">Gallery Images</label>

              <textarea
                rows={5}
                placeholder="One image URL per line"
                defaultValue={formData.images.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: e.target.value.split("\n").filter(Boolean),
                  })
                }
                className="w-full p-3 border rounded"
              />

              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {formData.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      className="object-cover w-full h-20 rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* CATEGORY */}
            <div className="p-6 bg-white border rounded">
              <div className="flex justify-between mb-4">
                <h2 className="font-bold">Category</h2>
                <MoreVertical size={18} />
              </div>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-6 bg-white border rounded">
              <h2 className="mb-4 font-bold">Product Information</h2>

              <div className="space-y-3">
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Brand Name"
                  className="w-full p-3 border rounded"
                />

                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  placeholder="SKU"
                  className="w-full p-3 border rounded"
                />

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Available Stock"
                  className="w-full p-3 border rounded"
                />
              </div>
            </div>

            {/* PRICING */}
            <div className="p-6 bg-white border rounded">
              <div className="mt-4 space-y-4">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Product Price"
                  className="w-full p-3 border rounded"
                />

                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Discount %"
                  className="w-full p-3 border rounded"
                />

                <div className="p-4 rounded-lg bg-green-50">
                  <p className="text-sm text-gray-600">Final Price</p>

                  <p className="text-2xl font-bold text-green-600">
                    ₹{finalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Add Product Options Card */}
            <div className="p-6 bg-white border rounded">
              <h2 className="mb-4 font-bold">Product Options</h2>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featured: e.target.checked,
                    })
                  }
                />
                Featured Product
              </label>
            </div>

            <div className="p-6 bg-white border rounded">
              <h2 className="mb-4 font-bold">Product Status</h2>

              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
              >
                <option value="active">Active</option>

                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductFormContainer;
