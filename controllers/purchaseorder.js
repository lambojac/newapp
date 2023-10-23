
import  PurchaseOrder from '../models/request'
// Create a purchase order
const purchaseoder=(async (req, res) => {
  try {
    const { orderDate, items } = req.body;
    const createdBy = req.user; // Assuming you have user authentication in place
    const purchaseOrder = new PurchaseOrder({ orderDate, items, createdBy });
    await purchaseOrder.save();
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an approval request for a purchase order
router.post('/:purchaseOrderId/approvals', async (req, res) => {
  try {
    const { approverId } = req.body;
    const purchaseOrder = await PurchaseOrder.findById(req.params.purchaseOrderId);
    if (!purchaseOrder) {
      return res.status(400).json({ message: 'Invalid purchase order ID' });
    }
    const approval = new PurchaseApproval({ purchaseOrder: purchaseOrder._id, approver: approverId });
    await approval.save();
    res.json(approva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement routes for viewing, updating, and managing purchase order approvals.

//purchase order approval
// routes/purchaseOrders.js (continued)
// Update the delivery status of a purchase order
router.put('/:purchaseOrderId/deliver', async (req, res) => {
    try {
      const purchaseOrder = await PurchaseOrder.findById(req.params.purchaseOrderId);
      if (!purchaseOrder) {
        return res.status(400).json({ message: 'Invalid purchase order ID' });
      }
      purchaseOrder.status = 'Delivered'; // Update the status
      await purchaseOrder.save();
      res.json(purchaseOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  