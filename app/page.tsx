"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, TrendingUp, Users, Building2, Zap, Shield, Globe, ChevronDown } from "lucide-react"
import Link from "next/link"
import { PremiumFooter } from "@/components/layout/premium-footer"
import { PremiumLogo as Logo } from "@/components/ui/premium-logo"
import { useAuth } from "@/lib/auth-context"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const { user } = useAuth()

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    { icon: Users, title: "Smart Buyer Matching", desc: "AI-powered buyer recommendations" },
    { icon: TrendingUp, title: "Real-time Analytics", desc: "Live market insights and trends" },
    { icon: Shield, title: "Secure Transactions", desc: "Bank-grade security protocols" },
  ]

  const stats = [
    { value: "2.4M+", label: "Livestock Traded", change: "+23%" },
    { value: "15K+", label: "Active Traders", change: "+18%" },
    { value: "98.5%", label: "Success Rate", change: "+2.1%" },
    { value: "24/7", label: "Support", change: "Always" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="md" variant="gradient" showText={true} className="group-hover:scale-105 transition-transform duration-300" />
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              {user ? (
                <Link href="/dashboard">
                  <Button className="gradient-primary text-white shadow-medium">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="gradient-primary text-white shadow-medium">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-4">
                <Badge className="gradient-primary text-white border-0 shadow-soft">
                  <Zap className="w-3 h-3 mr-1" />
                  Revolutionary CRM Platform
                </Badge>
                <h1 className="font-sans font-bold text-5xl lg:text-7xl text-foreground leading-tight text-balance">
                  Transform Your
                  <span className="gradient-primary bg-clip-text text-transparent"> Livestock Trading</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                  Experience the future of agricultural commerce with AI-powered insights, seamless communication, and
                  intelligent deal management.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="gradient-primary text-white shadow-medium hover:shadow-large transition-all duration-300 group"
                    >
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/signup">
                    <Button
                      size="lg"
                      className="gradient-primary text-white shadow-medium hover:shadow-large transition-all duration-300 group"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
                <Button size="lg" variant="outline" className="glass border-glass-border hover:bg-glass bg-transparent">
                  <Play className="mr-2 w-4 h-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-sans font-bold text-2xl text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative">
                <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-20"></div>
                <Card className="relative glass border-glass-border shadow-large overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-sans font-semibold text-lg">Live Dashboard</h3>
                          <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {stats.map((stat, index) => (
                            <div key={index} className="glass rounded-xl p-4 border border-glass-border">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">{stat.label}</span>
                                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                              </div>
                              <div className="font-sans font-bold text-xl">{stat.value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3">
                          {features.map((feature, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                                activeFeature === index ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                              }`}
                            >
                              <feature.icon
                                className={`w-5 h-5 ${activeFeature === index ? "text-primary" : "text-muted-foreground"}`}
                              />
                              <div>
                                <div className="font-medium text-sm">{feature.title}</div>
                                <div className="text-xs text-muted-foreground">{feature.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="gradient-primary text-white border-0">Features</Badge>
            <h2 className="font-sans font-bold text-4xl text-foreground text-balance">
              Everything you need to dominate livestock trading
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              From AI-powered matching to seamless transactions, we've built the complete platform for modern
              agricultural commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Smart Buyer Network",
                description:
                  "Connect with verified buyers using AI-powered matching algorithms that understand your livestock specifications.",
                color: "text-blue-500",
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description:
                  "Real-time pricing data, market trends, and predictive analytics to maximize your trading profits.",
                color: "text-green-500",
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description:
                  "Bank-grade security with escrow services, digital contracts, and fraud protection for every deal.",
                color: "text-purple-500",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "Access international markets with multi-currency support and automated compliance handling.",
                color: "text-orange-500",
              },
              {
                icon: Zap,
                title: "Instant Communication",
                description: "Unified inbox for WhatsApp, email, and SMS with automated responses and smart routing.",
                color: "text-yellow-500",
              },
              {
                icon: Building2,
                title: "Complete CRM",
                description:
                  "Manage your entire business with integrated pipeline, inventory, and customer relationship tools.",
                color: "text-red-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="glass border-glass-border shadow-soft hover:shadow-medium transition-all duration-300 group"
              >
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass border-glass-border shadow-large overflow-hidden">
            <CardContent className="p-12 space-y-8">
              <div className="space-y-4">
                <h2 className="font-sans font-bold text-4xl text-foreground text-balance">
                  Ready to revolutionize your livestock trading?
                </h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  Join thousands of traders who've already transformed their business with Digikraal.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="gradient-primary text-white shadow-medium hover:shadow-large transition-all duration-300"
                  >
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="glass border-glass-border bg-transparent">
                  Schedule Demo
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Premium Footer Component */}
      <PremiumFooter />

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </div>
  )
}
