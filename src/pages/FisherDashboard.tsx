import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockFisherCatches } from '@/data/mockFishData';
import { 
  Fish, 
  ShoppingCart, 
  IndianRupee, 
  Plus,
  TrendingUp,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const overviewStats = [
  {
    title: "Today's Catch",
    value: '85 kg',
    icon: Fish,
    change: '+12% from yesterday',
    changeType: 'positive',
  },
  {
    title: 'Orders Received',
    value: '24',
    icon: ShoppingCart,
    change: '+8 new orders',
    changeType: 'positive',
  },
  {
    title: 'Total Earnings',
    value: '₹18,450',
    icon: IndianRupee,
    change: 'This week',
    changeType: 'neutral',
  },
  {
    title: 'Active Listings',
    value: '6',
    icon: Package,
    change: '2 low stock',
    changeType: 'warning',
  },
];

const FisherDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Listed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Sold':
        return 'bg-fresh/10 text-fresh border-fresh/20';
      case 'Pending':
        return 'bg-limited/10 text-limited border-limited/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Fisher Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your catches, orders, and earnings
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Catch
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-background">
                <DialogHeader>
                  <DialogTitle>Add New Catch</DialogTitle>
                  <DialogDescription>
                    List your fresh catch for sale on the marketplace.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fishType">Fish Type</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select fish type" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="hilsa">Hilsa</SelectItem>
                        <SelectItem value="rohu">Rohu</SelectItem>
                        <SelectItem value="katla">Katla</SelectItem>
                        <SelectItem value="pabda">Pabda</SelectItem>
                        <SelectItem value="bhetki">Bhetki</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity (kg)</Label>
                    <Input id="quantity" type="number" placeholder="Enter quantity" className="bg-background" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price per kg (₹)</Label>
                    <Input id="price" type="number" placeholder="Enter price" className="bg-background" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Catch Location</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="hooghly">Hooghly River</SelectItem>
                        <SelectItem value="padma">Padma River</SelectItem>
                        <SelectItem value="sundarbans">Sundarbans</SelectItem>
                        <SelectItem value="digha">Digha Coast</SelectItem>
                        <SelectItem value="bay">Bay of Bengal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(false)}>
                    List Catch
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {overviewStats.map((stat) => (
              <Card key={stat.title} className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className={`text-xs mt-1 ${
                    stat.changeType === 'positive' ? 'text-fresh' : 
                    stat.changeType === 'warning' ? 'text-limited' : 
                    'text-muted-foreground'
                  }`}>
                    {stat.changeType === 'positive' && <TrendingUp className="h-3 w-3 inline mr-1" />}
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Listings Table */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Your Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Fish Type</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price/kg</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Listed Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockFisherCatches.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.fishName}</TableCell>
                        <TableCell className="text-right">{item.quantity} kg</TableCell>
                        <TableCell className="text-right">₹{item.pricePerKg}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="outline" 
                            className={getStatusStyles(item.status)}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {item.listedDate}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-3">💡 Tips to Increase Sales</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                List your catch early morning for maximum visibility
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Keep your prices competitive with market rates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                Hilsa and Bhetki have highest demand this season
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FisherDashboard;
