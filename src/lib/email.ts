import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL_USER; // fallback to sending admin emails to the same address

export async function sendOrderConfirmation(order: any) {
  try {
    const customerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #7A2E3A;">Thank you for your order, ${order.customerName}!</h2>
        <p>Your order <strong>#${order.id}</strong> has been successfully placed and is currently pending processing.</p>
        <p><strong>Total Amount:</strong> Rs. ${order.totalAmount}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <br/>
        <p>We will notify you once your order is processed and shipped.</p>
        <br/>
        <p>Warm regards,<br/>Cinderella's Charmora</p>
      </div>
    `;

    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #7A2E3A;">New Order Received!</h2>
        <p>A new order <strong>#${order.id}</strong> has been placed by ${order.customerName}.</p>
        <p><strong>Email:</strong> ${order.customerEmail}</p>
        <p><strong>Total Amount:</strong> Rs. ${order.totalAmount}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <br/>
        <a href="${process.env.NEXTAUTH_URL}/admin/orders">View Order in Admin Panel</a>
      </div>
    `;

    // Send to Customer
    await transporter.sendMail({
      from: `"Cinderella's Charmora" <${process.env.EMAIL_USER}>`,
      to: order.customerEmail,
      subject: `Order Confirmation - #${order.id}`,
      html: customerHtml,
    });

    // Send to Admin
    if (ADMIN_EMAIL) {
      await transporter.sendMail({
        from: `"Cinderella's Charmora System" <${process.env.EMAIL_USER}>`,
        to: ADMIN_EMAIL,
        subject: `New Order Alert - #${order.id}`,
        html: adminHtml,
      });
    }

    return true;
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return false;
  }
}

export async function sendOrderStatusUpdate(order: any, previousStatus?: string) {
  try {
    let subject = `Update on your order #${order.id}`;
    let message = `<p>Your order status has been updated to: <strong>${order.status}</strong>.</p>`;

    // If tracking info was added
    if (order.trackingId && order.courierName) {
      subject = `Your order #${order.id} has been shipped!`;
      message = `
        <p>Good news! Your order is on its way.</p>
        <p><strong>Courier:</strong> ${order.courierName}</p>
        <p><strong>Tracking ID:</strong> ${order.trackingId}</p>
        <p>You can use this tracking ID on the courier's website to track your delivery.</p>
      `;
    }

    if (order.statusNote) {
      message += `<p><strong>Note from us:</strong> ${order.statusNote}</p>`;
    }

    const customerHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #7A2E3A;">Hi ${order.customerName},</h2>
        ${message}
        <br/>
        <p>Warm regards,<br/>Cinderella's Charmora</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Cinderella's Charmora" <${process.env.EMAIL_USER}>`,
      to: order.customerEmail,
      subject: subject,
      html: customerHtml,
    });

    return true;
  } catch (error) {
    console.error("Error sending order update email:", error);
    return false;
  }
}
