import mongoose from "mongoose"
const requestSchema=mongoose.schema({
materialRequests: [
    {
      itemName: String,
      quantity: Number,
      assignedTo: String,
      status: {
        type: String,
        default: "pending",
      },
    },
  ],

  // Maintenance Requests
  maintenanceRequests: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      description: String,
      status: {
        type: String,
        default: "pending",
      },
    },
  ],

  // Calendar Events
  calendarEvents: [
    {
      title: String,
      description: String,
      dateTime: Date,
    },
  ],

  // Rent Tracking
  rentTracking: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  dueDate: Date,
  isPaid: {
    type: Boolean,
    default: false,
  },

  // Documents
  documents: [
    {
      name: String,
      description: String,
      status: {
        type: String,
        default: "Pending",
      },
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],

  // Document Approvals
  documentApprovals: [
    {
    
      approver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        default: "Pending",
      },
    },
  ],

  // Document Status
  documentStatuses: [
    {
      orderDate: Date,
      items: [
        {
          product: String,
          quantity: Number,
        },
      ],
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        default: "Pending",
      },
    },
  ],

  // Purchase Orders
  purchaseOrders: [
    {
      purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder" },
      approver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        default: "Pending",
      },
    },
  ],

  // Maintenance Costs
  maintenanceCosts: [
    {
      maintenanceType: String,
      cost: Number,
      date: Date,
      property: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],

  // Key Performance Indicators (KPIs)
  kPIs: [
    {
      name: String,
      description: String,
      target: Number,
      currentValue: Number,
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ]
})
module.exports=mongoose.models("requests",requestSchema)