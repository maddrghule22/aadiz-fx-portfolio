import Image from 'next/image'
import { Award, Users, Clock, Globe, Camera, Heart } from 'lucide-react'

const achievements = [
  {
    icon: Award,
    title: '15+ Awards',
    description: 'Industry recognition for excellence in visual storytelling'
  },
  {
    icon: Users,
    title: '50+ Clients',
    description: 'Trusted by brands and creators worldwide'
  },
  {
    icon: Clock,
    title: '5+ Years',
    description: 'Professional experience in video production'
  },
  {
    icon: Globe,
    title: '25+ Countries',
    description: 'Projects delivered across the globe'
  }
]

const values = [
  {
    icon: Camera,
    title: 'Craft Excellence',
    description: 'Every frame is meticulously crafted to serve the story and engage the audience.'
  },
  {
    icon: Heart,
    title: 'Passion-Driven',
    description: 'Genuine love for visual storytelling drives every creative decision I make.'
  },
  {
    icon: Users,
    title: 'Collaborative Spirit',
    description: 'The best work comes from close collaboration and understanding client vision.'
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'Drawing inspiration from diverse cultures and storytelling traditions worldwide.'
  }
]

const timeline = [
  {
    year: '2019',
    title: 'The Beginning',
    description: 'Started my journey in video production with a passion for storytelling and a camera.'
  },
  {
    year: '2020',
    title: 'First Commercial',
    description: 'Delivered my first major commercial project, establishing trust with local businesses.'
  },
  {
    year: '2021',
    title: 'VFX Mastery',
    description: 'Expanded skills into advanced VFX and 3D animation, opening new creative possibilities.'
  },
  {
    year: '2022',
    title: 'International Recognition',
    description: 'Won first international award for a music video project, gaining global attention.'
  },
  {
    year: '2023',
    title: 'Studio Expansion',
    description: 'Established professional studio space and expanded team capabilities.'
  },
  {
    year: '2024',
    title: 'Industry Leader',
    description: 'Recognized as a leading creative professional, working with Fortune 500 companies.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary-900">
      {/* Hero Section */}
      <section className="section-spacing bg-hero-gradient">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="animate-on-scroll">
              <h1 className="heading-xl text-neutral-100 mb-6">
                The Vision Behind
                <br />
                <span className="text-accent-gradient">Aadiz.FX</span>
              </h1>
              <p className="body-lg text-neutral-300 mb-8 leading-relaxed">
                I'm a passionate videographer and VFX artist based in Pirangut, Pune, dedicated to transforming ideas into compelling visual narratives. With expertise in automotive commercials, fashion editorials, and creative storytelling, I've had the privilege of working with prestigious brands like BMW, Ducati, Toyota, KTM, and Yamaha.
              </p>
              <p className="body-lg text-neutral-300 mb-8 leading-relaxed">
                My approach combines technical expertise with creative vision, specializing in cinematography, post-production, and visual effects. I believe that great video content has the power to inspire, educate, and drive meaningful connections between brands and their audiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact" className="btn-primary flex items-center space-x-2">
                  <span>Work With Me</span>
                  <span>→</span>
                </a>
                <a href="/work" className="btn-secondary flex items-center space-x-2">
                  <span>View My Work</span>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-on-scroll">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/about-portrait.jpg"
                  alt="Professional portrait"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-8 -left-8 bg-primary-800/90 backdrop-blur-md border border-primary-700/50 rounded-xl p-6">
                <div className="text-center">
                  <div className="heading-md text-accent-500 mb-1">50M+</div>
                  <div className="body-sm text-neutral-300">Total Views</div>
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-primary-800/90 backdrop-blur-md border border-primary-700/50 rounded-xl p-6">
                <div className="text-center">
                  <div className="heading-md text-accent-500 mb-1">98%</div>
                  <div className="body-sm text-neutral-300">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-spacing bg-section-gradient">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
              Proven <span className="text-accent-gradient">Results</span>
            </h2>
            <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
              Numbers that reflect the impact and trust built through years of dedicated work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div
                  key={achievement.title}
                  className="text-center group animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-20 h-20 bg-accent-500/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-accent-500" />
                  </div>
                  <h3 className="heading-sm text-neutral-100 mb-3 group-hover:text-accent-500 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="body-sm text-neutral-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Creative Philosophy */}
      <section className="section-spacing bg-primary-900">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
              Creative <span className="text-accent-gradient">Philosophy</span>
            </h2>
            <p className="body-lg text-neutral-300 max-w-3xl mx-auto animate-on-scroll">
              "Every project is an opportunity to push creative boundaries and tell stories that resonate. I believe in the power of visual narrative to inspire, educate, and create lasting emotional connections."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={value.title}
                  className="group p-8 rounded-xl bg-primary-800/30 border border-primary-700/50 hover:border-accent-500/50 transition-all duration-300 hover-lift animate-on-scroll"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent-500/20 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <h3 className="heading-xs text-neutral-100 mb-3 group-hover:text-accent-500 transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="body-sm text-neutral-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-spacing bg-section-gradient">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
              My <span className="text-accent-gradient">Journey</span>
            </h2>
            <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
              From passionate beginner to industry professional - the milestones that shaped my career
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-accent-500/30"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex items-center animate-on-scroll ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="glass rounded-xl p-6">
                      <div className="heading-sm text-accent-500 mb-2">{item.year}</div>
                      <h3 className="heading-xs text-neutral-100 mb-3">{item.title}</h3>
                      <p className="body-sm text-neutral-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-accent-500 rounded-full border-4 border-primary-900 z-10"></div>
                  </div>

                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="section-spacing bg-primary-900">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
              Skills & <span className="text-accent-gradient">Expertise</span>
            </h2>
            <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
              Core competencies developed through years of hands-on experience and continuous learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { skill: 'Video Editing & Post-Production', level: 95 },
              { skill: 'Color Grading & Correction', level: 90 },
              { skill: 'Visual Effects & Compositing', level: 88 },
              { skill: 'Motion Graphics & Animation', level: 85 },
              { skill: 'Audio Mixing & Sound Design', level: 80 },
              { skill: '3D Modeling & Rendering', level: 75 },
            ].map((item, index) => (
              <div
                key={item.skill}
                className="animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="body-md font-medium text-neutral-100">{item.skill}</h3>
                  <span className="body-sm text-accent-500 font-medium">{item.level}%</span>
                </div>
                <div className="w-full bg-primary-800 rounded-full h-2">
                  <div
                    className="h-2 bg-gradient-to-r from-accent-500 to-accent-300 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-section-gradient">
        <div className="container-padding max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
            Let's Create Something <span className="text-accent-gradient">Amazing Together</span>
          </h2>
          <p className="body-lg text-neutral-300 mb-8 animate-on-scroll">
            Ready to bring your vision to life? I'd love to hear about your project and discuss how we can create something extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll">
            <a href="/contact" className="btn-primary flex items-center space-x-2">
              <span>Get In Touch</span>
              <span>→</span>
            </a>
            <a href="/services" className="btn-secondary flex items-center space-x-2">
              <span>View Services</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}