import express from 'express';
import Razorpay from 'razorpay';
import { createHmac } from 'crypto';
import { buyerModel, propertyModel } from '../model/table.js';

const paymentRouter = express.Router();

// Lazy initialization of Razorpay instance to ensure env vars are loaded
let razorpay = null;
const getRazorpay = () => {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }
  return razorpay;
};

// Create Razorpay Order
paymentRouter.post('/create-order', async (req, res) => {
  try {
    const { amount, propertyId, userId } = req.body;

    // Check if property is already sold
    const isSold = await buyerModel.findOne({ propertyId });
    if (isSold) {
      return res.json({
        code: 400,
        message: "Property Already Sold.",
        data: null
      });
    }

    // Get property details
    const property = await propertyModel.findById(propertyId);
    if (!property) {
      return res.json({
        code: 404,
        message: "Property not found.",
        data: null
      });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`.substring(0, 40),
      notes: {
        propertyId: propertyId,
        userId: userId,
        propertyTitle: property.title
      }
    };

    const order = await getRazorpay().orders.create(options);

    res.json({
      code: 200,
      message: "Order created successfully",
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        propertyTitle: property.title
      }
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.json({
      code: 500,
      message: "Error creating payment order",
      data: null
    });
  }
});

// Verify Payment and Complete Purchase
paymentRouter.post('/verify-payment', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      propertyId,
      userId 
    } = req.body;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.json({
        code: 400,
        message: "Payment verification failed. Invalid signature.",
        data: null
      });
    }

    // Check if property is already sold (double check)
    const isSold = await buyerModel.findOne({ propertyId });
    if (isSold) {
      return res.json({
        code: 400,
        message: "Property Already Sold.",
        data: null
      });
    }

    // Save the purchase with payment details
    const data = new buyerModel({ 
      userId, 
      propertyId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      paymentStatus: 'completed'
    });
    
    const result = await data.save();

    res.json({
      code: 200,
      message: "Payment successful! Property purchased.",
      data: result
    });
  } catch (err) {
    console.error('Error verifying payment:', err);
    res.json({
      code: 500,
      message: "Error verifying payment",
      data: null
    });
  }
});

// Get Razorpay Key (for frontend)
paymentRouter.get('/get-razorpay-key', (req, res) => {
  res.json({
    code: 200,
    message: "Key fetched successfully",
    data: {
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID'
    }
  });
});

export default paymentRouter;
