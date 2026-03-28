const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://hostello.onrender.com/api';

// ── ADMIN LOGIN ──
if (document.getElementById('adminLoginForm')) {
  document.getElementById('adminLoginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Logging in...'; btn.disabled = true;
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: document.getElementById('adminUsername').value, password: document.getElementById('adminPassword').value })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin-dashboard.html';
      } else {
        alert(data.message || 'Invalid credentials');
        btn.textContent = 'Login to Dashboard'; btn.disabled = false;
      }
    } catch (e) { alert('Login failed. Is the server running?'); btn.textContent = 'Login to Dashboard'; btn.disabled = false; }
  });
}

function checkAdminAuth() {
  if (localStorage.getItem('adminLoggedIn') !== 'true') window.location.href = 'admin-login.html';
}

// ── LOAD DASHBOARD ──
async function loadDashboard() {
  checkAdminAuth();
  try {
    const res = await fetch(`${API_URL}/admin/dashboard`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` } });
    const data = await res.json();
    // Stats
    if (document.getElementById('statStudents')) document.getElementById('statStudents').textContent = data.stats.totalStudents;
    if (document.getElementById('statHostels')) document.getElementById('statHostels').textContent = data.stats.totalHostels;
    if (document.getElementById('statBookings')) document.getElementById('statBookings').textContent = data.stats.totalBookings;
    if (document.getElementById('statRevenue')) document.getElementById('statRevenue').textContent = '₹' + (data.stats.totalRevenue || 0).toLocaleString();
    // Payments
    const pb = document.getElementById('paymentsData');
    if (pb) pb.innerHTML = data.payments.length ? data.payments.map(p => `
      <tr>
        <td>${p._id.substring(0,8)}</td>
        <td>${p.student?.fullName || 'N/A'}</td>
        <td>${p.hostel?.name || 'N/A'}</td>
        <td>₹${p.amount?.toLocaleString()}</td>
        <td>${p.paymentMethod?.toUpperCase() || '—'}</td>
        <td>${new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
        <td><span class="badge badge-success">${p.status}</span></td>
      </tr>`).join('') : '<tr><td colspan="7" style="text-align:center;color:#64748b;padding:2rem;">No payment records yet</td></tr>';
    // Students
    const sb = document.getElementById('studentsData');
    if (sb) sb.innerHTML = data.students.length ? data.students.map(s => `
      <tr>
        <td>${s._id.substring(0,8)}</td>
        <td>${s.fullName}</td>
        <td>${s.email}</td>
        <td>${s.phone}</td>
        <td>${s.college}</td>
        <td>${new Date(s.createdAt).toLocaleDateString('en-IN')}</td>
      </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:#64748b;padding:2rem;">No students registered yet</td></tr>';
    // Hostels
    const hb = document.getElementById('hostelsData');
    if (hb) hb.innerHTML = data.hostels.length ? data.hostels.map(h => `
      <tr>
        <td>${h._id.substring(0,8)}</td>
        <td>${h.name}</td>
        <td>${h.city.charAt(0).toUpperCase()+h.city.slice(1)}</td>
        <td>₹${h.price?.toLocaleString()}</td>
        <td>⭐ ${h.rating}</td>
        <td>${h.totalBookings || 0}</td>
        <td><span class="badge ${h.available ? 'badge-success' : 'badge-danger'}">${h.available ? 'Active' : 'Inactive'}</span></td>
      </tr>`).join('') : '<tr><td colspan="7" style="text-align:center;color:#64748b;padding:2rem;">No hostels found</td></tr>';
  } catch (e) { console.error('Dashboard load error:', e); }
}

// ── SHOW TAB ──
function showTab(tabName, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(tabName + 'Tab').classList.add('active');
  if (btn) btn.classList.add('active');
}

// ── LOGOUT ──
function logout() {
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('adminToken');
  window.location.href = 'admin-login.html';
}
