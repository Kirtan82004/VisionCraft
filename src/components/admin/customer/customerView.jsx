import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerById } from "../../../store/admin/customerSlice";

const CustomerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedCustomer: customer, loading, error } = useSelector(
    (state) => state.customers
  );

  /* ================= FETCH CUSTOMER ================= */
  useEffect(() => {
    if(!customer){
       dispatch(fetchCustomerById(id));
    }
     
    
  }, [dispatch, id]);

  /* ================= STATES ================= */
  if (loading) {
    return <div className="p-6 text-gray-600">Loading customer...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!customer) {
    return <div className="p-6 text-red-500">Customer not found</div>;
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Customer Details
        </h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row gap-6">
        {/* Avatar */}
        <div className="flex justify-center sm:justify-start">
          {customer.image ? (
            <img
              src={customer.image}
              alt={customer.fullName}
              className="w-32 h-32 rounded-full object-cover border"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Full Name" value={customer.fullName} />
          <Info label="Email" value={customer.email} />
          <Info label="Phone" value={customer.phoneNo || "—"} />
          <Info label="Role" value={customer.role} />
          <Info label="Total Orders" value={customer.totalOrders ?? 0} />
          <Info
            label="Joined On"
            value={
              customer.createdAt
                ? new Date(customer.createdAt).toLocaleDateString("en-GB")
                : "—"
            }
          />

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Address</p>
            <p className="text-gray-800">
              {customer.address || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE INFO ================= */
const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default CustomerView;
