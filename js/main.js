const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? `http://${window.location.hostname}:5000/api`
  : 'https://hostello.onrender.com/api';

// ── HELPERS ──
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

function hostelCard(hostel) {
  const city = hostel.city.charAt(0).toUpperCase() + hostel.city.slice(1);
  const total = hostel.totalRooms || 20;
  const booked = hostel.totalBookings || 0;
  const available = Math.max(0, total - booked);
  const occupancy = Math.round((booked / total) * 100);
  const fillColor = available === 0 ? '#ef4444' : available <= 3 ? '#f59e0b' : '#10b981';
  const statusText = available === 0 ? '🔴 Fully Booked' : available <= 3 ? `⚠️ ${available} left` : `✅ ${available} available`;
  const statusBg = available === 0 ? '#fee2e2' : available <= 3 ? '#fef3c7' : '#d1fae5';
  const statusColor = available === 0 ? '#991b1b' : available <= 3 ? '#92400e' : '#065f46';

  return `
    <div class="hostel-card" onclick="viewHostel('${hostel._id}')">
      <div class="hostel-image">
        🏠
        <span class="hostel-badge" style="background:${fillColor};">${available === 0 ? 'Full' : 'Open'}</span>
      </div>
      <div class="hostel-info">
        <h3>${hostel.name}</h3>
        <div class="hostel-meta">📍 ${city} &nbsp;·&nbsp; ${hostel.address.split(',')[0]}</div>

        <!-- Room Availability Bar -->
        <div style="margin:0.75rem 0 0.5rem;">
          <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#64748b;margin-bottom:4px;">
            <span>🛏️ Rooms</span>
            <span style="font-weight:600;color:${fillColor};">${statusText}</span>
          </div>
          <div style="height:6px;background:#e2e8f0;border-radius:50px;overflow:hidden;">
            <div style="height:100%;width:${occupancy}%;background:${fillColor};border-radius:50px;transition:width 0.5s;"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#94a3b8;margin-top:3px;">
            <span>${booked} booked</span>
            <span>${available}/${total} free</span>
          </div>
        </div>

        <div class="hostel-footer">
          <div class="price">₹${hostel.price.toLocaleString()}<span>/mo</span></div>
          <div class="rating">⭐ ${hostel.rating}</div>
        </div>
      </div>
    </div>`;
}

// ── NAV LOGIN STATE ──
function updateNavForLogin() {
  const id = localStorage.getItem('studentId');
  const loginLink = document.getElementById('navLoginLink');
  const logoutLink = document.getElementById('navLogoutLink');
  const profileLink = document.getElementById('navProfileLink');
  if (id) {
    if (loginLink) loginLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'block';
    if (profileLink) profileLink.style.display = 'block';
  } else {
    if (loginLink) loginLink.style.display = 'block';
    if (logoutLink) logoutLink.style.display = 'none';
    if (profileLink) profileLink.style.display = 'none';
  }
}

function logoutStudent() {
  localStorage.removeItem('token');
  localStorage.removeItem('studentId');
  localStorage.removeItem('studentName');
  showToast('Logged out successfully');
  setTimeout(() => window.location.href = 'home.html', 1000);
}

