"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  ArrowRight,
  Heart,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { PremiumLogo as Logo } from "@/components/ui/premium-logo"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "/integrations" },
    { name: "API", href: "/api" },
    { name: "Security", href: "/security" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "Blog", href: "/blog" },
    { name: "Changelog", href: "/changelog" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
}

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/digikraal" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/digikraal" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/digikraal" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/digikraal" },
]

const features = [
  { icon: Zap, text: "Lightning Fast" },
  { icon: Shield, text: "Bank-Grade Security" },
  { icon: Globe, text: "Global Reach" },
]

export function PremiumFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
    setEmail("")
  }

  return (
    <footer className="relative bg-gradient-to-br from-background via-card to-muted border-t border-glass-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(21,128,61,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-glass-border">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge className="gradient-primary text-white border-0 shadow-soft">
                <Mail className="w-3 h-3 mr-1" />
                Newsletter
              </Badge>
              <h2 className="font-sans font-bold text-3xl lg:text-4xl text-foreground text-balance">
                Stay ahead of the livestock trading curve
              </h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                Get the latest market insights, product updates, and exclusive trading tips delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                required
              />
              <Button
                type="submit"
                className="gradient-primary text-white shadow-medium hover:shadow-large transition-all duration-300 group"
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="flex items-center justify-center space-x-8 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="group">
                <Logo size="lg" variant="gradient" showText={true} className="group-hover:scale-105 transition-transform duration-300" />
              </Link>

              <p className="text-muted-foreground text-pretty max-w-md">
                Revolutionizing livestock trading with AI-powered insights, seamless communication, and intelligent deal
                management. Join thousands of traders transforming their business.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Cape Town, South Africa</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+27 21 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>hello@digikraal.com</span>
                </div>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-xl glass border border-glass-border hover:bg-muted/50 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="font-sans font-semibold text-foreground">Product</h3>
                <ul className="space-y-2">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-sans font-semibold text-foreground">Company</h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-sans font-semibold text-foreground">Resources</h3>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-sans font-semibold text-foreground">Legal</h3>
                <ul className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-glass-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2025 Digikraal. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>in South Africa</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <Badge className="gradient-primary text-white border-0 shadow-soft">
                <Zap className="w-3 h-3 mr-1" />
                v2.0.1
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
