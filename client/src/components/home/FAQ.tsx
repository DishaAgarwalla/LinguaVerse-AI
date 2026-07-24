import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "Which languages are supported?",
    answer:
      "LinguaVerse AI supports over 100 languages for text, speech, OCR, and document translation, including major languages like English, Spanish, French, Chinese, Arabic, and more.",
  },
  {
    question: "Is Sign Language Translation available?",
    answer:
      "Yes. Our AI-powered Sign Language Translator converts gestures into text and speech in real time, making communication more accessible for everyone.",
  },
  {
    question: "Can I upload PDFs and DOCX files?",
    answer:
      "Absolutely. Upload documents and receive accurate translations while preserving the original formatting and structure of your files.",
  },
  {
    question: "Is there a free version?",
    answer:
      "Yes. LinguaVerse AI offers a free plan with essential features. Premium upgrades are available for advanced features, higher limits, and priority support.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-gradient-to-b from-slate-50 to-white py-24 md:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200/50">
            ❓ FAQ
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Questions</span>
          </h2>
        </div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white shadow-lg shadow-gray-100/50 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 border border-gray-100/50 hover:border-blue-100"
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left transition-colors duration-300"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="flex items-center gap-3 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  <FaQuestionCircle className="text-blue-400 group-hover:text-blue-600 transition-colors duration-300 flex-shrink-0" />
                  <span>{faq.question}</span>
                </span>

                <span className={`p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300 flex-shrink-0 ml-4 ${open === index ? 'bg-blue-50' : ''}`}>
                  {open === index ? (
                    <FaChevronUp className="text-blue-600" />
                  ) : (
                    <FaChevronDown className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                  )}
                </span>
              </button>

              {open === index && (
                <div className="px-6 pb-6 animate-slideDown">
                  <div className="pl-10 border-l-4 border-blue-200 pl-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100/50">
          <p className="text-gray-600">
            Still have questions?{" "}
            <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;