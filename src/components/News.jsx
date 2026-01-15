import { useState } from "react";

const newsData = [
  {
    title: "New Product Launch: Stylish Eyeglasses",
    description:
      "Discover our latest collection of stylish eyeglasses that combine fashion and function.",
    category: "Product Launches",
    imgSrc: "https://placehold.co/600x400",
  },
  {
    title: "20% Off on All Sunglasses",
    description:
      "Enjoy a 20% discount on all sunglasses this summer. Limited time offer!",
    category: "Discounts and Offers",
    imgSrc: "https://placehold.co/600x400",
  },
  {
    title: "Industry Trends: Optical Market Growth",
    description:
      "The optical market is growing rapidly. Stay updated with the latest industry trends.",
    category: "Industry Trends",
    imgSrc: "https://placehold.co/600x400",
  },
  {
    title: "Eye Health Tips: Glasses vs. Contacts",
    description:
      "Learn the pros and cons of wearing glasses versus contact lenses for better eye health.",
    category: "Eye Health Tips",
    imgSrc: "https://placehold.co/600x400",
  },
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
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Optical Store News
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Latest updates, offers, eye-care tips and industry insights
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* SEARCH & FILTER */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-10 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option>All Categories</option>
              <option>Product Launches</option>
              <option>Discounts and Offers</option>
              <option>Industry Trends</option>
              <option>Eye Health Tips</option>
            </select>
          </div>

          {/* NEWS GRID */}
          {filteredNews.length === 0 ? (
            <p className="text-center text-gray-500 mt-20">
              No news found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <article
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
                >
                  {/* IMAGE */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={news.imgSrc}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500 text-white shadow">
                      {news.category}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {news.description}
                    </p>

                    <button className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default OpticalNews;
