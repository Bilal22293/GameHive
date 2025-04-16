'use client'

import Image from 'next/image'

export default function ServicesSection() {
  return (
    <section className="relative h-[500px] w-full">
      {/* Background Image */}
      <Image
        src="/c.png" // Replace with your image path
        alt="Services Background"
        fill
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0" />

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 md:px-20">
        <div className="text-center md:text-left text-white max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-200">
            We provide a wide range of gaming and tech-related services tailored for enthusiasts,
            collectors, and pros. From vintage console restoration to high-end PC builds —
            we’ve got it all covered.
          </p>
        </div>
      </div>
    </section>
  )
}
