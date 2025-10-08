'use client'

const testimonials = [
  {
    quote: "These calculators gave me clarity on my retirement planning. Simple, accurate, and free.",
    author: "Sarah M.",
    role: "Age 45, London",
  },
  {
    quote: "The tax relief calculator alone saved me thousands. Highly recommend for anyone planning retirement.",
    author: "James T.",
    role: "Age 52, Manchester",
  },
  {
    quote: "Finally understood my state pension entitlement. Clear explanations and easy to use.",
    author: "Patricia R.",
    role: "Age 58, Edinburgh",
  },
]

export default function SimpleTestimonials() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Trusted by thousands
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join over 2,000 people planning their retirement with confidence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col p-8 border border-gray-200 dark:border-gray-800 rounded-lg"
            >
              {/* Quote */}
              <p className="text-gray-900 dark:text-white mb-6 flex-1">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                  {testimonial.author[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
