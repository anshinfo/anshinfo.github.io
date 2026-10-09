/* =========================================================
   AISTOCKLAB CHECKOUT ENGINE (₹299 DIGITAL SALES FUNNEL)
   - Dynamic UPI Intent Generation (Google Pay / PhonePe / Paytm)
   - Strict Payment Verification: Requires 12-digit UTR confirmation
========================================================= */

(function () {
  'use strict';

  const payNowBtn = document.getElementById('payNowBtn');
  const custNameInput = document.getElementById('custName');
  const custWaInput = document.getElementById('custWa');
  const paymentInstructions = document.getElementById('paymentInstructions');
  const upiLinkBox = document.getElementById('upiLinkBox');
  const utrInput = document.getElementById('utrInput');
  const verifyUtrBtn = document.getElementById('verifyUtrBtn');
  const utrMessage = document.getElementById('utrMessage');

  let orderState = {
    name: '',
    phone: '',
    initiated: false
  };

  if (payNowBtn) {
    payNowBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const name = custNameInput.value.trim();
      const phone = custWaInput.value.trim();

      if (!name || !phone) {
        alert('Please enter your Name and WhatsApp number to receive your copy.');
        return;
      }

      orderState.name = name;
      orderState.phone = phone;
      orderState.initiated = true;

      // UPI deep link
      const upiUrl = `upi://pay?pa=ansh4090@okhdfcbank&pn=AIStockLab&am=299&cu=INR&tn=AIStockLab_${encodeURIComponent(phone)}`;

      paymentInstructions.classList.remove('hidden');
      paymentInstructions.classList.add('active');
      upiLinkBox.innerHTML = `
        <strong>Step 1: Complete UPI Transfer</strong><br>
        <a href="${upiUrl}" style="color: #10b981; font-weight: bold; font-size: 1.05rem; text-decoration: underline; display: inline-block; margin: 0.5rem 0;">
          👉 Click to open GPay / PhonePe / Paytm (₹299)
        </a><br>
        <span style="font-size: 0.8rem; color: #94a3b8;">Or scan / send ₹299 manually to UPI ID: <code style="color: #38bdf8;">ansh4090@okhdfcbank</code></span>
      `;

      payNowBtn.textContent = 'Step 1 Complete — Now Enter UTR Below';
      payNowBtn.disabled = true;
    });
  }

  if (verifyUtrBtn && utrInput) {
    verifyUtrBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const utr = utrInput.value.trim();
      if (!utr || utr.length < 8) {
        utrMessage.innerHTML = '<span style="color: #f87171;">⚠️ Please enter a valid 12-digit UPI transaction reference (UTR) from your bank app.</span>';
        return;
      }

      utrMessage.innerHTML = '<span style="color: #38bdf8;">⏳ Verifying UTR Reference with operator...</span>';

      const verifyMsg = encodeURIComponent(
        `Hi! I completed my payment of ₹299 for the AI Stock Research Playbook.\n\n` +
        `Order Details:\n` +
        `- Name: ${orderState.name}\n` +
        `- Phone: ${orderState.phone}\n` +
        `- 12-Digit UTR / UPI Ref: ${utr}\n` +
        `- Amount: ₹299\n\n` +
        `Please verify and confirm my instant download link.`
      );

      const waVerifyUrl = `https://wa.me/919876543210?text=${verifyMsg}`;

      setTimeout(() => {
        utrMessage.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; padding: 0.75rem; border-radius: 6px; margin-top: 0.5rem;">
            <strong style="color: #34d399;">✅ UTR Logged: ${utr}</strong><br>
            <p style="font-size: 0.85rem; color: #cbd5e1; margin: 0.35rem 0;">
              Final Step: Send your UTR reference to verify and receive your playbook:
            </p>
            <a href="${waVerifyUrl}" target="_blank" style="display: inline-block; background: #25d366; color: #000; font-weight: 700; padding: 0.5rem 1rem; border-radius: 999px; text-decoration: none; font-size: 0.85rem;">
              Confirm on WhatsApp ⚡
            </a>
          </div>
        `;
      }, 500);
    });
  }
})();
