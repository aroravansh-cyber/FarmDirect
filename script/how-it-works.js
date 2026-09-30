// Tab toggle between farmer and buyer steps
const tabs = document.querySelectorAll('.h-tab');
const farmerSteps = document.getElementById('farmerSteps');
const buyerSteps = document.getElementById('buyerSteps');

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const target = tab.dataset.target;
  farmerSteps.hidden = target !== 'farmerSteps';
  buyerSteps.hidden = target !== 'buyerSteps';
}));

// Video placeholder
document.querySelector('.video-placeholder').addEventListener('click', () => {
  showToast('🎬 Video coming soon!');
});

// Toast helper
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2800);
}

// Download buttons — replace the toast messages / links below once the app is live
document.getElementById('androidBtn').addEventListener('click', () => {
  showToast('🚀 FarmDirect app launching soon on Google Play!');
});
document.getElementById('iosBtn').addEventListener('click', () => {
  showToast('🚀 FarmDirect app launching soon on the App Store!');
});
document.getElementById('apkLink').addEventListener('click', e => {
  e.preventDefault();
  showToast('⬇️ APK download will be available at launch!');
});