// ── LOAD HOSTELS (explore page) ──
async function loadHostels() {
  const grid = document.getElementById('hostelsGrid');
  if (!grid) return;
  grid.innerHTML = '<p style="padding:2rem;color:#64748b;text-align:center;">⏳ Loading hostels...</p>';
  try {
    const city = localStorage.getItem('searchCity') || '';
    localStorage.removeItem('searchCity');
    const url = city ? `${API_URL}/hostels?city=${city}` : `${API_URL}/hostels`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Server error');
    const hostels = await res.json();
    if (city) {
      const el = document.getElementById('cityFilter');
      if (el) el.value = city;
    }
    if (!Array.isArray(hostels) || hostels.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem;">
          <div style="font-size:3rem;margin-bottom:1rem;">🏠</div>
          <p style="color:#64748b;font-size:1rem;">No hostels found. The database may still be loading.</p>
          <button onclick="loadHostels()" class="btn-primary" style="margin-top:1rem;">🔄 Try Again</button>
        </div>`;
      return;
    }
    grid.innerHTML = hostels.map(hostelCard).join('');
  } catch (e) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;">
        <div style="font-size:3rem;margin-bottom:1rem;">⚠️</div>
        <p style="color:#ef4444;font-size:1rem;">Could not connect to server. It may be waking up (free tier takes ~30 sec).</p>
        <button onclick="loadHostels()" class="btn-primary" style="margin-top:1rem;">🔄 Retry</button>
      </div>`;
  }
}

// ── FILTER HOSTELS ──
async function filterHostels() {
  const city = document.getElementById('cityFilter').value;
  const price = document.getElementById('priceFilter').value;
  const sort = document.getElementById('sortFilter') ? document.getElementById('sortFilter').value : '';
  let url = `${API_URL}/hostels?`;
  if (city) url += `city=${city}&`;
  if (price === 'low') url += 'maxPrice=5000&';
  else if (price === 'mid') url += 'minPrice=5000&maxPrice=10000&';
  else if (price === 'high') url += 'minPrice=10000&';
  try {
    const res = await fetch(url);
    let hostels = await res.json();
    if (sort === 'price_asc') hostels.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') hostels.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') hostels.sort((a, b) => b.rating - a.rating);
    const grid = document.getElementById('hostelsGrid');
    grid.innerHTML = hostels.length ? hostels.map(hostelCard).join('') : '<p style="padding:2rem;color:#64748b;">No hostels found for this filter.</p>';
  } catch (e) { console.error(e); }
}

// ── VIEW HOSTEL ──
function viewHostel(id) {
  localStorage.setItem('selectedHostel', id);
  window.location.href = 'hostel-details.html';
}

// ── HOSTEL DETAILS PAGE ──
async function loadHostelDetails() {
  const id = localStorage.getItem('selectedHostel');
  if (!id) return;
  try {
    const [hostelRes, availRes] = await Promise.all([
      fetch(`${API_URL}/hostels/${id}`),
      fetch(`${API_URL}/hostels/${id}/availability`)
    ]);
    const h = await hostelRes.json();
    const avail = await availRes.json();

    document.title = `${h.name} - Hostello`;

    const amenityIcons = { WiFi:'📶', AC:'❄️', Gym:'💪', Mess:'🍽️', Kitchen:'🍳', Laundry:'👕', Security:'🔒', Parking:'🚗', Cafeteria:'☕', 'Study Room':'📚', Garden:'🌿', Rooftop:'🌇', Pool:'🏊', CCTV:'📹', Recreation:'🎮', 'Common Room':'🛋️', '24/7 Security':'🛡️' };

    const occupancy = avail.occupancyPercent || 0;
    const fillClass = occupancy >= 90 ? 'high' : occupancy >= 60 ? 'mid' : 'low';
    const statusClass = avail.availableRooms === 0 ? 'full' : avail.availableRooms <= 3 ? 'limited' : 'open';
    const statusText = avail.availableRooms === 0 ? '🔴 Fully Booked' : avail.availableRooms <= 3 ? `⚠️ Only ${avail.availableRooms} rooms left — Book fast!` : `✅ ${avail.availableRooms} rooms available`;

    document.getElementById('hostelDetail').innerHTML = `
      <div class="hostel-gallery">
        <div class="gallery-main">🏠</div>
        <div class="gallery-side">
          <div class="gallery-thumb">🛏️</div>
          <div class="gallery-thumb">🍽️</div>
        </div>
      </div>
      <div class="detail-grid">
        <div class="detail-main">
          <h1>${h.name}</h1>
          <div class="detail-meta">
            <span>📍 ${h.city.charAt(0).toUpperCase()+h.city.slice(1)}</span>
            <span>⭐ ${h.rating} Rating</span>
            <span>✅ Verified</span>
          </div>

          <div class="detail-section">
            <h3>About this Hostel</h3>
            <p style="color:#64748b;line-height:1.8;">${h.description}</p>
          </div>

          <div class="detail-section">
            <h3>Full Address</h3>
            <p style="color:#64748b;">📍 ${h.address}</p>
          </div>

          <div class="detail-section">
            <h3>Amenities</h3>
            <div class="amenities-grid">
              ${h.amenities.map(a => `<div class="amenity-chip">${amenityIcons[a]||'✓'} ${a}</div>`).join('')}
            </div>
          </div>

          <!-- AVAILABILITY WIDGET -->
          <div class="availability-box">
            <h3>🏠 Room Availability</h3>
            <div class="rooms-stats">
              <div class="room-stat total">
                <div class="room-stat-number">${avail.totalRooms}</div>
                <div class="room-stat-label">Total Rooms</div>
              </div>
              <div class="room-stat booked">
                <div class="room-stat-number">${avail.bookedRooms}</div>
                <div class="room-stat-label">Booked</div>
              </div>
              <div class="room-stat available">
                <div class="room-stat-number">${avail.availableRooms}</div>
                <div class="room-stat-label">Available</div>
              </div>
            </div>
            <div class="occupancy-bar-wrap">
              <div class="occupancy-label">
                <span>Occupancy</span>
                <span>${occupancy}% filled</span>
              </div>
              <div class="occupancy-bar">
                <div class="occupancy-fill ${fillClass}" style="width:${occupancy}%"></div>
              </div>
            </div>
            <span class="availability-status ${statusClass}">${statusText}</span>
          </div>
        </div>

        <div class="detail-sidebar">
          <div class="sidebar-price">₹${h.price.toLocaleString()}<span>/month</span></div>
          <div class="sidebar-rating">⭐ ${h.rating} &nbsp;·&nbsp; Verified Hostel</div>
          <div style="font-size:0.85rem;margin-bottom:1rem;padding:0.6rem 0.75rem;border-radius:6px;background:${avail.availableRooms===0?'#fee2e2':avail.availableRooms<=3?'#fef3c7':'#d1fae5'};color:${avail.availableRooms===0?'#991b1b':avail.availableRooms<=3?'#92400e':'#065f46'};font-weight:600;">
            ${avail.availableRooms === 0 ? '🔴 No rooms available' : avail.availableRooms <= 3 ? `⚠️ Only ${avail.availableRooms} left` : `✅ ${avail.availableRooms} rooms free`}
          </div>
          <button class="btn-primary sidebar-book" onclick="bookHostel('${h._id}')" ${avail.availableRooms === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
            ${avail.availableRooms === 0 ? 'Fully Booked' : 'Book Now →'}
          </button>
          <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid #e2e8f0;">
            <p style="font-size:0.85rem;color:#64748b;margin-bottom:0.5rem;">📍 ${h.address}</p>
            <p style="font-size:0.85rem;color:#64748b;">🏙️ ${h.city.charAt(0).toUpperCase()+h.city.slice(1)}</p>
          </div>
        </div>
      </div>`;
  } catch (e) {
    console.error(e);
    document.getElementById('hostelDetail').innerHTML = '<p style="color:#ef4444;padding:2rem;">Failed to load hostel details.</p>';
  }
}

