import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PremiumLogo } from '@/components/ui/premium-logo'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <PremiumLogo size="lg" variant="gradient" showText={true} />
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="gradient-primary text-white shadow-medium">
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="glass border-glass-border">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
