import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on all our products. If you are not satisfied with your purchase, you can return it within 30 days for a full refund.",
    },
    {
      question: "Do you offer prescription lenses?",
      answer:
        "Yes, we offer prescription lenses for all our eyeglasses. You can provide your prescription details during checkout.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping usually takes 5–7 business days. Tracking details are shared once shipped.",
    },
    {
      question: "Can I change my order after placing it?",
      answer:
        "Please contact customer support as soon as possible. We'll try our best to help.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, international shipping is available. Costs and delivery times vary by country.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once shipped, a tracking number is sent via email for real-time updates.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards, UPI, PayPal, and other secure methods.",
    },
    {
      question: "Do you provide warranty on products?",
      answer:
        "Yes, all eyewear products include a 1-year manufacturing warranty.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* HEADER */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 py-24 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Everything you need to know about our Optical Shop & services
          </p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group rounded-2xl border transition-all duration-300
                  ${isOpen
                    ? "border-emerald-500 bg-white shadow-xl"
                    : "border-gray-200 bg-white shadow-sm hover:shadow-md"
                  }`}
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition">
                    {faq.question}
                  </span>

                  <span
                    className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300
                      ${isOpen
                        ? "bg-emerald-500 text-white border-emerald-500 rotate-180"
                        : "bg-gray-100 text-gray-600 border-gray-300"
                      }`}
                  >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"}
                  `}
                >
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FAQSection;
