'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { 
  LineChart, Activity, TrendingUp, BarChart3, PieChart, 
  Calendar, Info, Download, Share2, Maximize2 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Generate smooth data points for charts
function generateDataPoints(years: number, startValue: number, growthRate: number) {
  const points = []
  let value = startValue
  
  for (let i = 0; i <= years; i++) {
    points.push({
      year: new Date().getFullYear() + i,
      value: Math.round(value),
      contributions: Math.round(value * 0.3),
      growth: Math.round(value * 0.7),
    })
    value *= (1 + growthRate / 100)
  }
  
  return points
}

// Animated Line Chart Component
function AnimatedLineChart({ data, height = 300 }: { data: any[], height?: number }) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="relative" style={{ height }}>
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((percent) => (
          <g key={percent}>
            <line 
              x1="0" 
              y1={`${100 - percent}%`} 
              x2="100%" 
              y2={`${100 - percent}%`} 
              stroke="currentColor" 
              strokeWidth="0.5" 
              opacity="0.2"
            />
            <text 
              x="10" 
              y={`${100 - percent}%`} 
              dy="4" 
              className="text-xs fill-muted-foreground"
            >
              £{Math.round((maxValue * percent) / 100 / 1000)}k
            </text>
          </g>
        ))}
      </svg>
      
      {/* Chart SVG */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Area under the line */}
        <motion.path
          d={`
            M ${data.map((d, i) => 
              `${(i / (data.length - 1)) * 100}%,${100 - (d.value / maxValue) * 100}%`
            ).join(' L ')}
            L 100%,100% L 0%,100% Z
          `}
          fill="url(#lineGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Main line */}
        <motion.path
          d={`M ${data.map((d, i) => 
            `${(i / (data.length - 1)) * 100}%,${100 - (d.value / maxValue) * 100}%`
          ).join(' L ')}`}
          fill="none"
          stroke="rgb(99, 102, 241)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        
        {/* Data points */}
        {data.map((d, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={`${(i / (data.length - 1)) * 100}%`}
              cy={`${100 - (d.value / maxValue) * 100}%`}
              r={hoveredPoint === i ? "8" : "5"}
              fill="rgb(99, 102, 241)"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            />
            
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredPoint === i && (
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <rect
                    x={`${(i / (data.length - 1)) * 100}%`}
                    y={`${100 - (d.value / maxValue) * 100 - 10}%`}
                    width="120"
                    height="40"
                    rx="4"
                    fill="white"
                    stroke="rgb(99, 102, 241)"
                    strokeWidth="1"
                    style={{ transform: 'translate(-60px, -40px)' }}
                  />
                  <text
                    x={`${(i / (data.length - 1)) * 100}%`}
                    y={`${100 - (d.value / maxValue) * 100 - 10}%`}
                    className="text-xs font-medium"
                    textAnchor="middle"
                    style={{ transform: 'translateY(-20px)' }}
                  >
                    <tspan x={`${(i / (data.length - 1)) * 100}%`} dy="-15">
                      {d.year}
                    </tspan>
                    <tspan x={`${(i / (data.length - 1)) * 100}%`} dy="15" className="font-bold">
                      £{d.value.toLocaleString()}
                    </tspan>
                  </text>
                </motion.g>
              )}
            </AnimatePresence>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

// Animated Bar Chart Component
function AnimatedBarChart({ data }: { data: any[] }) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="relative h-[300px]">
      <div className="absolute inset-0 flex items-end justify-between gap-2 px-4">
        {data.slice(-12).map((d, i) => (
          <motion.div
            key={i}
            className="flex-1 relative group"
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / maxValue) * 100}%` }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/60 rounded-t-md">
              {/* Contribution portion */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-400 rounded-t-md"
                initial={{ height: 0 }}
                animate={{ height: `${(d.contributions / d.value) * 100}%` }}
                transition={{ delay: i * 0.05 + 0.3, duration: 0.5 }}
              />
            </div>
            
            {/* Hover tooltip */}
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 text-xs whitespace-nowrap transition-opacity pointer-events-none z-10">
              <div className="font-medium">{d.year}</div>
              <div className="text-primary">Total: £{d.value.toLocaleString()}</div>
              <div className="text-green-500">Contributions: £{d.contributions.toLocaleString()}</div>
              <div className="text-blue-500">Growth: £{d.growth.toLocaleString()}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 -mb-6">
        {data.slice(-12).map((d, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-xs text-muted-foreground">
              {i % 3 === 0 ? d.year : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Animated Pie Chart Component
function AnimatedPieChart() {
  const segments = [
    { label: 'State Pension', value: 30, color: 'from-blue-500 to-blue-600' },
    { label: 'Workplace Pension', value: 45, color: 'from-purple-500 to-purple-600' },
    { label: 'Personal Savings', value: 25, color: 'from-green-500 to-green-600' },
  ]
  
  let startAngle = 0
  
  return (
    <div className="relative h-[300px] flex items-center justify-center">
      <svg className="w-64 h-64">
        <defs>
          {segments.map((segment, i) => (
            <linearGradient key={i} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={cn('text-blue-500', segment.color.replace('from-', 'text-').split(' ')[0])} stopColor="currentColor"/>
              <stop offset="100%" className={cn('text-blue-600', segment.color.replace('to-', 'text-').split(' ')[1])} stopColor="currentColor"/>
            </linearGradient>
          ))}
        </defs>
        
        {segments.map((segment, i) => {
          const angle = (segment.value / 100) * 360
          const endAngle = startAngle + angle
          const x1 = 128 + 100 * Math.cos((startAngle * Math.PI) / 180)
          const y1 = 128 + 100 * Math.sin((startAngle * Math.PI) / 180)
          const x2 = 128 + 100 * Math.cos((endAngle * Math.PI) / 180)
          const y2 = 128 + 100 * Math.sin((endAngle * Math.PI) / 180)
          const largeArc = angle > 180 ? 1 : 0
          
          const path = `M 128 128 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`
          
          startAngle = endAngle
          
          return (
            <motion.g key={i}>
              <motion.path
                d={path}
                fill={`url(#gradient-${i})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                style={{ transformOrigin: '128px 128px' }}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* Label */}
              <motion.text
                x={128 + 60 * Math.cos(((startAngle - angle / 2) * Math.PI) / 180)}
                y={128 + 60 * Math.sin(((startAngle - angle / 2) * Math.PI) / 180)}
                textAnchor="middle"
                className="text-xs font-medium fill-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 + 0.3 }}
              >
                {segment.value}%
              </motion.text>
            </motion.g>
          )
        })}
        
        {/* Center circle */}
        <circle cx="128" cy="128" r="40" fill="white" className="dark:fill-gray-900"/>
        <text x="128" y="128" textAnchor="middle" className="text-lg font-bold fill-current" dy="5">
          100%
        </text>
      </svg>
      
      {/* Legend */}
      <div className="absolute right-0 space-y-2">
        {segments.map((segment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className={cn('w-3 h-3 rounded-full bg-gradient-to-r', segment.color)} />
            <span className="text-sm">{segment.label}</span>
            <span className="text-sm font-medium">{segment.value}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function InteractiveDataViz() {
  const [activeTab, setActiveTab] = useState('growth')
  const [years, setYears] = useState(25)
  const data = generateDataPoints(years, 50000, 7)
  
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full"
          >
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Live Data Visualization</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            Visualize Your
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Financial Future
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive charts showing your pension growth, contributions, and retirement projections
          </p>
        </motion.div>
        
        {/* Chart Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 p-8"
        >
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-3 w-full md:w-auto">
                <TabsTrigger value="growth" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Growth</span>
                </TabsTrigger>
                <TabsTrigger value="breakdown" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Breakdown</span>
                </TabsTrigger>
                <TabsTrigger value="allocation" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Allocation</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Chart Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'growth' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span>Projected pension growth over {years} years at 7% annual return</span>
                  </div>
                  <AnimatedLineChart data={data} />
                </div>
              )}
              
              {activeTab === 'breakdown' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span>Yearly contributions vs investment growth</span>
                  </div>
                  <AnimatedBarChart data={data} />
                </div>
              )}
              
              {activeTab === 'allocation' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span>Recommended retirement income sources</span>
                  </div>
                  <AnimatedPieChart />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t">
            {[
              { label: 'Final Pot Value', value: `£${data[data.length - 1].value.toLocaleString()}`, change: '+245%' },
              { label: 'Monthly Income', value: `£${Math.round(data[data.length - 1].value / 240).toLocaleString()}`, change: '+180%' },
              { label: 'Total Contributions', value: `£${data[data.length - 1].contributions.toLocaleString()}`, change: '100%' },
              { label: 'Investment Growth', value: `£${data[data.length - 1].growth.toLocaleString()}`, change: '+340%' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-1"
              >
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}