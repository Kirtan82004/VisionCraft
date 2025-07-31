const ShoppingCartIcon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6h15l1 12H7L6 6z" />
      <circle cx="9" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </svg>
  );
};

export default ShoppingCartIcon;