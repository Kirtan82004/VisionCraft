import { useState } from "react";
import { FaTools, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Eye Testing", price: "₹200", description: "Complete vision and eye health test." },
    { id: 2, name: "Frame Repair", price: "₹150", description: "Fixing and adjustment of frames." },
    { id: 3, name: "Lens Replacement", price: "₹600", description: "Changing damaged or old lenses." },
    { id: 4, name: "Contact Lens Fitting", price: "₹500", description: "Lens fitting with expert guidance." }
  ]);

  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: ""
  });

  const addService = () => {
    if (!newService.name || !newService.price) return alert("Please fill all fields!");

    setServices([
      ...services,
      { id: Date.now(), ...newService }
    ]);

    setNewService({ name: "", price: "", description: "" });
  };

  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <FaTools className="text-purple-600 text-3xl" />
        <h2 className="text-2xl font-bold text-gray-800">Services</h2>
      </div>

      {/* Add Service Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-xl">
        <h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center gap-2">
          <FaPlus className="text-purple-600" /> Add New Service
        </h3>

        <input
          type="text"
          placeholder="Service name (e.g., Eye Testing)"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          className="w-full p-3 border rounded-lg mb-3 focus:ring-purple-400"
        />

        <input
          type="text"
          placeholder="Price (e.g., ₹200)"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          className="w-full p-3 border rounded-lg mb-3 focus:ring-purple-400"
        />

        <textarea
          placeholder="Short description..."
          rows="3"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-purple-400"
        ></textarea>

        <button
          onClick={addService}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg font-medium w-full"
        >
          Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-5 rounded-xl shadow-md border">

            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaTools className="text-purple-600" />
              {service.name}
            </h3>

            <p className="text-purple-600 font-bold mt-2">{service.price}</p>

            <p className="text-gray-600 mt-2">{service.description}</p>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => deleteService(service.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                <FaTrash /> Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
