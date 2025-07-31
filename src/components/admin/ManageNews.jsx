import { useState } from "react";

export default function ManageNews() {
  const [newsList, setNewsList] = useState([
    {
      title: "New Product Launch: Stylish Eyeglasses",
      category: "Product Launches",
      content: "Discover our latest collection of stylish eyeglasses that combine fashion and function.",
      image: "https://placehold.co/100x100",
    },
    {
      title: "20% Off on All Sunglasses",
      category: "Discounts and Offers",
      content: "Enjoy a 20% discount on all sunglasses this summer. Limited time offer!",
      image: "https://placehold.co/100x100",
    },
    {
      title: "Industry Trends: Optical Market Growth",
      category: "Industry Trends",
      content: "The optical market is growing rapidly. Stay updated with the latest industry trends.",
      image: "https://placehold.co/100x100",
    },
  ]);

  return (
    <main className="container mx-auto p-4">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Manage News</h2>
        <div className="bg-white p-4 rounded shadow">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">News Title</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter news title" type="text" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">News Category</label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>Product Launches</option>
                <option>Discounts and Offers</option>
                <option>Industry Trends</option>
                <option>Eye Health Tips</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">News Content</label>
              <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter news content" rows="4"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">News Image URL</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter news image URL" type="text" />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add News</button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Update News</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Delete News</button>
            </div>
          </form>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">News List</h2>
        <div className="bg-white p-4 rounded shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">News Title</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Category</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Content</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Image</th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((news, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">{news.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{news.category}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{news.content}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <img className="w-16 h-16 object-cover rounded" src={news.image} alt={news.title} />
                  </td>
                  <td className="py-2 px-4 flex space-x-2 border-b border-gray-200">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}