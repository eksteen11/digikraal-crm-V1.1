import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, FileText, CreditCard, Truck } from "lucide-react"
import Link from "next/link"

export default function DealDetailPage({ params }: { params: { id: string } }) {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/deals">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Deals
              </Button>
            </Link>
            <div>
              <h1 className="font-serif font-bold text-3xl text-brand-black">Deal #{params.id}</h1>
              <p className="text-brand-gray-600">Angus Cattle - Smith Farm</p>
            </div>
          </div>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Edit className="mr-2 h-4 w-4" />
            Edit Deal
          </Button>
        </div>

        {/* Deal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Deal Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">R 250,000</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-blue-100 text-blue-800">Qualifying</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Probability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">65%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Days in Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">5</div>
            </CardContent>
          </Card>
        </div>

        {/* Deal Details */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Listing Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Species:</span>
                    <span className="text-brand-black">Cattle</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Breed:</span>
                    <span className="text-brand-black">Black Angus</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Quantity:</span>
                    <span className="text-brand-black">50 head</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Weight Class:</span>
                    <span className="text-brand-black">400-500kg</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Buyer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Name:</span>
                    <span className="text-brand-black">John Smith</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Company:</span>
                    <span className="text-brand-black">Smith Farms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Region:</span>
                    <span className="text-brand-black">Western Cape</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-gray-600">Contact:</span>
                    <span className="text-brand-black">+27 82 123 4567</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Deal Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-brand-gray-600 py-20">Timeline view coming soon</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-brand-gray-600 py-20">
                  <FileText className="mx-auto h-12 w-12 mb-4" />
                  No documents uploaded yet
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-brand-gray-600 py-20">
                  <CreditCard className="mx-auto h-12 w-12 mb-4" />
                  No payment information available
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport">
            <Card>
              <CardHeader>
                <CardTitle>Transport Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-brand-gray-600 py-20">
                  <Truck className="mx-auto h-12 w-12 mb-4" />
                  No transport arranged yet
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
