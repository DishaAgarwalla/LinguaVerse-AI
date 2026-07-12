import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Which languages are supported?",
    answer:
      "LinguaVerse AI supports over 100 languages for text, speech, OCR, and document translation.",
  },
  {
    question: "Is Sign Language Translation available?",
    answer:
      "Yes. Our AI-powered Sign Language Translator converts gestures into text and speech in real time.",
  },
  {
    question: "Can I upload PDFs and DOCX files?",
    answer:
      "Absolutely. Upload documents and receive accurate translations while preserving formatting.",
  },
  {
    question: "Is there a free version?",
    answer:
      "Yes. LinguaVerse AI offers a free plan with premium upgrades available.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
  id="faq"
  className="bg-slate-50 py-24"
>
      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-600 font-semibold">
            FAQ
          </span>

          <h2 className="mt-6 text-5xl font-bold">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="rounded-2xl bg-white shadow-lg"
            >

              <button
                className="flex w-full items-center justify-between p-6"
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
              >
                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                {open === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>

              {open === index && (

                <div className="px-6 pb-6 text-slate-600">
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

export default FAQ;