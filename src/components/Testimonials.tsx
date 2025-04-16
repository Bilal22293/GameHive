'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useRef, useEffect, useState } from "react"
import type { CarouselApi } from "@/components/ui/carousel"

const reviews = [
  {
    name: "BRUCE.W",
    rating: 5,
    image: "/avatar/man.jpg",
    text: "Absolutely amazing service! I couldn't be happier with the support I received.",
  },
  {
    name: "MARK.R",
    rating: 4,
    image: "/avatar/man.jpg",
    text: "Very helpful team and great product quality. Highly recommended!",
  },
  {
    name: "SARAH.L",
    rating: 5,
    image: "/avatar/woman.jpg",
    text: "Exceeded my expectations. The delivery was quick and the product was perfect.",
  },
]

export default function Testimonials() {
  const carouselApi = useRef<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!carouselApi.current) return

    const interval = setInterval(() => {
      carouselApi.current?.scrollNext()
    }, 4000)

    // Update current index when carousel changes
    const onChange = (api: CarouselApi) => {
      setCurrent(api!.selectedScrollSnap())
    }

    carouselApi.current.on("select", onChange)

    return () => {
      clearInterval(interval)
      carouselApi.current?.off("select", onChange)
    }
  }, [carouselApi.current])

  return (
    <section className=" relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 neo-grid opacity-30 z-0"></div>
      
      {/* Tech lines */}
      <div className="tech-line-left mb-8"></div>
      <div className="tech-line-right mb-12"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center cyberpunk-text mb-12 text-3xl">
        </h2>

        <Carousel
          className="w-full max-w-4xl mx-auto"
          opts={{ loop: true }}
          setApi={(api) => (carouselApi.current = api)}
        >
          <CarouselContent>
            {reviews.map((review, i) => (
              <CarouselItem key={i}>
                <div className="future-card p-8 hover-3d scanning-effect">
                  <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden relative border-2 border-primary mb-4 md:mb-0">
                      <div className="absolute inset-0 bg-primary opacity-20 animate-pulse"></div>
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="md:ml-6 text-center md:text-left">
                      <h4 className="font-bold text-lg cyberpunk-text mb-2 text-primary">{review.name}</h4>
                      <div className="flex justify-center md:justify-start text-primary">
                        {[...Array(review.rating)].map((_, j) => (
                          <span key={j} className="animate-twinkle" style={{ animationDelay: `${j * 0.2}s` }}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <p className="text-lg italic relative z-10">"{review.text}"</p>
                    <div className="absolute -bottom-2 -right-2 opacity-20 text-6xl font-bold text-primary">"</div>
                  </div>
                  
                  {/* HUD Corners */}
                  <div className="hud-corner hud-corner-top-left"></div>
                  <div className="hud-corner hud-corner-top-right"></div>
                  <div className="hud-corner hud-corner-bottom-left"></div>
                  <div className="hud-corner hud-corner-bottom-right"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {/* Custom indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => carouselApi.current?.scrollTo(i)}
              className={`w-12 h-3 rounded-full transition-all duration-300 ${
                current === i ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className="sr-only">Slide {i + 1}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="tech-circle mt-10"></div>
    </section>
  )
}