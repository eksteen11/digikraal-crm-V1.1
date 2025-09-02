import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye } from "lucide-react"
import Link from "next/link"

export default function DealsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Deals</h1>
            <p className="text-brand-gray-600">Manage all your deals</p>
          </div>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Deal
          </Button>
        </div>

        {/* Deals Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-brand-gray-600 border-b pb-2">
                <div className="col-span-2">Deal ID</div>
                <div className="col-span-2">Listing</div>
                <div className="col-span-2">Buyer</div>
                <div className="col-span-2">Value</div>
                <div className="col-span-2">Stage</div>
                <div className="col-span-1">Probability</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Rows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-brand-gray-100">
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-brand-black">DEAL-{1000 + i}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">Angus Cattle #{i}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">John Smith</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-brand-black">R {(250 + i * 50).toLocaleString()}</span>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Qualifying
                    </Badge>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-brand-black">{60 + i * 5}%</span>
                  </div>
                  <div className="col-span-1">
                    <Link href={`/deals/${1000 + i}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
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
