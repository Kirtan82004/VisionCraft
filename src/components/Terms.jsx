import React from "react";

const termsData = [
  {
    title: "Acceptance of Terms",
    description:
      "By accessing this website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue using Optical Store.",
  },
  {
    title: "Intellectual Property Rights",
    description:
      "All content on this website is the property of Optical Store unless otherwise stated. You may use material for personal purposes only, subject to the restrictions outlined in these terms.",
  },
  {
    title: "Restrictions",
    description: "You are specifically restricted from the following activities:",
    list: [
      "Publishing website material in other media",
      "Selling or sublicensing website material",
      "Public display or performance of website content",
      "Using the website in any way that may cause damage",
      "Using the website contrary to applicable laws",
      "Engaging in data mining or data harvesting",
      "Using the website for advertising or marketing",
    ],
  },
  {
    title: "Limitation of Liability",
    description:
      "Optical Store shall not be held responsible for any damages arising from your use or inability to use the website.",
  },
  {
    title: "Indemnification",
    description:
      "You agree to indemnify Optical Store against any losses, liabilities, or expenses resulting from your breach of these terms.",
  },
  {
    title: "Governing Law & Jurisdiction",
    description:
      "These terms are governed by the laws of your local jurisdiction, and any disputes will be resolved in its courts.",
  },
];

const TermsAndConditions = () => {
  return (
    <main className="bg-gray-50">

      {/* HERO */}
      <section className="bg-linear-to-br from-emerald-600 to-teal-600 py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-emerald-100 text-lg">
            Please read these terms carefully before using our services
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {termsData.map((term, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {term.title}
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                {term.description}
              </p>

              {term.list && (
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  {term.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-sm text-gray-500 mt-12">
          Last updated: January 2026
        </p>
      </section>
    </main>
  );
};

export default TermsAndConditions;
