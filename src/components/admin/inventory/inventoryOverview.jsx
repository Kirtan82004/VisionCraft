const products = [
  { name: "Ray-Ban RX1001", stock: 3 },
  { name: "Titan Eye+ T123", stock: 0 },
];

const InventoryOverview = () => (
  <div className="bg-white p-4 rounded-lg shadow w-full">
    <h3 className="text-lg font-semibold mb-4">Inventory Alerts</h3>

    <ul className="space-y-3">
      {products.map((product, idx) => (
        <li
          key={idx}
          className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0 pb-2 border-b last:border-b-0"
        >
          {/* Product Name */}
          <span className="text-gray-800 wrap-break-word text-sm sm:text-base max-w-full">
            {product.name}
          </span>

          {/* Status */}
          <span
            className={`text-xs sm:text-sm font-semibold ${
              product.stock === 0
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {product.stock === 0
              ? "Out of Stock"
              : `Low Stock (${product.stock})`}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default InventoryOverview;
