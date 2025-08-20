
import React, { useState } from 'react';

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
        "Yes, we offer prescription lenses for all our eyeglasses. You can provide your prescription details during the checkout process.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping usually takes 5-7 business days. You will receive a tracking number once your order has been shipped.",
    },
    {
      question: "Can I change my order after placing it?",
      answer:
        "If you need to change your order, please contact our customer service team as soon as possible. We will do our best to accommodate your request.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries. Shipping costs and delivery times will vary depending on the destination.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, we will send you a tracking number via email. You can use this to track your order on our website or the carrier's tracking page.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and other secure payment methods. You can view all available options during checkout.",
    },
    {
      question: "Do you provide warranty on your products?",
      answer:
        "Yes, we provide a 1-year warranty on all our eyewear products. If you experience any defects, please contact our support team.",
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-20 py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-4 flex justify-between items-center focus:outline-none"
              >
                <span className="text-base sm:text-lg font-medium text-gray-800">{faq.question}</span>
                <span className="text-gray-600 text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm sm:text-base text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