// ── BOOK HOSTEL ──
function bookHostel(id) {
  if (!localStorage.getItem('studentId')) {
    showToast('Please login to book a hostel', 'error');
    setTimeout(() => window.location.href = 'student-login.html', 1500);
    return;
  }
  localStorage.setItem('bookingHostel', id);
  window.location.href = 'booking.html';
}

// ── BOOKING PAGE ──
async function loadBookingPage() {
  const id = localStorage.getItem('bookingHostel');
  if (!id) return;
  try {
    const res = await fetch(`${API_URL}/hostels/${id}`);
    const h = await res.json();
    document.getElementById('bookingSummary').innerHTML = `
      <div class="summary-hostel-name">${h.name}</div>
      <p style="color:#64748b;font-size:0.85rem;margin-bottom:1rem;">📍 ${h.address}</p>
      <div class="summary-row"><span>Price per month</span><span class="summary-total">₹${h.price.toLocaleString()}</span></div>
      <div class="summary-row"><span>Rating</span><span>⭐ ${h.rating}</span></div>`;
  } catch (e) { console.error(e); }
}

async function proceedToPayment() {
  const form = document.getElementById('bookingForm');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const hostelId = localStorage.getItem('bookingHostel');
  const studentId = localStorage.getItem('studentId');
  if (!studentId) { showToast('Please login first', 'error'); window.location.href = 'student-login.html'; return; }
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ studentId, hostelId, checkIn: document.getElementById('checkIn').value, checkOut: document.getElementById('checkOut').value, guests: document.getElementById('guests').value })
    });
    const booking = await res.json();
    if (res.ok) { localStorage.setItem('currentBooking', JSON.stringify(booking)); window.location.href = 'payment.html'; }
    else showToast(booking.message || 'Booking failed', 'error');
  } catch (e) { showToast('Error creating booking', 'error'); }
}

