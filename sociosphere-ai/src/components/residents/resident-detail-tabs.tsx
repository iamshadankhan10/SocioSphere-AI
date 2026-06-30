// =============================================================
// RESIDENT DETAIL TABS — Tab panels for the detail page.
//
// 6 Tabs:
// 1. Personal Info — DOB, emergency contact, move-in date
// 2. Family Members — Table of family members
// 3. Vehicles — Cards showing registered vehicles
// 4. Payments — Payment history table with status badges
// 5. Complaints — Complaint list with status
// 6. Visitors — Recent visitor log
//
// Each tab is a separate function for readability.
// =============================================================

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  User,
  Users,
  Car,
  CreditCard,
  MessageSquareWarning,
  UserCheck,
  Calendar,
  Phone,
  Shield,
} from "lucide-react";
import type { Resident } from "@/lib/types";

interface ResidentDetailTabsProps {
  resident: Resident;
}

export function ResidentDetailTabs({ resident }: ResidentDetailTabsProps) {
  return (
    <Tabs defaultValue="personal" className="w-full">
      {/* ---- Tab Navigation ---- */}
      <TabsList className="w-full flex-wrap justify-start gap-1 h-auto p-1">
        <TabsTrigger value="personal" className="gap-1.5 text-xs sm:text-sm">
          <User className="h-3.5 w-3.5" />
          Personal
        </TabsTrigger>
        <TabsTrigger value="family" className="gap-1.5 text-xs sm:text-sm">
          <Users className="h-3.5 w-3.5" />
          Family ({resident.familyMembers.length})
        </TabsTrigger>
        <TabsTrigger value="vehicles" className="gap-1.5 text-xs sm:text-sm">
          <Car className="h-3.5 w-3.5" />
          Vehicles ({resident.vehicles.length})
        </TabsTrigger>
        <TabsTrigger value="payments" className="gap-1.5 text-xs sm:text-sm">
          <CreditCard className="h-3.5 w-3.5" />
          Payments
        </TabsTrigger>
        <TabsTrigger value="complaints" className="gap-1.5 text-xs sm:text-sm">
          <MessageSquareWarning className="h-3.5 w-3.5" />
          Complaints ({resident.complaints.length})
        </TabsTrigger>
        <TabsTrigger value="visitors" className="gap-1.5 text-xs sm:text-sm">
          <UserCheck className="h-3.5 w-3.5" />
          Visitors ({resident.visitors.length})
        </TabsTrigger>
      </TabsList>

      {/* ---- Tab 1: Personal Information ---- */}
      <TabsContent value="personal" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Each info item: label + value */}
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Date of Birth"
                value={formatDate(resident.dateOfBirth)}
              />
              <InfoItem
                icon={<Phone className="h-4 w-4" />}
                label="Phone Number"
                value={resident.phone}
              />
              <InfoItem
                icon={<User className="h-4 w-4" />}
                label="Email Address"
                value={resident.email}
              />
              <InfoItem
                icon={<Shield className="h-4 w-4" />}
                label="Emergency Contact"
                value={resident.emergencyContact}
              />
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Move-in Date"
                value={formatDate(resident.moveInDate)}
              />
              <InfoItem
                icon={<Users className="h-4 w-4" />}
                label="Family Members"
                value={`${resident.familyMembersCount} member(s)`}
              />
              <InfoItem
                icon={<Car className="h-4 w-4" />}
                label="Primary Vehicle"
                value={resident.vehicleNumber || "No vehicle registered"}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---- Tab 2: Family Members ---- */}
      <TabsContent value="family" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Family Members</CardTitle>
          </CardHeader>
          <CardContent>
            {resident.familyMembers.length === 0 ? (
              <EmptyState message="No family members added yet." />
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Relation</TableHead>
                      <TableHead>Age</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resident.familyMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.relation}</TableCell>
                        <TableCell>{member.age} years</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---- Tab 3: Vehicles ---- */}
      <TabsContent value="vehicles" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Registered Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            {resident.vehicles.length === 0 ? (
              <EmptyState message="No vehicles registered." />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {resident.vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-start gap-4 rounded-lg border p-4"
                  >
                    {/* Vehicle Icon */}
                    <div className="rounded-lg bg-primary/10 p-2.5">
                      <Car className="h-5 w-5 text-primary" />
                    </div>
                    {/* Vehicle Details */}
                    <div>
                      <p className="font-medium">{vehicle.model}</p>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.type} • {vehicle.color}
                      </p>
                      <p className="mt-1 text-sm font-mono">{vehicle.number}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---- Tab 4: Payments ---- */}
      <TabsContent value="payments" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {resident.payments.length === 0 ? (
              <EmptyState message="No payment records found." />
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Paid Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resident.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.month}</TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "text-xs",
                              payment.status === "Paid"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : payment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            )}
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {payment.paidDate
                            ? formatDate(payment.paidDate)
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---- Tab 5: Complaints ---- */}
      <TabsContent value="complaints" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            {resident.complaints.length === 0 ? (
              <EmptyState message="No complaints raised." />
            ) : (
              <div className="space-y-3">
                {resident.complaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {complaint.category} • {formatDate(complaint.createdDate)}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "text-xs",
                        complaint.status === "Resolved"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : complaint.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      )}
                    >
                      {complaint.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---- Tab 6: Visitors ---- */}
      <TabsContent value="visitors" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            {resident.visitors.length === 0 ? (
              <EmptyState message="No recent visitors." />
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Visitor Name</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead>In Time</TableHead>
                      <TableHead>Out Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resident.visitors.map((visitor) => (
                      <TableRow key={visitor.id}>
                        <TableCell className="font-medium">{visitor.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {visitor.purpose}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {formatDate(visitor.visitDate)}
                        </TableCell>
                        <TableCell>{visitor.inTime}</TableCell>
                        <TableCell>{visitor.outTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// ---------------------------
// HELPER: Format ISO date string to readable format
// e.g., "2026-06-15" → "15 Jun 2026"
// ---------------------------
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ---------------------------
// HELPER: InfoItem — Renders a label/value pair with an icon
// Used in the Personal Information tab
// ---------------------------
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

// ---------------------------
// HELPER: EmptyState — Shows when a tab has no data
// ---------------------------
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <p className="text-sm">{message}</p>
    </div>
  );
}
