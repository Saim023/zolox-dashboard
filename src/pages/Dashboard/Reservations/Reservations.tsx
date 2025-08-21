"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as React from "react";
import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Download,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Filter,
  CheckCircle2,
  XCircle,
  CreditCard,
  BedDouble,
  Home,
  Phone,
  Mail,
} from "lucide-react";
import {
  demoData,
  type PaymentStatus,
  type Reservation,
  type ReservationsProps,
  type ReservationStatus,
} from "./reservations-data";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { IoWarningOutline } from "react-icons/io5";

// Utilities
const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "BDT" }).format(n);
const nightsBetween = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.max(0, e.getTime() - s.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const exportCsv = (rows: Reservation[]) => {
  const header = [
    "id",
    "guestName",
    "propertyName",
    "unit",
    "checkIn",
    "checkOut",
    "nights",
    "total",
    "status",
    "paymentStatus",
    "source",
    "phone",
    "email",
    "createdAt",
  ];
  const csv = [header.join(",")]
    .concat(
      rows.map((r) =>
        [
          r.id,
          r.guestName,
          r.propertyName,
          r.unit ?? "",
          r.checkIn,
          r.checkOut,
          String(nightsBetween(r.checkIn, r.checkOut)),
          String(r.total),
          r.status,
          r.paymentStatus,
          r.source,
          r.phone ?? "",
          r.email ?? "",
          r.createdAt,
        ]
          .map((v) => `"${String(v).replaceAll('"', '""')}"`)
          .join(",")
      )
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reservations-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

//Status badges
const StatusBadge: FC<{ status: ReservationStatus }> = ({ status }) => {
  const map: Record<ReservationStatus, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200/80",
    confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200/80",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200/80",
    completed: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80",
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge className={`border ${map[status]} font-medium`}>{label}</Badge>;
};

const PayBadge: FC<{ status: PaymentStatus }> = ({ status }) => {
  const map: Record<PaymentStatus, string> = {
    paid: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200/80",
    unpaid: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200/80",
    refunded: "bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200/80",
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge className={`border ${map[status]} font-medium`}>{label}</Badge>;
};

// Main component
const Reservations: FC<ReservationsProps> = ({ data, onView, onEdit, onConfirm, onCancel, onRefund, onExportCsv }) => {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<ReservationStatus | "all">("all");
  const [payment, setPayment] = React.useState<PaymentStatus | "all">("all");
  const [source, setSource] = React.useState<"all" | "Airbnb" | "Booking" | "Direct" | "Other">("all");
  const [from, setFrom] = React.useState<Date | undefined>(undefined);
  const [to, setTo] = React.useState<Date | undefined>(undefined);
  const [perPage, setPerPage] = React.useState<number>(10);
  const [page, setPage] = React.useState<number>(1);
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const [manageDialogOpen, setManageDialogOpen] = React.useState(false);

  const rows = React.useMemo(() => data ?? demoData, [data]);

  const filtered = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    const inQuery = q
      ? [r.id, r.guestName, r.propertyName, r.unit ?? "", r.phone ?? "", r.email ?? ""].some((v) =>
          String(v).toLowerCase().includes(q)
        )
      : true;
    const inStatus = status === "all" ? true : r.status === status;
    const inPayment = payment === "all" ? true : r.paymentStatus === payment;
    const inSource = source === "all" ? true : r.source === source;
    const inFrom = from ? new Date(r.checkIn) >= new Date(from) : true;
    const inTo = to ? new Date(r.checkOut) <= new Date(to) : true;
    return inQuery && inStatus && inPayment && inSource && inFrom && inTo;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  React.useEffect(() => {
    setPage(1);
  }, [query, status, payment, source, from, to, perPage]);

  const allOnPageSelected = pageData.every((r) => selected[r.id]);
  const selectedIds = Object.entries(selected)
    .filter(([, v]) => v)
    .map(([k]) => k);

  const clearSelection = () => setSelected({});

  const bulkConfirm = () => {
    if (selectedIds.length === 0) return;
    onConfirm ? onConfirm(selectedIds) : console.log("Confirm:", selectedIds);

    toast.success(`${selectedIds.length} reservation(s) confirmed`, {
      style: { color: "#000" },
      icon: <CheckCircle2 className="text-xl text-emerald-500" />,
    });

    clearSelection();
    setManageDialogOpen(false);
  };

  const bulkCancel = () => {
    if (selectedIds.length === 0) return;
    onCancel ? onCancel(selectedIds) : console.log("Cancel:", selectedIds);

    toast.success(`${selectedIds.length} reservation(s) cancelled`, {
      style: { color: "#000" },
      icon: <XCircle className="text-xl text-rose-500" />,
    });

    clearSelection();
    setManageDialogOpen(false);
  };

  const bulkRefund = () => {
    if (selectedIds.length === 0) return;
    onRefund ? onRefund(selectedIds) : console.log("Refund:", selectedIds);

    toast.success(`${selectedIds.length} reservation(s) refunded`, {
      style: { color: "#000" },
      icon: <CreditCard className="text-xl text-sky-500" />,
    });

    clearSelection();
    setManageDialogOpen(false);
  };

  const exportSelected = () => {
    const rowsToExport = rows.filter((r) => selected[r.id]);
    if (onExportCsv) onExportCsv(rowsToExport);
    else exportCsv(rowsToExport.length ? rowsToExport : filtered);
  };

  // Stats
  const stats = React.useMemo(() => {
    const total = filtered.length;
    const upcoming = filtered.filter((r) => new Date(r.checkIn) >= new Date()).length;
    const pending = filtered.filter((r) => r.status === "pending").length;
    const cancelled = filtered.filter((r) => r.status === "cancelled").length;
    const revenue = filtered
      .filter((r) => r.status === "confirmed" || r.status === "completed")
      .reduce((sum, r) => sum + r.total, 0);
    return { total, upcoming, pending, cancelled, revenue };
  }, [filtered]);

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto pb-14 mt-3 px-4 sm:px-5 lg:px-6 xl:px-7">
      {/* Header + Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Reservations</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 cursor-pointer" onClick={exportSelected}>
            <Download className="h-4 w-4 text-muted-foreground" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600">
                <BedDouble className="h-4 w-4" />
                <span className="hidden sm:inline">New Reservation</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Create reservation</DialogTitle>
                <DialogDescription>Quickly add a manual reservation.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="guest">Guest</Label>
                  <Input id="guest" className="col-span-3" placeholder="Guest full name" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label htmlFor="property">Property</Label>
                  <Input id="property" className="col-span-3" placeholder="Property / Unit" />
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label>Dates</Label>
                  <div className="col-span-3 grid grid-cols-2 gap-2">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-3">
                  <Label>Total</Label>
                  <Input type="number" className="col-span-3" placeholder="0" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 cursor-pointer">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="shadow-sm bg-blue-100">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <UsersIcon className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-purple-100">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarIcon className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{stats.upcoming}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-amber-100">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <ClockIcon className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-green-100">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Potential Revenue</CardTitle>
            <CreditCard className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{currency(stats.revenue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mt-10 mb-4">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search/Filter */}
          <div className="">
            <Label className="sr-only" htmlFor="search">
              Search
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="search"
                placeholder="Search by guest, property, phone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full"
              />
              <Button variant="outline" className="gap-2 hidden sm:flex cursor-pointer">
                <Filter className="h-4 w-4 text-muted-foreground" />
                Filter
              </Button>
            </div>
          </div>
          <DatePicker date={from} setDate={setFrom} placeholder="Check-in From" />
          <DatePicker date={to} setDate={setTo} placeholder="Check-out To" />

          {/* Status */}
          <div>
            <Label className="sr-only">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as any)}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="all">
                  All Statuses
                </SelectItem>
                <SelectItem className="cursor-pointer" value="pending">
                  Pending
                </SelectItem>
                <SelectItem className="cursor-pointer" value="confirmed">
                  Confirmed
                </SelectItem>
                <SelectItem className="cursor-pointer" value="completed">
                  Completed
                </SelectItem>
                <SelectItem className="cursor-pointer" value="cancelled">
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment */}
          <div>
            <Label className="sr-only">Payment</Label>
            <Select value={payment} onValueChange={(v) => setPayment(v as any)}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="all">
                  All Payments
                </SelectItem>
                <SelectItem className="cursor-pointer" value="paid">
                  Paid
                </SelectItem>
                <SelectItem className="cursor-pointer" value="unpaid">
                  Unpaid
                </SelectItem>
                <SelectItem className="cursor-pointer" value="refunded">
                  Refunded
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Source */}
          <div>
            <Label className="sr-only">Source</Label>
            <Select value={source} onValueChange={(v) => setSource(v as any)}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="all">
                  All Sources
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Direct">
                  Direct
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Airbnb">
                  Airbnb
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Booking">
                  Booking
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Other">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Manage Selected Reservations */}
      <Dialog open={manageDialogOpen} onOpenChange={setManageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Selected Reservations</DialogTitle>
            <DialogDescription>
              <strong>{selectedIds.length}</strong> reservation{selectedIds.length > 1 && "s"} selected. Choose what you
              want to do:
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer"
              onClick={() => {
                bulkConfirm();
              }}
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Confirm
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer"
              onClick={() => {
                bulkCancel();
              }}
            >
              <XCircle className="h-4 w-4 text-rose-600" />
              Cancel
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer"
              onClick={() => {
                bulkRefund();
              }}
            >
              <CreditCard className="h-4 w-4 text-sky-600" />
              Refund
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <div className="rounded-lg border bg-card mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[32px]">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={(v) => {
                    const patch: Record<string, boolean> = { ...selected };
                    pageData.forEach((r) => (patch[r.id] = Boolean(v)));
                    setSelected(patch);
                  }}
                  aria-label="Select all on page"
                />
              </TableHead>
              <TableHead>Reservation</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead className="hidden md:table-cell">Dates</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">Payment</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>
                <Button
                  className="h-6 w-[55px] cursor-pointer text-white hover:text-white bg-blue-400 hover:bg-blue-500"
                  variant="outline"
                  onClick={() => {
                    if (selectedIds.length > 0) {
                      setManageDialogOpen(true);
                    } else {
                      toast.warning(`Please select at least one reservation`, {
                        style: {
                          color: "#000",
                        },
                        icon: <IoWarningOutline className="text-xl text-yellow-400" />,
                      });
                    }
                  }}
                >
                  Action
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((r) => (
              <TableRow key={r.id} className="hover:bg-muted/40">
                <TableCell>
                  <Checkbox
                    checked={Boolean(selected[r.id])}
                    onCheckedChange={(v) => setSelected((s) => ({ ...s, [r.id]: Boolean(v) }))}
                    aria-label={`Select ${r.id}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium leading-none">{r.propertyName}</div>
                      <div className="text-xs text-muted-foreground">{r.unit ?? "—"}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <div className="font-medium leading-none">{r.guestName}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {r.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {r.phone}
                        </span>
                      )}
                      {r.email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {r.email}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="space-y-0.5">
                    <div className="leading-none">
                      {new Date(r.checkIn).toLocaleDateString()} – {new Date(r.checkOut).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">{nightsBetween(r.checkIn, r.checkOut)} night(s)</div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusBadge status={r.status} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <PayBadge status={r.paymentStatus} />
                </TableCell>
                <TableCell className="text-right font-medium">{currency(r.total)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                        <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => (onView ? onView(r) : alert(`View ${r.id}`))}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => (onEdit ? onEdit(r) : alert(`Edit ${r.id}`))}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          onConfirm
                            ? onConfirm([r.id])
                            : toast.warning(`Confirm ${r.id}`, {
                                style: {
                                  color: "#000",
                                },
                                icon: <CreditCard className="text-xl text-sky-500" />,
                              })
                        }
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" /> Confirm
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          onCancel
                            ? onCancel([r.id])
                            : toast.warning(`Cancel ${r.id}`, {
                                style: {
                                  color: "#000",
                                },
                                icon: <XCircle className="text-xl text-rose-500" />,
                              })
                        }
                      >
                        <XCircle className="mr-2 h-4 w-4 text-rose-600" /> Cancel
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          onRefund
                            ? onRefund([r.id])
                            : toast.warning(`Refund ${r.id}`, {
                                style: {
                                  color: "#000",
                                },
                                icon: <CreditCard className="text-xl text-sky-500" />,
                              })
                        }
                      >
                        <CreditCard className="mr-2 h-4 w-4 text-sky-600" /> Refund
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {!pageData.length && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                  No reservations match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row pb-6">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{pageData.length}</strong> of <strong>{filtered.length}</strong> filtered — Page {page} /{" "}
          {totalPages}
        </div>
        <div className="flex items-center gap-2">
          {/* Per Page */}
          <div>
            <Select value={String(perPage)} onValueChange={(v) => setPerPage(Number(v))}>
              <SelectTrigger className="h-9 w-[80px] cursor-pointer">
                <SelectValue placeholder="Per Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="h-9 w-[90px] cursor-pointer"
            variant="outline"
            size="sm"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            First
          </Button>
          <Button
            className="h-9 w-[90px] cursor-pointer"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            className="h-9 w-[90px] cursor-pointer"
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
          <Button
            className="h-9 w-[90px] cursor-pointer"
            variant="outline"
            size="sm"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reservations;

// Local inline icons
const UsersIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path d="M16 14c2.761 0 5 2.239 5 5v1H3v-1c0-2.761 2.239-5 5-5h8Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ClockIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