// ── PAYMENT PAGE ──
async function loadPaymentPage() {
  const booking = JSON.parse(localStorage.getItem('currentBooking'));
  if (!booking) { window.location.href = 'explore.html'; return; }
  try {
    const res = await fetch(`${API_URL}/bookings/${booking._id}`);
    const b = await res.json();
    document.getElementById('paymentSummary').innerHTML = `
      <div class="summary-hostel-name">${b.hostel?.name || 'Hostel'}</div>
      <div class="summary-row"><span>Guest</span><span>${b.student?.fullName || ''}</span></div>
      <div class="summary-row"><span>Check-in</span><span>${new Date(b.checkIn).toLocaleDateString('en-IN')}</span></div>
      <div class="summary-row"><span>Check-out</span><span>${new Date(b.checkOut).toLocaleDateString('en-IN')}</span></div>
      <div class="summary-row"><span>Total Amount</span><span class="summary-total">₹${b.totalAmount?.toLocaleString()}</span></div>`;
  } catch (e) { console.error(e); }
}

function showPaymentMethod(method) {
  document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(method + 'Payment').classList.add('active');
  event.target.classList.add('active');
}

async function processPayment(method) {
  const booking = JSON.parse(localStorage.getItem('currentBooking'));
  const studentId = localStorage.getItem('studentId');
  try {
    const res = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ bookingId: booking._id, studentId, hostelId: booking.hostel, amount: booking.totalAmount, paymentMethod: method })
    });
    if (res.ok) {
      showToast('🎉 Payment successful! Booking confirmed.');
      localStorage.removeItem('currentBooking');
      localStorage.removeItem('bookingHostel');
      setTimeout(() => window.location.href = 'home.html', 2000);
    } else {
      showToast('Payment failed. Please try again.', 'error');
    }
  } catch (e) { showToast('Payment error. Try again.', 'error'); }
}

// ── SEARCH ──
function quickSearch() {
  const q = document.getElementById('quickSearch').value.trim();
  if (!q) return;
  localStorage.setItem('searchQuery', q);
  window.location.href = 'search.html';
}

function searchCity(city) {
  localStorage.setItem('searchCity', city);
  window.location.href = 'explore.html';
}

function loadSearchResults() {
  const q = localStorage.getItem('searchQuery') || '';
  document.getElementById('searchInput').value = q;
  if (q) performSearch();
}

async function performSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;
  const container = document.getElementById('searchResults');
  container.innerHTML = '<p style="color:#64748b;">Searching...</p>';
  try {
    const res = await fetch(`${API_URL}/hostels/search/${encodeURIComponent(q)}`);
    const results = await res.json();
    container.innerHTML = results.length ? results.map(hostelCard).join('') : '<p style="color:#64748b;">No hostels found for your search.</p>';
  } catch (e) { container.innerHTML = '<p style="color:#ef4444;">Search failed. Is the server running?</p>'; }
}

// ── STUDENT LOGIN / REGISTER ──
function showRegister() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('registerSection').style.display = 'block';
}
function showLogin() {
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('registerSection').style.display = 'none';
}

if (document.getElementById('studentLoginForm')) {
  document.getElementById('studentLoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Logging in...'; btn.disabled = true;
    try {
      const res = await fetch(`${API_URL}/students/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: document.getElementById('studentEmail').value, password: document.getElementById('studentPassword').value })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('studentId', data.student.id);
        localStorage.setItem('studentName', data.student.fullName);
        showToast('Welcome back, ' + data.student.fullName + '!');
        setTimeout(() => window.location.href = 'home.html', 1000);
      } else { showToast(data.message || 'Login failed', 'error'); btn.textContent = 'Login to Account'; btn.disabled = false; }
    } catch (e) { showToast('Login failed. Is the server running?', 'error'); btn.textContent = 'Login to Account'; btn.disabled = false; }
  });
}

async function skipAndRegister() {
  document.getElementById('regCard').value = '';
  document.getElementById('regUpi').value = '';
  document.getElementById('studentRegisterForm').dispatchEvent(new Event('submit'));
}

if (document.getElementById('studentRegisterForm')) {
  document.getElementById('studentRegisterForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Creating account...'; btn.disabled = true;
    try {
      const res = await fetch(`${API_URL}/students/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: document.getElementById('regName').value,
          email: document.getElementById('regEmail').value,
          phone: document.getElementById('regPhone').value,
          password: document.getElementById('regPassword').value,
          college: document.getElementById('regCollege').value,
          paymentMethods: { cardNumber: document.getElementById('regCard').value, upiId: document.getElementById('regUpi').value }
        })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('studentId', data.student.id);
        localStorage.setItem('studentName', data.student.fullName);
        showToast('Account created! Welcome to Hostello 🎉');
        setTimeout(() => window.location.href = 'home.html', 1000);
      } else { showToast(data.message || 'Registration failed', 'error'); btn.textContent = 'Create Account'; btn.disabled = false; }
    } catch (e) { showToast('Registration failed. Is the server running?', 'error'); btn.textContent = 'Create Account'; btn.disabled = false; }
  });
}

