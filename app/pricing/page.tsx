"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowRight, Zap, Shield, Globe, Users, Building2, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"
import { PremiumLogo as Logo } from "@/components/ui/premium-logo"

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small farms and individual traders",
    price: "R 299",
    period: "per month",
    features: [
      "Up to 50 listings",
      "Basic buyer matching",
      "Email support",
      "Standard templates",
      "Basic analytics",
      "Mobile app access"
    ],
    limitations: [
      "No WhatsApp integration",
      "Limited automation",
      "Basic reporting"
    ],
    popular: false,
    cta: "Start Free Trial",
    href: "/dashboard"
  },
  {
    name: "Professional",
    description: "Ideal for growing livestock businesses",
    price: "R 799",
    period: "per month",
    features: [
      "Unlimited listings",
      "AI-powered buyer matching",
      "WhatsApp Business integration",
      "Advanced automation",
      "Real-time analytics",
      "Priority support",
      "Custom templates",
      "Deal pipeline management",
      "Transport coordination",
      "Payment processing"
    ],
    limitations: [],
    popular: true,
    cta: "Start Free Trial",
    href: "/dashboard"
  },
  {
    name: "Enterprise",
    description: "For large operations and cooperatives",
    price: "R 1,999",
    period: "per month",
    features: [
      "Everything in Professional",
      "Multi-user accounts",
      "Advanced reporting & analytics",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
      "Advanced security features",
      "Custom workflows",
      "24/7 phone support"
    ],
    limitations: [],
    popular: false,
    cta: "Contact Sales",
    href: "/contact"
  }
]

const features = [
  {
    icon: Users,
    title: "Smart Buyer Matching",
    description: "AI-powered algorithms match you with the right buyers based on preferences, location, and requirements."
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Track your performance with live dashboards, market insights, and predictive analytics."
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Bank-grade security with escrow services, digital contracts, and fraud protection."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access international markets with multi-currency support and automated compliance."
  },
  {
    icon: Building2,
    title: "Complete CRM",
    description: "Manage your entire business with integrated pipeline, inventory, and customer tools."
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Automate repetitive tasks with smart workflows and intelligent notifications."
  }
]

const faqs = [
  {
    question: "Can I change my plan anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All plans come with a 14-day free trial. No credit card required to get started."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and local payment methods including EFT and instant payments."
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Yes! Save up to 20% when you pay annually. Contact our sales team for custom enterprise pricing."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "Your data is always yours. You can export all your data before canceling, and we'll keep it available for 30 days after cancellation."
  },
  {
    question: "Do you offer training and support?",
    answer: "Yes! We provide comprehensive onboarding, training materials, and dedicated support based on your plan level."
  }
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
              <Link href="/pricing" className="text-foreground font-medium">
                Pricing
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
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
                <Zap className="w-3 h-3 mr-1" />
                Simple, Transparent Pricing
              </Badge>
              <h1 className="font-sans font-bold text-5xl lg:text-6xl text-foreground leading-tight text-balance">
                Choose Your
                <span className="gradient-primary bg-clip-text text-transparent"> Perfect Plan</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Start free, scale as you grow. No hidden fees, no surprises. Just powerful tools to transform your livestock trading business.
              </p>
            </div>

            {/* Billing Toggle */}
            {isClient && (
              <div className="flex items-center justify-center space-x-4">
                <span className={`text-sm ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  Monthly
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="relative"
                >
                  <div className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    isAnnual ? 'bg-primary translate-x-3' : 'bg-muted-foreground -translate-x-3'
                  }`} />
                </Button>
                <span className={`text-sm ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  Annual
                  <Badge className="ml-2 gradient-primary text-white border-0 text-xs">Save 20%</Badge>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative glass border-glass-border shadow-soft hover:shadow-large transition-all duration-500 ${
                  plan.popular ? 'ring-2 ring-primary/20 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-primary text-white border-0 shadow-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="font-sans text-2xl text-foreground">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground text-pretty">
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-foreground font-sans">
                        {isClient && isAnnual ? `R ${Math.round(parseInt(plan.price.replace('R ', '').replace(',', '')) * 0.8)}` : plan.price}
                      </span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>
                    {isClient && isAnnual && (
                      <p className="text-sm text-green-600 font-medium mt-2">
                        Save R {Math.round(parseInt(plan.price.replace('R ', '').replace(',', '')) * 0.2)} per month
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">What's included:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Not included:</h4>
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-center space-x-3">
                          <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link href={plan.href} className="block">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'gradient-primary text-white shadow-medium hover:shadow-large'
                          : 'bg-foreground text-background hover:bg-foreground/90'
                      } transition-all duration-300`}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 to-background/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="gradient-primary text-white border-0">Features</Badge>
            <h2 className="font-sans font-bold text-4xl text-foreground text-balance">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Powerful features designed specifically for livestock trading professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass border-glass-border shadow-soft hover:shadow-medium transition-all duration-300 group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="gradient-primary text-white border-0">FAQ</Badge>
            <h2 className="font-sans font-bold text-4xl text-foreground text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Everything you need to know about Digikraal CRM pricing and features.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass border-glass-border shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-sans font-semibold text-lg text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-pretty">
                    {faq.answer}
                  </p>
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
                  Ready to transform your livestock trading?
                </h2>
                <p className="text-xl text-muted-foreground text-pretty">
                  Join thousands of traders who've already revolutionized their business with Digikraal.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
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
    </div>
  )
}
