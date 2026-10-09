/* =========================================================
   AISTOCKLAB INFORMATIONAL DEMO & CHECKOUT REDIRECT ENGINE
   - Authoritative Checkout: https://superprofile.bio/vp/ai-to-research-stocks-smarter-
========================================================= */

(function () {
  'use strict';

  // Ensure all purchase/buy CTA links cleanly route to the authoritative SuperProfile checkout
  const officialCheckoutUrl = 'https://superprofile.bio/vp/ai-to-research-stocks-smarter-';
  const ctaButtons = document.querySelectorAll('.btn-cta-main, .btn-pay');

  ctaButtons.forEach((btn) => {
    btn.setAttribute('href', officialCheckoutUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });
})();
