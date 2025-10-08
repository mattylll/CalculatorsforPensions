'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Retirement Planner',
    age: '52',
    location: 'London',
    avatar: '👩‍💼',
    rating: 5,
    quote: 'The state pension calculator helped me identify a 3-year gap in my NI contributions. Filling it will boost my pension by £2,400 per year!',
    calculator: 'State Pension Forecast',
    result: '£2,400/year saved',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    name: 'James Thompson',
    role: 'IT Consultant',
    age: '45',
    location: 'Manchester',
    avatar: '👨‍💻',
    rating: 5,
    quote: 'The tax relief optimizer showed me how salary sacrifice could save me £8,000 annually in tax and NI. Game-changing advice!',
    calculator: 'Tax Relief Calculator',
    result: '£8,000/year tax saved',
    gradient: 'from-emerald-500 to-green-600'
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'NHS Doctor',
    age: '38',
    location: 'Birmingham',
    avatar: '👩‍⚕️',
    rating: 5,
    quote: 'The DC pension calculator revealed I was on track to retire 5 years earlier than expected by increasing contributions by just £200/month.',
    calculator: 'DC Pension Calculator',
    result: 'Retire 5 years earlier',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Business Owner',
    age: '49',
    location: 'Edinburgh',
    avatar: '👨‍💼',
    rating: 5,
    quote: 'The SIPP calculator helped me compare platforms and save 0.5% annually on fees - that\'s £50,000 more at retirement!',
    calculator: 'SIPP Calculator',
    result: '£50,000 more at retirement',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Teacher',
    age: '58',
    location: 'Cardiff',
    avatar: '👩‍🏫',
    rating: 5,
    quote: 'The drawdown planner showed me exactly how to make my pension last 30+ years. The scenario modeling is incredibly detailed!',
    calculator: 'Drawdown Calculator',
    result: '30+ years coverage',
    gradient: 'from-cyan-500 to-blue-600'
  }
]

function TestimonialCard({ testimonial, isActive }: { testimonial: typeof testimonials[0], isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.95,
        filter: isActive ? 'blur(0px)' : 'blur(2px)'
      }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute -inset-1 rounded-3xl opacity-20 blur-xl",
        `bg-gradient-to-r ${testimonial.gradient}`
      )} />
      
      {/* Card */}
      <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
        {/* Quote icon */}
        <Quote className="absolute top-6 right-6 h-8 w-8 text-gray-200 dark:text-gray-800" />
        
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            </motion.div>
          ))}
        </div>
        
        {/* Quote */}
        <blockquote className="text-lg mb-6 relative z-10">
          "{testimonial.quote}"
        </blockquote>
        
        {/* Result highlight */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium mb-6",
            `bg-gradient-to-r ${testimonial.gradient}`
          )}
        >
          <Check className="h-4 w-4" />
          <span>{testimonial.result}</span>
        </motion.div>
        
        {/* Author */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-5xl"
          >
            {testimonial.avatar}
          </motion.div>
          <div>
            <div className="font-semibold">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role}, {testimonial.age} • {testimonial.location}
            </div>
            <div className="text-xs text-primary mt-1">
              Used: {testimonial.calculator}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full" />
        </motion.div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full"
          >
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">50,000+ Happy Users</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            Real Results from
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Real People
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our calculators have helped thousands make better pension decisions
          </p>
        </motion.div>
        
        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-20 z-20 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-20 z-20 p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          
          {/* Testimonials */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard 
                testimonial={testimonials[currentIndex]} 
                isActive={true}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </div>
        
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '50K+', label: 'Active Users' },
            { value: '£2.5M', label: 'Saved in Tax' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}