
import React from "react";
import aboutImage from "../assets/about.jpg";
import CEO from "../assets/CEO.jpg";
import COO from "../assets/COO.jpg";
import HeadDesigner from "../assets/HOD.jpg";

const aboutInfo = {
  title: "About Us",
  description: [
    "Welcome to Optical Shop, your number one source for all things eyewear. We're dedicated to giving you the very best of eyeglasses and sunglasses, with a focus on quality, customer service, and uniqueness.",
    "Founded in 2023, Optical Shop has come a long way from its beginnings. Our passion for providing the best eyewear drove us to do intense research and build a unique experience for our customers.",
    "We hope you enjoy our products as much as we enjoy offering them. If you have any questions or comments, feel free to contact us.",
  ],
  teamSign: "Sincerely, The Optical Shop Team",
};

const teamMembers = [
  {
    name: "Jane Doe",
    position: "CEO & Founder",
    description:
      "Jane is the visionary behind Optical Shop, with a passion for eyewear and a commitment to quality and customer service.",
    image: CEO,
  },
  {
    name: "John Smith",
    position: "Chief Operating Officer",
    description:
      "John oversees the day-to-day operations at Optical Shop, ensuring everything runs smoothly and efficiently.",
    image: COO,
  },
  {
    name: "Emily Johnson",
    position: "Head of Design",
    description:
      "Emily leads our design team, creating unique and stylish eyewear that our customers love.",
    image: HeadDesigner,
  },
];

const values = [
  {
    title: "Quality",
    description:
      "We are committed to providing the highest quality eyewear, using the best materials and craftsmanship.",
  },
  {
    title: "Customer Service",
    description:
      "Our customers are our top priority. We strive to provide exceptional service and support to ensure your satisfaction.",
  },
  {
    title: "Innovation",
    description:
      "We are always looking for new ways to improve our products and services, staying ahead of trends and technologies.",
  },
];

const AboutPage = () => {
  return (
    <main className="px-4 py-10 max-w-7xl mx-auto ">
      {/* About Section */}
      <section className="mb-16 pt-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
          {aboutInfo.title}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 space-y-5 text-gray-700 text-base leading-relaxed">
            {aboutInfo.description.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
            <p className="font-semibold">{aboutInfo.teamSign}</p>
          </div>
          <div className="md:w-1/2 rounded-xl overflow-hidden shadow-xl">
            <img
              src={aboutImage}
              alt="Optical shop team working"
              className="w-full h-full object-cover max-h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
