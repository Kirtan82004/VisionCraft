import React from "react";
import aboutImage from "../assets/about.webp";
import CEO from "../assets/CEO.webp";
import COO from "../assets/COO.webp";
import HeadDesigner from "../assets/HOD.webp";

const aboutInfo = {
  title: "About Optical Shop",
  description: [
    "Welcome to Optical Shop, your trusted destination for premium eyewear. We focus on quality, comfort, and style to bring you glasses that truly fit your lifestyle.",
    "Founded in 2023, we started with a simple mission: make high-quality eyewear accessible and enjoyable for everyone.",
    "From design to delivery, every step is guided by our passion for innovation and customer satisfaction.",
  ],
  teamSign: "— The Optical Shop Team",
};

const teamMembers = [
  {
    name: "Jane Doe",
    position: "CEO & Founder",
    description:
      "Visionary leader driving Optical Shop with innovation, passion, and customer-first thinking.",
    image: CEO,
  },
  {
    name: "John Smith",
    position: "Chief Operating Officer",
    description:
      "Ensures smooth operations and scalable growth across all Optical Shop services.",
    image: COO,
  },
  {
    name: "Emily Johnson",
    position: "Head of Design",
    description:
      "Leads creative direction to craft stylish and comfortable eyewear loved by customers.",
    image: HeadDesigner,
  },
];

const values = [
  {
    title: "Premium Quality",
    description:
      "We use top-grade materials and precision craftsmanship for long-lasting eyewear.",
  },
  {
    title: "Customer First",
    description:
      "Your satisfaction matters. We prioritize support, service, and trust above all.",
  },
  {
    title: "Innovation",
    description:
      "Constantly evolving designs and technology to stay ahead of trends.",
  },
];

const AboutPage = () => {
  return (
    <main className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-linear-to-br from-emerald-600 to-teal-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {aboutInfo.title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-emerald-100">
            Crafting eyewear that blends comfort, clarity, and confidence.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
            {aboutInfo.description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
            <p className="font-semibold text-gray-900">
              {aboutInfo.teamSign}
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={aboutImage}
              alt="Optical shop team"
              className="w-full h-full object-cover max-h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 text-center group"
              >
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutPage;
