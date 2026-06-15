function handleCheckout() {
  var nameVal = document.getElementById('name').value.trim();
  var emailVal = document.getElementById('email').value.trim();
  if (!nameVal) { alert('Please enter your name.'); document.getElementById('name').focus(); return; }
  if (!emailVal || !emailVal.includes('@')) { alert('Please enter a valid email address.'); document.getElementById('email').focus(); return; }
  if (typeof window.__processDonation === 'function') {
    window.__processDonation({ amount: 1, description: 'Beyond Your A1c — Test Payment', name: nameVal, email: emailVal });
  } else {
    alert('Checkout is not available right now. Please try again in a moment.');
  }
}