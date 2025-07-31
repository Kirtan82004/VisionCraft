import { useState } from "react";

const ProductManager = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Stylish Eyeglasses", price: 100, description: "A stylish pair of eyeglasses.", image: "https://placehold.co/100x100" },
    { id: 2, name: "Sunglasses", price: 50, description: "A pair of stylish sunglasses.", image: "https://placehold.co/100x100" },
    { id: 3, name: "Contact Lenses", price: 30, description: "A pack of contact lenses.", image: "https://placehold.co/100x100" }
  ]);

  const [formData, setFormData] = useState({ name: "", price: "", description: "", image: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  }

  const addProduct = () => {
    setProducts([...products, { id: Date.now(), ...formData }]);
    setFormData({ name: "", price: "", description: "", image: "" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <main className="container mx-auto p-4">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Products</h2>
        <div className="bg-white p-4 rounded shadow">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Product Name</label>
              <input className="shadow border rounded w-full py-2 px-3" id="name" value={formData.name} onChange={handleChange} placeholder="Enter product name" type="text" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Brand Name</label>
              <input className="shadow border rounded w-full py-2 px-3" id="name" value={formData.name} onChange={handleChange} placeholder="Enter Brand Name" type="text" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Product Price</label>
              <input className="shadow border rounded w-full py-2 px-3" id="price" value={formData.price} onChange={handleChange} placeholder="Enter product price" type="text" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Product Description</label>
              <textarea className="shadow border rounded w-full py-2 px-3" id="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" rows="4" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Upload Product Image</label>
              <input className="shadow border rounded w-full py-2 px-3" id="image" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addProduct} type="button">Add Product</button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" type="reset">Update</button>
            
        
          </form>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        <div className="bg-white p-4 rounded shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2">Product Name</th>
                <th className="py-2 px-4 border-b-2">Price</th>
                <th className="py-2 px-4 border-b-2">Description</th>
                <th className="py-2 px-4 border-b-2">Image</th>
                <th className="py-2 px-4 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4 border-b mr-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => deleteProduct(product.id)}>Delete</button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ProductManager;