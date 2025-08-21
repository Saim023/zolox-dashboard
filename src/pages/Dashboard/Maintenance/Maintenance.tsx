/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";
import type { MaintenanceRequest } from "./maintenance-types";
import { maintenanceRequests, properties, users } from "@/data/maintenance-data";
import {
  CheckCircleIcon,
  ClipboardIcon,
  ClockIcon,
  FileSearchIcon,
  PlusIcon,
  StatCard,
  WrenchIcon,
  XCircleIcon,
} from "./maintenance-utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Data for Issue Type Distribution chart
export const issueTypeData = [
  { type: "Electrical", count: maintenanceRequests.filter((req) => req.issueType === "electrical").length },
  { type: "Plumbing", count: maintenanceRequests.filter((req) => req.issueType === "plumbing").length },
  { type: "Appliance", count: maintenanceRequests.filter((req) => req.issueType === "appliance").length },
  { type: "HVAC", count: maintenanceRequests.filter((req) => req.issueType === "heating/cooling").length },
  { type: "Structural", count: maintenanceRequests.filter((req) => req.issueType === "structural").length },
  { type: "Furniture", count: maintenanceRequests.filter((req) => req.issueType === "furniture").length },
  { type: "Cleaning", count: maintenanceRequests.filter((req) => req.issueType === "cleaning").length },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Maintenance() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [newRequest, setNewRequest] = useState<
    Omit<MaintenanceRequest, "id" | "createdAt" | "updatedAt" | "photos" | "notes">
  >({
    propertyId: "",
    reportedBy: "current-user-id",
    issueType: "",
    description: "",
    priority: "medium",
    status: "pending",
  });
  const [newNote, setNewNote] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setRequests(maintenanceRequests);
  }, []);

  // Data for Maintenance Requests by Property chart
  const maintenanceRequestsByProperty = properties.map((property) => {
    const requests = maintenanceRequests.filter((req) => req.propertyId === property.id);
    return {
      propertyName: property.name,
      totalRequests: requests.length,
      resolvedRequests: requests.filter((req) => req.status === "resolved").length,
      pendingRequests: requests.filter((req) => req.status === "pending").length,
    };
  });

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.issueType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesSearch &&
      (statusFilter === "all" || request.status === statusFilter) &&
      (priorityFilter === "all" || request.priority === priorityFilter) &&
      (propertyFilter === "all" || request.propertyId === propertyFilter) &&
      (activeTab === "all" || request.status === activeTab)
    );
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const stats = {
    pending: requests.filter((r) => r.status === "pending").length,
    inProgress: requests.filter((r) => r.status === "in-progress").length,
    resolved: requests.filter((r) => r.status === "resolved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
    total: requests.length,
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPropertyName = (id: string) => {
    const property = properties.find((p) => p.id === id);
    return property ? `${property.name} (${property.location})` : "Unknown Property";
  };

  const getUserName = (id: string) => {
    const user = users.find((u) => u.id === id);
    return user ? user.name : "Unknown User";
  };

  const getUserAvatar = (id: string): string | undefined => {
    const user = users.find((u) => u.id === id);
    return user?.avatar;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy h:mm a");
  };

  const handleSubmitNewRequest = () => {
    const newRequestWithId: MaintenanceRequest = {
      ...newRequest,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      photos: [],
      notes: [],
    };

    setRequests([...requests, newRequestWithId]);
    setIsDialogOpen(false);
    setNewRequest({
      propertyId: "",
      reportedBy: "current-user-id",
      issueType: "",
      description: "",
      priority: "medium",
      status: "pending",
    });
  };

  const addNoteToRequest = () => {
    if (!selectedRequest || !newNote.trim()) return;

    const updatedRequest = {
      ...selectedRequest,
      notes: [
        ...selectedRequest.notes,
        {
          id: `note-${Date.now()}`,
          authorId: "current-user-id",
          content: newNote,
          createdAt: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    setRequests(requests.map((req) => (req.id === selectedRequest.id ? updatedRequest : req)));
    setSelectedRequest(updatedRequest);
    setNewNote("");
  };

  const updateRequestStatus = (status: MaintenanceRequest["status"]) => {
    if (!selectedRequest) return;

    const updatedRequest = {
      ...selectedRequest,
      status,
      updatedAt: new Date().toISOString(),
    };

    setRequests(requests.map((req) => (req.id === selectedRequest.id ? updatedRequest : req)));
    setSelectedRequest(updatedRequest);
  };

  const priorityVariant = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    emergency: "bg-red-100 text-red-800",
  };

  const statusVariant = {
    pending: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto pb-10">
      <div className="mt-3 px-4 sm:px-5 lg:px-6 xl:px-7">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <StatCard
            title="Total Requests"
            value={stats.total}
            icon={<ClipboardIcon className="h-4 w-4" />}
            trend="up"
            trendValue="12%"
          />
          <StatCard title="Pending" value={stats.pending} icon={<ClockIcon className="h-4 w-4" />} variant="pending" />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={<WrenchIcon className="h-4 w-4" />}
            variant="in-progress"
          />
          <StatCard
            title="Resolved"
            value={stats.resolved}
            icon={<CheckCircleIcon className="h-4 w-4" />}
            variant="resolved"
          />
          <StatCard
            title="Rejected"
            value={stats.rejected}
            icon={<XCircleIcon className="h-4 w-4" />}
            variant="rejected"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests by Property</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={maintenanceRequestsByProperty}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="propertyName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalRequests" name="Total Requests" fill="#8884d8" />
                  <Bar dataKey="resolvedRequests" name="Resolved" fill="#82ca9d" />
                  <Bar dataKey="pendingRequests" name="Pending" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Issue Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={issueTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="type"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueTypeData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-10">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Maintenance Requests</CardTitle>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                  <PlusIcon className="mr-2 h-4 w-4" /> New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Maintenance Request</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="property" className="">
                      Property
                    </label>
                    <Select
                      value={newRequest.propertyId}
                      onValueChange={(value) => setNewRequest({ ...newRequest, propertyId: value })}
                    >
                      <SelectTrigger className="w-full cursor-pointer col-span-3">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.name} ({property.location})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="issueType" className="">
                      Issue Type
                    </label>
                    <Select
                      value={newRequest.issueType}
                      onValueChange={(value) => setNewRequest({ ...newRequest, issueType: value })}
                    >
                      <SelectTrigger className="w-full cursor-pointer col-span-3">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="appliance">Appliance</SelectItem>
                        <SelectItem value="heating/cooling">Heating/Cooling</SelectItem>
                        <SelectItem value="structural">Structural</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="priority" className="">
                      Priority
                    </label>
                    <Select
                      value={newRequest.priority}
                      onValueChange={(value) =>
                        setNewRequest({
                          ...newRequest,
                          priority: value as "low" | "medium" | "high" | "emergency",
                        })
                      }
                    >
                      <SelectTrigger className="w-full cursor-pointer col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      className="col-span-3"
                      value={newRequest.description}
                      onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                      placeholder="Describe the issue in detail..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="cursor-pointer"
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                    type="button"
                    onClick={handleSubmitNewRequest}
                  >
                    Submit Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-[300px]"
                />

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="all">
                      All Statuses
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="pending">
                      Pending
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="in-progress">
                      In Progress
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="resolved">
                      Resolved
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="rejected">
                      Rejected
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="all">
                      All Priorities
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="low">
                      Low
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="medium">
                      Medium
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="high">
                      High
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="emergency">
                      Emergency
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                  <SelectTrigger className="w-[220px] cursor-pointer">
                    <SelectValue placeholder="Filter by property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="all">
                      All Properties
                    </SelectItem>
                    {properties.map((property) => (
                      <SelectItem className="cursor-pointer" key={property.id} value={property.id}>
                        {property.name} ({property.location})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger className="data-[state=active]:text-blue-500" value="all">
                    All
                  </TabsTrigger>
                  <TabsTrigger className="data-[state=active]:text-blue-500" value="pending">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger className="data-[state=active]:text-blue-500" value="in-progress">
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger className="data-[state=active]:text-blue-500" value="resolved">
                    Resolved
                  </TabsTrigger>
                  <TabsTrigger className="data-[state=active]:text-blue-500" value="rejected">
                    Rejected
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Issue Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Reported</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRequests.length > 0 ? (
                  paginatedRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <p>{request.id}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{getPropertyName(request.propertyId)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        <Badge variant="outline" className="text-xs">
                          {request.issueType.replace("/", " / ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{request.description}</span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[300px]">
                              <p>{request.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${priorityVariant[request.priority]}`}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusVariant[request.status]}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(request.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          className="cursor-pointer text-blue-400 hover:text-blue-500"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <FileSearchIcon className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500">No maintenance requests found</p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setStatusFilter("all");
                            setPriorityFilter("all");
                            setPropertyFilter("all");
                            setSearchQuery("");
                            setActiveTab("all");
                          }}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
              <DialogContent className="sm:max-w-[800px]">
                {selectedRequest && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <span>Maintenance Request #{selectedRequest.id}</span>
                        <Badge variant="outline" className={statusVariant[selectedRequest.status]}>
                          {selectedRequest.status}
                        </Badge>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Property</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`/images/properties/${selectedRequest.propertyId}.jpg`} />
                              <AvatarFallback>{selectedRequest.propertyId.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p>{getPropertyName(selectedRequest.propertyId)}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Reported By</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={getUserAvatar(selectedRequest.reportedBy)} />
                              <AvatarFallback>{getUserName(selectedRequest.reportedBy).charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p>{getUserName(selectedRequest.reportedBy)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline" className={priorityVariant[selectedRequest.priority]}>
                              {selectedRequest.priority}
                            </Badge>
                            <Progress
                              value={
                                selectedRequest.priority === "low"
                                  ? 25
                                  : selectedRequest.priority === "medium"
                                  ? 50
                                  : selectedRequest.priority === "high"
                                  ? 75
                                  : 100
                              }
                              className="h-2 w-[100px]"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Issue Type</h4>
                          <p className="capitalize mt-1">{selectedRequest.issueType}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <div className="mt-1 p-3 bg-gray-50 rounded-md">
                          <p>{selectedRequest.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Date Reported</h4>
                          <p>{formatDate(selectedRequest.createdAt)}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                          <p>{formatDate(selectedRequest.updatedAt)}</p>
                        </div>
                      </div>

                      {selectedRequest.photos.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Photos</h4>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {selectedRequest.photos.map((photo) => (
                              <img
                                key={photo.id}
                                src={photo.url}
                                alt={`Maintenance photo for request ${selectedRequest.id}`}
                                className="h-24 w-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => window.open(photo.url, "_blank")}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Status Actions</h4>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant={selectedRequest.status === "pending" ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateRequestStatus("pending")}
                          >
                            Pending
                          </Button>
                          <Button
                            variant={selectedRequest.status === "in-progress" ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateRequestStatus("in-progress")}
                          >
                            In Progress
                          </Button>
                          <Button
                            variant={selectedRequest.status === "resolved" ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateRequestStatus("resolved")}
                          >
                            Resolved
                          </Button>
                          <Button
                            variant={selectedRequest.status === "rejected" ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateRequestStatus("rejected")}
                          >
                            Rejected
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Add Note</h4>
                        <div className="flex gap-2 mt-2">
                          <Textarea
                            placeholder="Add a note about this request..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                          />
                          <Button onClick={addNoteToRequest}>Add</Button>
                        </div>
                      </div>

                      {selectedRequest.notes.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Notes ({selectedRequest.notes.length})</h4>
                          <div className="mt-2 space-y-4">
                            {selectedRequest.notes.map((note) => (
                              <div key={note.id} className="border rounded-md p-3">
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={getUserAvatar(note.authorId)} />
                                      <AvatarFallback>{getUserName(note.authorId).charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{getUserName(note.authorId)}</span>
                                  </div>
                                  <span>{formatDate(note.createdAt)}</span>
                                </div>
                                <p className="mt-2">{note.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                        Close
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Pagination */}
        {paginatedRequests.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of{" "}
              {filteredRequests.length} requests
            </div>

            <div className="flex items-center gap-2">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show first pages, current page with neighbors, or last pages
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      size="sm"
                      variant={currentPage === pageNum ? "default" : "outline"}
                      className={
                        currentPage === pageNum
                          ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                          : "cursor-pointer"
                      }
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && <span className="px-2">...</span>}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </Button>
                )}
              </div>

              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
