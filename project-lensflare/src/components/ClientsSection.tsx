'use client'

import Image from 'next/image'

interface Client {
  id: string;
  name: string;
  logo: string;
  website: string;
}

interface ClientsSectionProps {
  clients?: Client[];
}

const defaultClients = [
  {
    id: 'bmw',
    name: 'BMW',
    logo: '/images/projects/BMW.jpeg',
    website: 'https://bmw.in'
  },
  {
    id: 'ducati',
    name: 'Ducati',
    logo: '/images/projects/Ducati.jpeg',
    website: 'https://ducati.com'
  },
  {
    id: 'toyota',
    name: 'Toyota',
    logo: '/images/projects/toyato.jpeg',
    website: 'https://toyota.co.in'
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: '/images/projects/Audi.jpeg',
    website: 'https://audi.com'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: '/images/projects/Mercedes-Benz.jpeg',
    website: 'https://mercedes-benz.com'
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    logo: '/images/projects/Lamborghini.png',
    website: 'https://lamborghini.com'
  },
  {
    id: 'ktm',
    name: 'KTM',
    logo: '/images/projects/KTM.png',
    website: 'https://ktm.com'
  },
  {
    id: 'yamaha',
    name: 'Yamaha',
    logo: '/images/projects/yamaha.jpeg',
    website: 'https://yamaha-motor.co.in'
  },
  {
    id: 'fashion-brand',
    name: 'Fashion Studio',
    logo: '/images/projects/Fashion studio.jpeg',
    website: '#'
  }
]

export default function ClientsSection({ clients = [] }: ClientsSectionProps) {
  const clientsData = clients.length > 0 ? clients : defaultClients;

  return (
    <section className="py-16 bg-primary-900">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-sm text-neutral-100 mb-4 animate-on-scroll">
            Trusted by Industry Leaders
          </h2>
          <p className="body-md text-neutral-300 animate-on-scroll">
            Collaborating with innovative brands and creative studios worldwide
          </p>
        </div>

        {/* Clients Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clientsData.map((client, index) => (
            <div
              key={client.id || index}
              className="group flex items-center justify-center p-6 rounded-xl bg-primary-800/30 hover:bg-primary-800/50 border border-primary-700/30 hover:border-accent-500/30 transition-all duration-300 hover-lift animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full h-12 opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="animate-on-scroll">
            <div className="heading-md text-accent-500 mb-2">98%</div>
            <div className="body-sm text-neutral-300">Client Satisfaction</div>
          </div>
          <div className="animate-on-scroll">
            <div className="heading-md text-accent-500 mb-2">50M+</div>
            <div className="body-sm text-neutral-300">Total Views</div>
          </div>
          <div className="animate-on-scroll">
            <div className="heading-md text-accent-500 mb-2">15+</div>
            <div className="body-sm text-neutral-300">Awards Won</div>
          </div>
          <div className="animate-on-scroll">
            <div className="heading-md text-accent-500 mb-2">25+</div>
            <div className="body-sm text-neutral-300">Countries Reached</div>
          </div>
        </div>
      </div>
    </section>
  )
}