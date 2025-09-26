'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: "What types of videos do you specialize in?",
    answer: "I specialize in automotive commercials, fashion editorials, brand promotional videos, and creative storytelling. My expertise includes working with major automotive brands like BMW, Ducati, Toyota, KTM, and Yamaha, as well as fashion and lifestyle content."
  },
  {
    id: 2,
    question: "What's included in your video production service?",
    answer: "My comprehensive service includes pre-production planning, cinematography, post-production editing, color grading, visual effects, and final delivery. I handle everything from concept development to the final polished video."
  },
  {
    id: 3,
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity. A simple commercial edit might take 1-2 weeks, while a full production with VFX can take 3-6 weeks. I'll provide a detailed timeline during our consultation."
  },
  {
    id: 4,
    question: "Do you work with clients outside of Pune?",
    answer: "Absolutely! While I'm based in Pirangut, Pune, I work with clients across India and internationally. I can travel for shoots or work remotely for post-production projects."
  },
  {
    id: 5,
    question: "What equipment do you use?",
    answer: "I use professional-grade cameras, lenses, and audio equipment. My post-production setup includes industry-standard software like Adobe Premiere Pro, After Effects, DaVinci Resolve, and various VFX tools."
  },
  {
    id: 6,
    question: "Can you help with just editing/post-production?",
    answer: "Yes! I offer post-production services separately, including video editing, color grading, visual effects, and motion graphics. Just send me your footage and project requirements."
  }
]

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <section className="section-spacing bg-primary-900">
      <div className="container-padding max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
            Frequently Asked <span className="text-accent-gradient">Questions</span>
          </h2>
          <p className="body-lg text-neutral-300 animate-on-scroll">
            Got questions? Here are the most common ones I get from clients.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-primary-800/50 border border-primary-700/50 rounded-xl overflow-hidden animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-primary-700/30 transition-colors duration-300"
              >
                <h3 className="heading-xs text-neutral-100 pr-4">
                  {faq.question}
                </h3>
                {openFaq === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-accent-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                )}
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openFaq === faq.id 
                    ? 'max-h-96 pb-6 opacity-100' 
                    : 'max-h-0 pb-0 opacity-0'
                }`}
              >
                <p className="body-md text-neutral-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12 animate-on-scroll">
          <p className="body-md text-neutral-400 mb-6">
            Have a different question?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:adityashinde6050@gmail.com"
              className="btn-primary"
            >
              Send an Email
            </a>
            <a
              href="tel:+918180999435"
              className="btn-secondary"
            >
              Call or WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}