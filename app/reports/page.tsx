import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, Clock, DollarSign, Target } from "lucide-react"

export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Reports</h1>
            <p className="text-brand-gray-600">Analytics and insights for your business</p>
          </div>
          <Button variant="outline" className="border-brand-gray-100 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Lead → Deal Rate</CardTitle>
              <Target className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">32%</div>
              <p className="text-xs text-green-600">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Avg. Response Time</CardTitle>
              <Clock className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">2.4h</div>
              <p className="text-xs text-green-600">-0.5h from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Days to Close</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">14.2</div>
              <p className="text-xs text-red-600">+2.1 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Payment Success</CardTitle>
              <DollarSign className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">94%</div>
              <p className="text-xs text-green-600">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Sales Performance</TabsTrigger>
            <TabsTrigger value="species">Species Analysis</TabsTrigger>
            <TabsTrigger value="regions">Regional Performance</TabsTrigger>
            <TabsTrigger value="transport">Transport Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center text-brand-gray-600">
                    Revenue chart placeholder
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deal Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center text-brand-gray-600">
                    Pipeline chart placeholder
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="species" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Species Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center text-brand-gray-600">
                    Species pie chart placeholder
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Breeds</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { breed: "Black Angus", deals: 45, revenue: "R 2.1M" },
                      { breed: "Brahman", deals: 32, revenue: "R 1.8M" },
                      { breed: "Simmental", deals: 28, revenue: "R 1.4M" },
                      { breed: "Charolais", deals: 21, revenue: "R 1.1M" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-brand-gray-100/30 rounded-lg">
                        <div>
                          <h4 className="font-medium text-brand-black">{item.breed}</h4>
                          <p className="text-sm text-brand-gray-600">{item.deals} deals</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-brand-black">{item.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center text-brand-gray-600">
                  Regional map placeholder
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>On-Time Delivery Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center text-brand-gray-600">
                    Delivery rate chart placeholder
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transport Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center text-brand-gray-600">
                    Transport costs chart placeholder
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
