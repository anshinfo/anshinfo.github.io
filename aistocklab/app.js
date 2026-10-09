/* =========================================================
   AISTOCKLAB CHECKOUT ENGINE (₹299 DIGITAL SALES FUNNEL)
   - Dynamic UPI Intent Generation (Google Pay / PhonePe / Paytm)
   - Lead Capture & Direct Delivery Trigger
========================================================= */

(function () {
  'use strict';

  const payNowBtn = document.getElementById('payNowBtn');
  const custNameInput = document.getElementById('custName');
  const custWaInput = document.getElementById('custWa');
  const paymentStatus = document.getElementById('paymentStatus');

  if (payNowBtn) {
    payNowBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const name = custNameInput.value.trim();
      const phone = custWaInput.value.trim();

      if (!name || !phone) {
        alert('Please enter your Name and WhatsApp number to receive your copy.');
        return;
      }

      payNowBtn.textContent = 'Processing Payment...';
      payNowBtn.disabled = true;

      // UPI deep link & order tracking
      const upiUrl = `upi://pay?pa=ansh4090@okhdfcbank&pn=AIStockLab&am=299&cu=INR&tn=AIStockLab_Playbook_${encodeURIComponent(phone)}`;

      // WhatsApp direct fulfillment confirmation link
      const fulfillmentMsg = encodeURIComponent(
        `Hi! I just completed my payment of ₹299 for the AI Stock Research Playbook.\nName: ${name}\nPhone: ${phone}\nPlease verify and send my instant PDF download access.`
      );
      const waUrl = `https://wa.me/919876543210?text=${fulfillmentMsg}`;

      setTimeout(() => {
        paymentStatus.classList.remove('hidden');
        paymentStatus.classList.add('active');
        paymentStatus.innerHTML = `
          <strong>✅ Order Initiated!</strong><br>
          1. <a href="${upiUrl}" style="color: #10b981; font-weight: bold; text-decoration: underline;">Click here to pay ₹299 via UPI App (GPay/PhonePe/Paytm)</a>.<br>
          2. After payment, <a href="${waUrl}" target="_blank" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">Confirm on WhatsApp to get instant PDF download</a>.
        `;

        payNowBtn.textContent = 'Order Ready — Complete Payment Above';
      }, 700);
    });
  }
})();
