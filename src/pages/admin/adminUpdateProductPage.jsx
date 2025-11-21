import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload.js";
import { useLocation } from "react-router-dom";

export default function AdminUpdateProductPage() {
  const location = useLocation();

  const [productID, setProductID] = useState(location.state.product.productID);
  const [name, setName] = useState(location.state.product.name);
  const [altNames, setAltNames] = useState(
    location.state.product.altNames.join(",")
  );
  const [description, setDescription] = useState(
    location.state.product.description
  );
  const [price, setPrice] = useState(location.state.product.price);
  const [labeledPrice, setLabeledPrice] = useState(
    location.state.product.labeledPrice
  );
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState(location.state.product.category);
  const [brand, setBrand] = useState(location.state.product.brand);
  const [model, setModel] = useState(location.state.product.model);
  const [stock, setStock] = useState(location.state.product.stock);
  const [isAvailable, setIsAvailable] = useState(
    location.state.product.isAvailable
  );
  const navigate = useNavigate();

  if (!location.state) {
    window.location.href = "/admin/products";
  }

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.error("Please login as admin to add products.");
      navigate("/login");
      return;
    }

    const imagesPromises = [];

    for (let i = 0; i < files.length; i++) {
      imagesPromises.push(uploadFile(files[i]));
    }

    let images = await Promise.all(imagesPromises).catch((err) => {
      toast.error("Failed to upload images. Please try again.");
      console.error("Error uploading images:", err);
      return;
    });

    if (images.length == 0) {
      images = location.state.product.images;
    }

    if (
      productID == "" ||
      name == "" ||
      description == "" ||
      category == "" ||
      brand == "" ||
      model == ""
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const altNamesArray = altNames.split(",");
      const imagesArray = images;
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/products/" + productID,
        {
          name: name,
          altNames: altNamesArray,
          description: description,
          price: price,
          labeledPrice: labeledPrice,
          images: imagesArray,
          category: category,
          brand: brand,
          model: model,
          stock: stock,
          isAvailable: isAvailable,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
      console.error("Error updating product:", error);
    }
  }

  return (
    <div className=" w-full  flex justify-center p-[50px]">
      <div className=" w-[1000px] bg-accent/70 p-10 rounded-2xl">
        <h1 className=" text-xl  mb-5 text-primary flex items-center gap-2.5  ">
          <AiOutlineProduct />
          Update Product
        </h1>
        <div className=" w-full bg-white p-5 flex flex-wrap justify-between rounded-xl shadow-2xl ">
          <div className=" my-2.5 w-[40%]">
            <label>Product ID</label>
            <input
              disabled
              type="text"
              className=" w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5 border-2 border-accent shadow-2xl "
              value={productID}
              onChange={(e) => {
                setProductID(e.target.value);
              }}
            />
          </div>
          <div className=" my-2.5 w-[40%]">
            <label>Name</label>
            <input
              type="text"
              className=" w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5 border-2 border-accent shadow-2xl "
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className=" my-2.5 w-full ">
            <label>Alternative Names</label>
            <input
              type="text"
              className=" w-full h-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5 border-2 border-accent shadow-2xl "
              value={altNames}
              onChange={(e) => {
                setAltNames(e.target.value);
              }}
            />
            <p className=" text-sm text-gray-500 w-full text-right ">
              Separate multiple names with commas
            </p>
          </div>
          <div className=" my-2.5 w-full ">
            <label>Description</label>
            <textarea
              className=" w-full h-[100px] border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5 py-2.5 border-accent shadow-2xl "
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className=" my-2.5 w-[40%]">
            <label>Price</label>
            <input
              type="number"
              className=" w-full h-10 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5 border-accent shadow-2xl "
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className=" my-2.5 w-[40%]">
            <label>Labeled Price</label>
            <input
              type="number"
              className=" w-full h-10 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5 border-accent shadow-2xl "
              value={labeledPrice}
              onChange={(e) => {
                setLabeledPrice(e.target.value);
              }}
            />
          </div>
          <div className=" my-2.5 w-full ">
            <label>Images</label>
            <input
              type="file"
              multiple={true}
              className=" w-full h-10 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5 border-accent shadow-2xl "
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
          </div>
          <div className=" my-2.5 flex flex-col w-[30%] ">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" w-full h-10 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5 border-accent shadow-2xl "
            >
              <option value="CPU">CPU</option>
              <option value="Graphic Card">Graphic Card</option>
              <option value="Motherboard">Motherboard</option>
              <option value="Power Supply">Power Supply</option>
              <option value="RAM">RAM</option>
              <option value="Storage">Storage</option>
              <option value="Cooling">Cooling</option>
              <option value="Computer Cases">Computer Cases</option>
              <option value="Mouse and Keyboards">Mouse and Keyboards</option>
              <option value="Monitors">Monitors</option>
              <option value="Accessories">Accessories</option>
              <option value="Laptops">Laptops</option>
              <option value="Computer">Computer</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className=" my-2.5 w-[30%] ">
            <label>Brand</label>
            <input
              type="text"
              className=" w-full h-10 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5   border-accent shadow-2xl "
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div className=" my-2.5 w-[30%]">
            <label>Model</label>
            <input
              type="text"
              className=" w-full h-10 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5   border-accent shadow-2xl "
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
          </div>
          <div className=" my-2.5 w-[40%]">
            <label>Stock</label>
            <input
              type="text"
              className=" w-full h-10 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5   border-accent shadow-2xl "
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
            />
          </div>
          <div className=" my-2.5 flex flex-col w-[40%]  ">
            <label>Availability</label>
            <select
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value)}
              className=" w-full h-10 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-5  border-accent shadow-2xl "
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <Link
            to="/admin/products"
            className="w-[49%] h-12 bg-red-500 text-white font-bold  rounded-2xl flex justify-center items-center hover:bg-red-700 border-2  mt-5"
          >
            Cancel
          </Link>
          <button
            onClick={updateProduct}
            className=" w-[49%] h-12 border-2 bg-accent rounded-2xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-accent px-5  mt-5   hover:bg-transparent hover:text-accent border-accent shadow-2xl "
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
