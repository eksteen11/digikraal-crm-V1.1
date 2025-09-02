"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Building2, TrendingUp, DollarSign, Activity, Zap, Target, Clock } from "lucide-react"
import Link from "next/link"
import { PremiumLogo as Logo } from "@/components/ui/premium-logo"

export default function DashboardPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { icon: Building2, label: "Active Listings", value: "24", change: "+2", trend: "up", color: "text-blue-500" },
    { icon: Users, label: "Active Buyers", value: "156", change: "+12", trend: "up", color: "text-green-500" },
    { icon: TrendingUp, label: "Open Deals", value: "8", change: "+3", trend: "up", color: "text-purple-500" },
    {
      icon: DollarSign,
      label: "Revenue (Month)",
      value: "R 2.4M",
      change: "+18%",
      trend: "up",
      color: "text-orange-500",
    },
  ]

  const quickActions = [
    {
      title: "Inbox",
      description: "Manage WhatsApp, email, and website conversations",
      href: "/inbox",
      icon: Activity,
      badge: "3 new",
      gradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Pipeline",
      description: "Track deals through your sales process",
      href: "/pipeline",
      icon: Target,
      badge: "8 active",
      gradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Listings",
      description: "Browse and manage livestock listings",
      href: "/listings",
      icon: Building2,
      badge: "24 live",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome Header with Animation */}
        <div
          className={`space-y-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="font-sans font-bold text-4xl text-foreground text-balance">Welcome back, John</h1>
                <Badge className="gradient-primary text-white border-0 shadow-soft">
                  <Zap className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
              <p className="text-muted-foreground text-lg text-pretty">
                Here's what's happening with your livestock trading business today
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last updated: 2 min ago</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className={`glass border-glass-border shadow-soft hover:shadow-medium transition-all duration-300 group overflow-hidden ${
                activeMetric === index ? "ring-2 ring-primary/20" : ""
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
                <div
                  className={`p-2 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform duration-300`}
                >
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-foreground font-sans">{metric.value}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">{metric.change}</span>
                      <span className="text-xs text-muted-foreground">from last week</span>
                    </div>
                  </div>
                </div>
                {activeMetric === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-12 animate-pulse"></div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Quick Actions */}
        <div
          className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-sans font-bold text-2xl text-foreground">Quick Actions</h2>
            <Button variant="outline" className="glass border-glass-border bg-transparent">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="glass border-glass-border shadow-soft hover:shadow-large transition-all duration-500 group overflow-hidden relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-xl gradient-primary shadow-soft group-hover:scale-110 transition-transform duration-300">
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="font-sans text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </CardTitle>
                        <CardDescription className="text-pretty">{action.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className="gradient-primary text-white border-0 shadow-soft">{action.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <Link href={action.href}>
                    <Button className="w-full gradient-primary text-white shadow-soft hover:shadow-medium transition-all duration-300 group">
                      Open {action.title}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div
          className={`transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="glass border-glass-border shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-sans text-xl text-foreground">Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "New buyer inquiry",
                    detail: "John Smith interested in Angus cattle",
                    time: "2 min ago",
                    type: "inquiry",
                  },
                  {
                    action: "Deal progressed",
                    detail: "R 450,000 deal moved to Contract stage",
                    time: "1 hour ago",
                    type: "deal",
                  },
                  {
                    action: "Payment received",
                    detail: "Invoice #INV-2024-001 paid in full",
                    time: "3 hours ago",
                    type: "payment",
                  },
                  {
                    action: "New listing added",
                    detail: "25 Brahman cattle listed by Farm Co.",
                    time: "5 hours ago",
                    type: "listing",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full gradient-primary"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">{activity.detail}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
