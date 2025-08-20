
import { useState } from "react";

const newsData = [
  {
    title: "New Product Launch: Stylish Eyeglasses",
    description: "Discover our latest collection of stylish eyeglasses that combine fashion and function.",
    category: "Product Launches",
    imgSrc: "https://placehold.co/600x400"
  },
  {
    title: "20% Off on All Sunglasses",
    description: "Enjoy a 20% discount on all sunglasses this summer. Limited time offer!",
    category: "Discounts and Offers",
    imgSrc: "https://placehold.co/600x400"
  },
  {
    title: "Industry Trends: Optical Market Growth",
    description: "The optical market is growing rapidly. Stay updated with the latest industry trends.",
    category: "Industry Trends",
    imgSrc: "https://placehold.co/600x400"
  },
  {
    title: "Eye Health Tips: Glasses vs. Contacts",
    description: "Learn the pros and cons of wearing glasses versus contact lenses for better eye health.",
    category: "Eye Health Tips",
    imgSrc: "https://placehold.co/600x400"
  }
];

const OpticalNews = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Categories");

  const filteredNews = newsData.filter(
    (news) =>
      (filter === "All Categories" || news.category === filter) &&
      news.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="px-4 py-10 max-w-7xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center sm:text-left">
          📰 Optical Store News
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>All Categories</option>
            <option>Product Launches</option>
            <option>Discounts and Offers</option>
            <option>Industry Trends</option>
            <option>Eye Health Tips</option>
          </select>
        </div>

        {filteredNews.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No news found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={news.imgSrc}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="inline-block text-xs bg-blue-100 text-blue-600 font-semibold rounded-full px-3 py-1 mb-2">
                    {news.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{news.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default OpticalNews;
