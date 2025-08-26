const y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();

// ---- FORM HANDLER ----
// EDIT THIS to start receiving form submissions (Zapier/Make/Hookdeck URL)
const WEBHOOK_URL = ""; 

const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  statusEl.textContent = "Sending…";
  try {
    if (!WEBHOOK_URL) throw new Error("Add your WEBHOOK_URL in site.js before deploying.");
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'estimate', source: 'apexstrokes.site', payload: data })
    });
    if (!res.ok) throw new Error("Request failed");
    statusEl.textContent = "Thanks! We’ll reach out shortly.";
    form.reset();
  } catch (err) {
    statusEl.textContent = err.message;
  }
});
