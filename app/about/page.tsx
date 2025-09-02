"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Zap, Globe, Heart, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { PremiumLogo as Logo } from "@/components/ui/premium-logo"

const stats = [
  { value: "2.4M+", label: "Livestock Traded", change: "+23%" },
  { value: "15K+", label: "Active Traders", change: "+18%" },
  { value: "98.5%", label: "Success Rate", change: "+2.1%" },
  { value: "24/7", label: "Support", change: "Always" },
]

const team = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    description: "Former livestock trader with 15+ years experience in agricultural commerce.",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Sarah Johnson",
    role: "CTO",
    description: "Tech leader with expertise in AI and agricultural technology solutions.",
    image: "/placeholder-user.jpg"
  },
  {
    name: "Mike Chen",
    role: "Head of Product",
    description: "Product strategist focused on user experience and market innovation.",
    image: "/placeholder-user.jpg"
  }
]

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to revolutionizing livestock trading through technology, making it more efficient, transparent, and profitable for everyone."
  },
  {
    icon: Users,
    title: "Community-First",
    description: "Our platform is built by traders, for traders. We listen to our community and continuously improve based on real-world feedback."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We leverage cutting-edge AI and technology to solve complex problems in agricultural commerce and trading."
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "We're building tools that help farmers and traders worldwide access better markets and fairer prices."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="group">
              <Logo size="md" variant="gradient" showText={true} className="group-hover:scale-105 transition-transform duration-300" />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-foreground font-medium">
                About
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="gradient-primary text-white shadow-medium">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="gradient-primary text-white border-0 shadow-soft">
                <Heart className="w-3 h-3 mr-1" />
                About Digikraal
              </Badge>
              <h1 className="font-sans font-bold text-5xl lg:text-6xl text-foreground leading-tight text-balance">
                Revolutionizing
                <span className="gradient-primary bg-clip-text text-transparent"> Agricultural Commerce</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                We're on a mission to transform livestock trading through technology, making it more efficient, transparent, and profitable for farmers and traders worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gradient-primary text-white shadow-medium hover:shadow-large transition-all duration-300 group"
                >
                  Join Our Mission
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="glass border-glass-border hover:bg-muted/50">
                Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="glass border-glass-border shadow-soft hover:shadow-medium transition-all duration-300 text-center"
              >
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-foreground font-sans mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 to-background/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="gradient-primary text-white border-0">Our Story</Badge>
            <h2 className="font-sans font-bold text-4xl text-foreground text-balance">
              Born from real-world experience
            </h2>
          </div>

          <Card className="glass border-glass-border shadow-large">
            <CardContent className="p-8 space-y-6">
              <p className="text-lg text-muted-foreground text-pretty">
                Digikraal was founded by a team of former livestock traders who experienced firsthand the challenges and inefficiencies in agricultural commerce. We saw how technology was transforming other industries, but livestock trading remained stuck in traditional methods.
              </p>
              <p className="text-lg text-muted-foreground text-pretty">
                Our founders spent years building relationships with farmers, understanding their pain points, and witnessing the impact of poor market access and unfair pricing. This experience drove us to create a platform that would level the playing field and give every trader access to the tools they need to succeed.
              </p>
              <p className="text-lg text-muted-foreground text-pretty">
                Today, Digikraal serves thousands of traders across multiple countries, processing millions in livestock transactions while maintaining the personal touch and trust that's essential in agricultural commerce.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="gradient-primary text-white border-0">Our Values</Badge>
            <h2 className="font-sans font-bold text-4xl text-foreground text-balance">
              What drives us forward
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Our core values guide everything we do, from product development to customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="glass border-glass-border shadow-soft hover:shadow-medium transition-all duration-300 group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground text-pretty">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 to-background/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="gradient-primary text-white border-0">Our Team</Badge>
            <h2 className="font-sans font-bold text-4xl text-foreground text-balance">
              Meet the people behind Digikraal
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              A diverse team of experts in agriculture, technology, and business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="glass border-glass-border shadow-soft hover:shadow-medium transition-all duration-300 text-center group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground text-pretty text-sm">{member.description}</p>
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
                  Ready to join our mission?
                </h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  Be part of the agricultural commerce revolution. Start your free trial today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="gradient-primary text-white shadow-medium hover:shadow-large transition-all duration-300"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="glass border-glass-border bg-transparent">
                  Contact Us
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}