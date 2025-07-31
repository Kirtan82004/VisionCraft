import React from "react";

const termsData = [
  {
    title: "Acceptance of Terms",
    description:
      "By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Optical Store's website if you do not accept all of the terms and conditions stated on this page.",
  },
  {
    title: "Intellectual Property Rights",
    description:
      "Unless otherwise stated, Optical Store and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from this website for your own personal use subject to restrictions set in these terms and conditions.",
  },
  {
    title: "Restrictions",
    description: "You are specifically restricted from all of the following:",
    list: [
      "Publishing any website material in any other media",
      "Selling, sublicensing, and/or otherwise commercializing any website material",
      "Publicly performing and/or showing any website material",
      "Using this website in any way that is or may be damaging to this website",
      "Using this website contrary to applicable laws and regulations",
      "Engaging in any data mining, data harvesting, or similar activity",
      "Using this website to engage in any advertising or marketing",
    ],
  },
  {
    title: "Limitation of Liability",
    description:
      "In no event shall Optical Store, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.",
  },
  {
    title: "Indemnification",
    description:
      "You hereby indemnify to the fullest extent Optical Store from and against any liabilities, costs, demands, damages, and expenses arising from your breach of these terms.",
  },
  {
    title: "Governing Law & Jurisdiction",
    description:
      "These terms will be governed by and interpreted in accordance with the laws of [Your State], and you submit to the jurisdiction of the courts in [Your State] for dispute resolution.",
  },
];

const TermsAndConditions = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Terms & Conditions
        </h1>

        {termsData.map((term, index) => (
          <div
            key={index}
            className="mb-8 border-l-4 border-blue-500 pl-4 bg-white shadow-sm rounded-md p-4 transition duration-200 hover:shadow-md"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              {term.title}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
              {term.description}
            </p>

            {term.list && (
              <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1">
                {term.list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TermsAndConditions;
