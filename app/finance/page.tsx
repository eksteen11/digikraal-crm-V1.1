import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ExternalLink } from "lucide-react"

export default function FinancePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-3xl text-brand-black">Finance</h1>
            <p className="text-brand-gray-600">Manage invoices and payments</p>
          </div>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>

        {/* Finance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Outstanding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">R 1.2M</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Paid This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R 850K</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">R 120K</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-brand-gray-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-black">R 2.4M</div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-brand-gray-600 border-b pb-2">
                <div className="col-span-2">Invoice No.</div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-2">Deal</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Due Date</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Rows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-brand-gray-100">
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-brand-black">INV-{3000 + i}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">John Smith</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-brand-black">DEAL-{1000 + i}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-brand-black">R {(250 + i * 50).toLocaleString()}</span>
                  </div>
                  <div className="col-span-2">
                    <Badge
                      variant="secondary"
                      className={
                        i % 3 === 0
                          ? "bg-green-100 text-green-800"
                          : i % 3 === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {i % 3 === 0 ? "Paid" : i % 3 === 1 ? "Pending" : "Overdue"}
                    </Badge>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-brand-black">
                      {new Date(Date.now() + i * 86400000).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
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