// ── PROFILE PAGE ──
async function loadProfilePage() {
  const studentId = localStorage.getItem('studentId');
  if (!studentId) { window.location.href = 'student-login.html'; return; }
  try {
    const res = await fetch(`${API_URL}/students/${studentId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    const s = await res.json();
    document.getElementById('profileName').textContent = s.fullName;
    document.getElementById('profileEmail').textContent = s.email;
    document.getElementById('profileCollege').textContent = '🎓 ' + s.college;
    document.getElementById('profileAvatar').textContent = s.fullName.charAt(0).toUpperCase();
    document.getElementById('editName').value = s.fullName;
    document.getElementById('editPhone').value = s.phone;
    document.getElementById('editCollege').value = s.college;
    document.getElementById('editEmail').value = s.email;
    if (s.paymentMethods) {
      document.getElementById('profileCard').value = s.paymentMethods.cardNumber || '';
      document.getElementById('profileUpi').value = s.paymentMethods.upiId || '';
    }
  } catch (e) { showToast('Failed to load profile', 'error'); }

  // Edit profile form
  document.getElementById('editProfileForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/students/${studentId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ fullName: document.getElementById('editName').value, phone: document.getElementById('editPhone').value, college: document.getElementById('editCollege').value })
      });
      if (res.ok) { showToast('Profile updated successfully!'); localStorage.setItem('studentName', document.getElementById('editName').value); }
      else showToast('Update failed', 'error');
    } catch (e) { showToast('Update failed', 'error'); }
  });

  // Payment methods form
  document.getElementById('paymentMethodsForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/students/${studentId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ paymentMethods: { cardNumber: document.getElementById('profileCard').value, upiId: document.getElementById('profileUpi').value } })
      });
      if (res.ok) showToast('Payment methods saved!');
      else showToast('Save failed', 'error');
    } catch (e) { showToast('Save failed', 'error'); }
  });

  // Change password form
  document.getElementById('changePasswordForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const np = document.getElementById('newPassword').value;
    const cp = document.getElementById('confirmPassword').value;
    if (np !== cp) { showToast('Passwords do not match', 'error'); return; }
    try {
      const res = await fetch(`${API_URL}/students/${studentId}/password`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ currentPassword: document.getElementById('currentPassword').value, newPassword: np })
      });
      if (res.ok) { showToast('Password changed successfully!'); this.reset(); }
      else { const d = await res.json(); showToast(d.message || 'Password change failed', 'error'); }
    } catch (e) { showToast('Password change failed', 'error'); }
  });

  // Load bookings
  try {
    const res = await fetch(`${API_URL}/bookings?student=${studentId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    const bookings = await res.json();
    const el = document.getElementById('myBookings');
    if (!bookings.length) { el.innerHTML = '<p style="color:#64748b;font-size:0.9rem;">No bookings yet. <a href="explore.html" style="color:#4f46e5;">Explore hostels →</a></p>'; return; }
    el.innerHTML = bookings.map(b => `
      <div style="padding:0.75rem 0;border-bottom:1px solid #e2e8f0;">
        <div style="font-weight:600;font-size:0.9rem;">${b.hostel?.name || 'Hostel'}</div>
        <div style="font-size:0.8rem;color:#64748b;margin-top:2px;">${new Date(b.checkIn).toLocaleDateString('en-IN')} → ${new Date(b.checkOut).toLocaleDateString('en-IN')}</div>
        <span class="badge ${b.status === 'confirmed' ? 'badge-success' : b.status === 'cancelled' ? 'badge-danger' : 'badge-warning'}" style="margin-top:4px;display:inline-block;">${b.status}</span>
      </div>`).join('');
  } catch (e) { document.getElementById('myBookings').innerHTML = '<p style="color:#64748b;font-size:0.9rem;">Could not load bookings.</p>'; }
}
