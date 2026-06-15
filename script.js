// PMG checkout page URL — where checkout actually works (PMG injects __processDonation at serve time)
var PMG_CHECKOUT_URL = 'https://paymegpt.com/p/2kRmtQ';

function handleCheckout() {
  var nameVal = document.getElementById('name').value.trim();
  var emailVal = document.getElementById('email').value.trim();
  if (!nameVal) { alert('Please enter your name.'); document.getElementById('name').focus(); return; }
  if (!emailVal || !emailVal.includes('@')) { alert('Please enter a valid email address.'); document.getElementById('email').focus(); return; }
  if (typeof window.__processDonation === 'function') {
    // Served by PMG — native on-page checkout
    window.__processDonation({ amount: 1, description: 'Beyond Your A1c — Test Payment', name: nameVal, email: emailVal });
  } else {
    // Static hosting (GitHub Pages / custom domain) — hand off to the PMG page with details carried over
    window.location.href = PMG_CHECKOUT_URL
      + '?name=' + encodeURIComponent(nameVal)
      + '&email=' + encodeURIComponent(emailVal)
      + '&checkout=1#offer';
  }
}

// On load: if name/email arrived via URL (handoff from the custom domain), pre-fill the fields
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var n = params.get('name');
    var e = params.get('email');
    if (n) document.getElementById('name').value = n;
    if (e) document.getElementById('email').value = e;
    if (params.get('checkout') === '1') {
      // Buyer was mid-checkout on the custom domain — take them straight to the offer
      setTimeout(function () {
        document.getElementById('offer').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  } catch (err) { /* no-op */ }
})();