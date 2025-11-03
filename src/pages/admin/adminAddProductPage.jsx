import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload.js";

export default function AdminAddProductPage() {
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [labeledPrice, setLabeledPrice] = useState(0);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [stock, setStock] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  async function addProduct() {
    const token = localStorage.getItem("token");
    if (token === null) {
      toast.error("Please login as admin to add products.");
      navigate("/login");
      return;
    }
    console.log(files);

    const imagesPromises = [];

    for (let i = 0; i < files.length; i++) {
      imagesPromises.push(uploadFile(files[i]));
    }

    const images = await Promise.all(imagesPromises);
    console.log(images);

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
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/products/",
        {
          productID: productID,
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
      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error("Error adding product:", error);
    }
  }

  return (
    <div className=" w-full  flex justify-center p-[50px]    p-[50px] ">
      <div className=" w-[1000px] bg-accent/70 p-[40px] rounded-2xl">
        <h1 className=" text-xl  mb-[20px] text-primary flex items-center gap-[10px]  ">
          <AiOutlineProduct />
          Add New Product
        </h1>
        <div className=" w-full bg-white p-[20px] flex flex-wrap justify-between rounded-xl shadow-2xl ">
          <div className=" my-[10px] w-[40%]">
            <label>Product ID</label>
            <input
              type="text"
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              value={productID}
              onChange={(e) => {
                setProductID(e.target.value);
              }}
            />
            <p className=" text-sm text-gray-500 w-full text-right ">
              Provide a unique product ID
            </p>
          </div>
          <div className=" my-[10px] w-[40%]">
            <label>Name</label>
            <input
              type="text"
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className=" my-[10px] w-full ">
            <label>Alternative Names</label>
            <input
              type="text"
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              value={altNames}
              onChange={(e) => {
                setAltNames(e.target.value);
              }}
            />
            <p className=" text-sm text-gray-500 w-full text-right ">
              Separate multiple names with commas
            </p>
          </div>
          <div className=" my-[10px] w-full ">
            <label>Description</label>
            <textarea
              className=" w-full h-[100px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px] py-[10px]  border border-accent shadow-2xl "
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className=" my-[10px] w-[40%]">
            <label>Price</label>
            <input
              type="number"
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className=" my-[10px] w-[40%]">
            <label>labeled Price</label>
            <input
              type="number"
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              value={labeledPrice}
              onChange={(e) => {
                setLabeledPrice(e.target.value);
              }}
            />
          </div>
          <div className=" my-[10px] w-full ">
            <label>Images</label>
            <input
              type="file"
              multiple={true}
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
          </div>
          <div className=" my-[10px] flex flex-col w-[30%] ">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
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
          <div className=" my-[10px] w-[30%] ">
            <label>Brand</label>
            <input
              type="text"
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div className=" my-[10px] w-[30%]">
            <label>Model</label>
            <input
              type="text"
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />
          </div>
          <div className=" my-[10px] w-[40%]">
            <label>Stock</label>
            <input
              type="text"
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
            />
          </div>
          <div className=" my-[10px] flex flex-col w-[40%]  ">
            <label>Availability</label>
            <select
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value)}
              className=" w-full h-[40px] border-[2px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  border border-accent shadow-2xl "
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <Link
            to="/admin/products"
            className="w-[49%] h-[50px] bg-red-500 text-white font-bold  rounded-2xl flex justify-center items-center hover:bg-red-700 border-[2px]  mt-[20px]"
          >
            Cancel
          </Link>
          <button
            onClick={addProduct}
            className=" w-[49%] h-[50px] border-[2px] bg-accent rounded-2xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-accent px-[20px]  mt-[20px]  border hover:bg-transparent hover:text-accent border-accent shadow-2xl "
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
