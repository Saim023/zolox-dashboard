export type MaintenanceRequest = {
  id: string;
  propertyId: string;
  reportedBy: string;
  issueType: string;
  description: string;
  priority: "low" | "medium" | "high" | "emergency";
  status: "pending" | "in-progress" | "resolved" | "rejected";
  createdAt: string;
  updatedAt: string;
  photos: { id: string; url: string }[];
  notes: {
    id: string;
    authorId: string;
    content: string;
    createdAt: string;
  }[];
};

export type Property = {
  id: string;
  name: string;
  location: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "customer";
  avatar?: string;
};
