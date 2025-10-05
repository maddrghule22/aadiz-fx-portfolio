'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: "What types of videos do you specialize in?",
    answer: "I specialize in automotive commercials, fashion editorials, brand promotional videos, and creative storytelling. My expertise includes working with major automotive brands like BMW, Ducati, Toyota, KTM, and Yamaha, as well as fashion and lifestyle content. I also create music videos, documentary-style content, and corporate videos for various industries."
  },
  {
    id: 2,
    question: "What's included in your video production service?",
    answer: "My comprehensive service includes pre-production planning (concept development, storyboarding, shot lists), cinematography with professional equipment, post-production editing, color grading, visual effects, motion graphics, and final delivery in your preferred formats. I handle everything from initial concept to the final polished video, ensuring a seamless process and exceptional results."
  },
  {
    id: 3,
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and scope. A simple commercial edit might take 1-2 weeks, while a full production with VFX can take 3-6 weeks. For larger campaigns or series, timelines may extend to 2-3 months. I'll provide a detailed timeline during our consultation based on your specific project requirements."
  },
  {
    id: 4,
    question: "Do you work with clients outside of Pune?",
    answer: "Absolutely! While I'm based in Pirangut, Pune, I work with clients across India and internationally. I can travel for shoots or work remotely for post-production projects. For international clients, I utilize secure file transfer systems and video conferencing tools to maintain clear communication throughout the project lifecycle."
  },
  {
    id: 5,
    question: "What equipment do you use?",
    answer: "I use professional-grade cameras including Sony FX6, Canon C70, and Blackmagic Pocket Cinema cameras, along with a range of prime and zoom lenses. For stabilization, I use DJI gimbals and sliders. My post-production setup includes high-performance workstations with Adobe Creative Suite, DaVinci Resolve, and various VFX software. I also have professional lighting kits and audio recording equipment."
  },
  {
    id: 6,
    question: "Can you help with just editing/post-production?",
    answer: "Yes! I offer post-production services separately, including video editing, color grading, visual effects, motion graphics, and audio mixing. Just send me your footage and project requirements, and I'll deliver professional results that meet your vision and standards."
  },
  {
    id: 7,
    question: "What is your revision policy?",
    answer: "I include a specific number of revisions in each package (typically 2-3 rounds depending on the service tier). Additional revisions can be requested for a nominal fee. My goal is to ensure complete satisfaction with the final product while maintaining project timelines and quality standards."
  },
  {
    id: 8,
    question: "How do we communicate during the project?",
    answer: "I believe in transparent and consistent communication. We'll have an initial consultation to establish project goals, followed by regular check-ins at key milestones. I use project management tools to share updates, and we can communicate via email, phone, or video calls as needed. For international clients, I'm flexible with time zones to ensure smooth collaboration."
  },
  {
    id: 9,
    question: "Do you offer rush services?",
    answer: "Yes, rush services are available for projects with tight deadlines. Rush fees typically range from 25-50% additional cost depending on the urgency and complexity. I recommend discussing rush requirements during the initial consultation to ensure feasibility and proper planning."
  },
  {
    id: 10,
    question: "What formats do you deliver in?",
    answer: "I deliver videos in multiple formats to suit your needs: MP4 for web and social media, MOV for professional use, ProRes for further editing, and broadcast-ready formats. Resolution options include HD (1080p), Full HD (1080p), 4K, and even 8K for premium projects. I can also provide specific formats for platforms like YouTube, Vimeo, or broadcast television."
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
          <h3 className="heading-sm text-neutral-100 mb-4">Still have questions?</h3>
          <p className="body-md text-neutral-400 mb-6">
            Get in touch for a personalized consultation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:adityashinde6050@gmail.com"
              className="btn-primary flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send an Email</span>
            </a>
            <a
              href="tel:+918180999435"
              className="btn-secondary flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call or WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}