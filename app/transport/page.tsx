import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload } from "lucide-react"

export default function TransportPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Transport</h1>
            <p className="text-brand-gray-600">Manage transport jobs and logistics</p>
          </div>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Transport Job
          </Button>
        </div>

        {/* Transport Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Transport Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-brand-gray-600 border-b pb-2">
                <div className="col-span-2">Job ID</div>
                <div className="col-span-2">Origin</div>
                <div className="col-span-2">Destination</div>
                <div className="col-span-1">Distance</div>
                <div className="col-span-2">Transporter</div>
                <div className="col-span-1">ETA</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Rows */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-brand-gray-100">
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-brand-black">TJ-{2000 + i}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">Gauteng</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">Western Cape</span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-brand-black">{1200 + i * 100}km</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">ABC Transport</span>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-brand-black">{2 + i} days</span>
                  </div>
                  <div className="col-span-1">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      In Transit
                    </Badge>
                  </div>
                  <div className="col-span-1">
                    <Button variant="ghost" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
