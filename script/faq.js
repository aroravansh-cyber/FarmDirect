const FAQS = [
  { cat: "account", q: "How do I create a FarmDirect account?", a: "Tap Sign Up, enter your phone number, verify the OTP, and fill in a few basic details to get started." },
  { cat: "account", q: "How do I reset my password?", a: "Go to Login → Forgot Password, enter your registered phone number, and follow the OTP steps to set a new one." },
  { cat: "account", q: "Can I switch between a farmer and buyer account?", a: "Yes, open your profile settings and toggle 'Account Type' — you can operate as both from the same login." },
  { cat: "account", q: "How do I update my profile details?", a: "Go to Account & Profile in settings, tap Edit, update your name, address or contact info, and save." },

  { cat: "selling", q: "How to list and sell my organic crops?", a: "Go to List & Sell Products, tap 'Add product', fill in crop details, price and photos, then submit for review." },
  { cat: "selling", q: "Is there a limit to how many products I can list?", a: "No, verified farmers can list unlimited products across any category." },
  { cat: "selling", q: "Can I edit a product after listing it?", a: "Yes, open the product from your listings page and tap Edit to update price, quantity or photos anytime." },
  { cat: "selling", q: "What happens if my product goes unsold?", a: "It stays listed until you remove it or it expires after 30 days of inactivity — you can relist anytime." },

  { cat: "orders", q: "How do payouts and secure bank transfers work?", a: "Payouts are sent to your verified bank account automatically after the buyer confirms delivery." },
  { cat: "orders", q: "Is there any commission on sales?", a: "FarmDirect charges a small 5% platform fee per transaction; commission details are listed under Terms & Conditions." },
  { cat: "orders", q: "How long does a payout take?", a: "Most payouts are processed within 24 hours of delivery confirmation, directly to your linked bank account." },
  { cat: "orders", q: "What payment methods can buyers use?", a: "Buyers can pay via UPI, debit/credit cards, net banking, or cash on delivery where available." },
  { cat: "orders", q: "Can I cancel an order after placing it?", a: "Orders can be cancelled before the farmer confirms dispatch; after that, contact support for assistance." },

  { cat: "delivery", q: "What is the delivery and logistics process?", a: "Choose pickup or partner delivery when an order comes in. You'll see live tracking updates in your Orders tab." },
  { cat: "delivery", q: "Which areas does FarmDirect deliver to?", a: "We currently cover 80+ cities; enter your pincode at checkout to confirm delivery availability in your area." },
  { cat: "delivery", q: "What if my delivery is delayed?", a: "You'll get a notification with the updated ETA; you can also contact the assigned delivery partner from the Orders screen." },

  { cat: "kyc", q: "How can I update my Aadhaar details?", a: "Open KYC & Aadhaar in your profile, upload the new document and wait for verification, usually within 24-48 hours." },
  { cat: "kyc", q: "Why is KYC required to sell on FarmDirect?", a: "KYC verification protects both farmers and buyers by ensuring secure, traceable and trustworthy transactions." },
  { cat: "kyc", q: "What documents are accepted for KYC?", a: "Aadhaar card is required; a PAN card or bank passbook may be requested for payout verification." },

  { cat: "other", q: "Is FarmDirect available in my language?", a: "The app currently supports English, Hindi, Marathi and Tamil, with more languages coming soon." },
  { cat: "other", q: "How do I contact customer support?", a: "Visit the Help & Support page to call, WhatsApp, or email our team — we usually respond within 24 hours." },
  { cat: "other", q: "Does FarmDirect have a mobile app?", a: "Yes, check the How It Works page for Android and iOS download links." },
];

const faqList = document.getElementById('faqList');
const noResult = document.getElementById('noResult');
const resultCount = document.getElementById('resultCount');
const searchInput = document.getElementById('searchInput');
const catBtns = document.querySelectorAll('.cat-btn');
let activeCat = 'all';

const CAT_LABEL = {
  account: "Account", selling: "Selling", orders: "Orders",
  delivery: "Delivery", kyc: "KYC", other: "Other"
};

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  return text.replace(re, '<mark>$1</mark>');
}

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = FAQS.filter(f =>
    (activeCat === 'all' || f.cat === activeCat) &&
    (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  );

  faqList.innerHTML = '';
  filtered.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-q">
        <span>${highlight(f.q, q)}</span>
        <span class="tag">${CAT_LABEL[f.cat]}</span>
        <span class="chev">⌄</span>
      </button>
      <div class="faq-a"><p>${highlight(f.a, q)}</p></div>`;
    item.querySelector('.faq-q').addEventListener('click', () => {
      item.classList.toggle('open');
    });
    faqList.appendChild(item);
  });

  noResult.hidden = filtered.length > 0;
  resultCount.textContent = filtered.length ? `${filtered.length} question${filtered.length > 1 ? 's' : ''} found` : '';
}

catBtns.forEach(btn => btn.addEventListener('click', () => {
  catBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeCat = btn.dataset.cat;
  render();
}));

searchInput.addEventListener('input', render);
document.getElementById('searchBtn').addEventListener('click', e => { e.preventDefault(); render(); });

render();
