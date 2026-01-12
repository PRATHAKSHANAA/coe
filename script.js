// Lab data
const labs = [
    {
        id: 1,
        name: "Assistive Technology",
        description: "Developing innovative solutions to enhance accessibility and independence for individuals with disabilities.",
        icon: "🦾",
        location: "Block A, Floor 2",
        equipment: ["3D Printers", "Sensors", "Microcontrollers", "Testing Equipment"]
    },
    {
        id: 2,
        name: "Biofilms",
        description: "Research on microbial communities and their applications in biotechnology and environmental science.",
        icon: "🦠",
        location: "Block B, Floor 1",
        equipment: ["Microscopes", "Incubators", "Bioreactors", "Analysis Tools"]
    },
    {
        id: 3,
        name: "Computational Fluid Dynamics",
        description: "Advanced simulation and modeling of fluid flow phenomena for engineering applications.",
        icon: "🌊",
        location: "Block C, Floor 3",
        equipment: ["High-Performance Computers", "CFD Software", "Workstations", "Visualization Tools"]
    },
    {
        id: 4,
        name: "Digital Manufacturing",
        description: "Exploring Industry 4.0 technologies for smart manufacturing and automation.",
        icon: "🏭",
        location: "Block D, Floor 1",
        equipment: ["CNC Machines", "3D Printers", "Robots", "IoT Sensors"]
    },
    {
        id: 5,
        name: "Data Science",
        description: "Advanced analytics, machine learning, and big data processing for research insights.",
        icon: "📊",
        location: "Block A, Floor 3",
        equipment: ["GPU Clusters", "Analytics Software", "Databases", "Visualization Tools"]
    },
    {
        id: 6,
        name: "Electric Vehicles",
        description: "Research and development of sustainable transportation technologies and battery systems.",
        icon: "🚗",
        location: "Block E, Floor 1",
        equipment: ["Battery Testing", "Motor Controllers", "Charging Systems", "Vehicle Simulators"]
    },
    {
        id: 7,
        name: "Embedded Technologies",
        description: "Development of embedded systems and IoT solutions for various applications.",
        icon: "💾",
        location: "Block B, Floor 2",
        equipment: ["Microcontrollers", "Development Boards", "Oscilloscopes", "Logic Analyzers"]
    },
    {
        id: 8,
        name: "Food Products and Process Design",
        description: "Innovation in food technology, processing, and sustainable packaging solutions.",
        icon: "🍎",
        location: "Block F, Floor 1",
        equipment: ["Processing Equipment", "Quality Testing", "Packaging Machines", "Analysis Tools"]
    },
    {
        id: 9,
        name: "High-Speed Jet Flows",
        description: "Research on aerodynamics and high-speed flow phenomena for aerospace applications.",
        icon: "✈️",
        location: "Block C, Floor 2",
        equipment: ["Wind Tunnels", "Flow Visualization", "Pressure Sensors", "High-Speed Cameras"]
    },
    {
        id: 10,
        name: "Internet of Things",
        description: "Connected devices and smart systems for industrial and consumer applications.",
        icon: "🌐",
        location: "Block B, Floor 3",
        equipment: ["IoT Devices", "Sensors", "Gateways", "Cloud Platforms"]
    },
    {
        id: 11,
        name: "Machine Vision",
        description: "Computer vision and image processing technologies for automation and analysis.",
        icon: "👁️",
        location: "Block D, Floor 2",
        equipment: ["Cameras", "Image Processing", "AI Hardware", "Lighting Systems"]
    },
    {
        id: 12,
        name: "Medical Imaging",
        description: "Advanced imaging technologies for healthcare and biomedical research applications.",
        icon: "🏥",
        location: "Block G, Floor 1",
        equipment: ["MRI Systems", "Ultrasound", "X-ray Equipment", "Image Analysis"]
    },
    {
        id: 13,
        name: "MEMS & Microfluidics",
        description: "Micro-scale devices and systems for sensing, actuation, and fluid manipulation.",
        icon: "🔬",
        location: "Block A, Floor 1",
        equipment: ["Cleanroom", "Fabrication Tools", "Testing Equipment", "Microscopes"]
    },
    {
        id: 14,
        name: "Renewable Energy",
        description: "Sustainable energy technologies including solar, wind, and energy storage systems.",
        icon: "☀️",
        location: "Block E, Floor 2",
        equipment: ["Solar Panels", "Wind Turbines", "Battery Systems", "Power Electronics"]
    },
    {
        id: 15,
        name: "Sustainable Construction Materials",
        description: "Development of eco-friendly building materials and construction technologies.",
        icon: "🏗️",
        location: "Block F, Floor 2",
        equipment: ["Material Testing", "Concrete Mixers", "Strength Testing", "Environmental Chambers"]
    }
];

// Current user state
let currentUser = null;
let currentView = 'home';
let users = JSON.parse(localStorage.getItem('users') || '[]');
let admins = JSON.parse(localStorage.getItem('admins') || '[]');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderLabs();
    checkAuthState();
});

// Render labs on homepage
function renderLabs() {
    const labsGrid = document.getElementById('labsGrid');
    if (!labsGrid) return;

    labsGrid.innerHTML = labs.map(lab => `
        <div class="lab-card" onclick="viewLabDetails(${lab.id})">
            <div class="lab-image">
                ${lab.icon}
            </div>
            <div class="lab-content">
                <h3 class="lab-name">${lab.name}</h3>
                <p class="lab-description">${lab.description}</p>
            </div>
        </div>
    `).join('');
}

// Modal functions
function showLogin(userType) {
    document.getElementById(`${userType}LoginModal`).style.display = 'block';
}

function showSignUp(userType) {
    document.getElementById(`${userType}SignUpModal`).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Handle form-based login
function handleLogin(event, userType) {
    event.preventDefault();
    
    const email = document.getElementById(`${userType}LoginEmail`).value;
    const password = document.getElementById(`${userType}LoginPassword`).value;
    
    const userList = userType === 'admin' ? admins : users;
    const user = userList.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { ...user, role: userType };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        closeModal(`${userType}LoginModal`);
        showDashboard();
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid credentials!', 'error');
    }
}

// Handle form-based signup
function handleSignUp(event, userType) {
    event.preventDefault();
    
    const name = document.getElementById(`${userType}SignUpName`).value;
    const email = document.getElementById(`${userType}SignUpEmail`).value;
    const password = document.getElementById(`${userType}SignUpPassword`).value;
    
    // Check if user already exists
    const userList = userType === 'admin' ? admins : users;
    if (userList.find(u => u.email === email)) {
        showNotification('User already exists!', 'error');
        return;
    }
    
    // Admin verification
    if (userType === 'admin') {
        const adminCode = document.getElementById('adminCode').value;
        if (adminCode !== 'ADMIN2024') {
            showNotification('Invalid admin code!', 'error');
            return;
        }
    }
    
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        role: userType,
        avatar: name.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString()
    };
    
    if (userType === 'user') {
        newUser.studentId = document.getElementById('userStudentId').value;
    }
    
    userList.push(newUser);
    localStorage.setItem(userType === 'admin' ? 'admins' : 'users', JSON.stringify(userList));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeModal(`${userType}SignUpModal`);
    showDashboard();
    showNotification('Account created successfully!', 'success');
}

// Google Authentication
function googleAuth(userType, action) {
    // Mock Google authentication
    const mockUser = {
        id: Date.now().toString(),
        name: userType === 'admin' ? 'Admin User' : 'John Doe',
        email: userType === 'admin' ? 'admin@rec.edu' : 'john.doe@student.rec.edu',
        role: userType,
        avatar: userType === 'admin' ? 'A' : 'J',
        createdAt: new Date().toISOString()
    };
    
    if (userType === 'user') {
        mockUser.studentId = 'STU' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }
    
    currentUser = mockUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeModal(`${userType}${action === 'login' ? 'Login' : 'SignUp'}Modal`);
    showDashboard();
    showNotification(`${action === 'login' ? 'Login' : 'Sign up'} successful!`, 'success');
}

// Check authentication state
function checkAuthState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
}

// Show dashboard
function showDashboard() {
    // Hide homepage
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.header').style.display = 'none';
    
    // Remove existing dashboard if any
    const existingDashboard = document.querySelector('.dashboard');
    if (existingDashboard) {
        existingDashboard.remove();
    }
    
    // Create and show new dashboard
    createDashboard();
}

// Create dashboard
function createDashboard() {
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard';
    dashboard.style.display = 'flex';
    
    dashboard.innerHTML = `
        <div class="dashboard-container">
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="user-info">
                        <div class="user-avatar">${currentUser.avatar}</div>
                        <div>
                            <div class="user-name">${currentUser.name}</div>
                            <div class="user-role">${currentUser.role}</div>
                        </div>
                    </div>
                </div>
                <nav>
                    <ul class="sidebar-nav">
                        ${currentUser.role === 'admin' ? `
                        <li><a href="#" onclick="showDashboardView('pending')" class="active">
                            <i class="fas fa-clock"></i> Pending Bookings
                        </a></li>
                        <li><a href="#" onclick="showDashboardView('appointments')">
                            <i class="fas fa-calendar-check"></i> All Bookings
                        </a></li>
                        <li><a href="#" onclick="showDashboardView('maintenance')">
                            <i class="fas fa-tools"></i> Maintenance Records
                        </a></li>
                        ` : `
                        <li><a href="#" onclick="showDashboardView('labs')" class="active">
                            <i class="fas fa-flask"></i> Labs
                        </a></li>
                        <li><a href="#" onclick="showDashboardView('bookings')">
                            <i class="fas fa-calendar"></i> My Bookings
                        </a></li>
                        `}
                        <li><a href="#" onclick="signOut()">
                            <i class="fas fa-sign-out-alt"></i> Sign Out
                        </a></li>
                    </ul>
                </nav>
            </aside>
            <main class="dashboard-main">
                <div id="dashboardContent">
                    <!-- Content will be loaded here -->
                </div>
            </main>
        </div>
    `;
    
    document.body.appendChild(dashboard);
    
    // Show appropriate default view based on user role
    if (currentUser.role === 'admin') {
        showDashboardView('pending');
    } else {
        showDashboardView('labs');
    }
}

// Show different dashboard views
function showDashboardView(view) {
    currentView = view;
    
    // Update active nav
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    const content = document.getElementById('dashboardContent');
    
    switch(view) {
        case 'labs':
            if (currentUser.role === 'user') {
                content.innerHTML = renderDashboardLabs();
            }
            break;
        case 'bookings':
            content.innerHTML = renderBookingHistory();
            break;
        case 'pending':
            if (currentUser.role === 'admin') {
                content.innerHTML = renderPendingBookings();
            }
            break;
        case 'maintenance':
            if (currentUser.role === 'admin') {
                content.innerHTML = renderMaintenance();
            }
            break;
        case 'appointments':
            if (currentUser.role === 'admin') {
                content.innerHTML = renderAppointments();
            }
            break;
    }
}

// Render dashboard labs
function renderDashboardLabs() {
    // Get user notifications for status changes (only for users)
    const notifications = currentUser.role === 'user' ? getUserNotifications() : '';
    
    return `
        <div class="dashboard-header">
            <h2 class="dashboard-title">Laboratory Facilities</h2>
            <p class="dashboard-subtitle">Browse and book available lab slots</p>
        </div>
        ${notifications}
        <div class="labs-grid">
            ${labs.map(lab => `
                <div class="lab-card" onclick="viewLabDetails(${lab.id})">
                    <div class="lab-image">${lab.icon}</div>
                    <div class="lab-content">
                        <h3 class="lab-name">${lab.name}</h3>
                        <p class="lab-description">${lab.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Get admin notifications
function getAdminNotifications() {
    if (currentUser.role !== 'admin') return '';
    
    const pendingBookings = getStoredBookings().filter(booking => booking.status === 'pending');
    
    if (pendingBookings.length === 0) return '';
    
    return `
        <div class="notification">
            <i class="fas fa-bell"></i>
            You have ${pendingBookings.length} pending booking${pendingBookings.length > 1 ? 's' : ''} waiting for approval
        </div>
    `;
}

// View lab details
function viewLabDetails(labId) {
    const lab = labs.find(l => l.id === labId);
    if (!lab) return;
    
    const content = document.getElementById('dashboardContent');
    content.innerHTML = `
        <div class="dashboard-header">
            <button class="btn btn-outline" onclick="showDashboardView('labs')">
                <i class="fas fa-arrow-left"></i> Back to Labs
            </button>
        </div>
        <div class="lab-details">
            <div class="lab-header">
                <div class="lab-icon">${lab.icon}</div>
                <div>
                    <h2>${lab.name}</h2>
                    <p><i class="fas fa-map-marker-alt"></i> ${lab.location}</p>
                </div>
            </div>
            <div class="lab-info">
                <h3>Overview</h3>
                <p>${lab.description}</p>
                
                <h3>Available Equipment</h3>
                <ul class="equipment-list">
                    ${lab.equipment.map(eq => `<li><i class="fas fa-check"></i> ${eq}</li>`).join('')}
                </ul>
                
                <button class="btn btn-primary" onclick="showBookingForm(${lab.id})">
                    <i class="fas fa-calendar-plus"></i> Book Slot
                </button>
            </div>
        </div>
    `;
    
    // Add styles for lab details
    if (!document.getElementById('labDetailsStyles')) {
        const style = document.createElement('style');
        style.id = 'labDetailsStyles';
        style.textContent = `
            .lab-details { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .lab-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
            .lab-icon { font-size: 4rem; }
            .lab-info h3 { margin: 1.5rem 0 1rem 0; color: #1e293b; }
            .equipment-list { list-style: none; }
            .equipment-list li { padding: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem; }
            .equipment-list i { color: #10b981; }
        `;
        document.head.appendChild(style);
    }
}

// Show booking form
function showBookingForm(labId) {
    const lab = labs.find(l => l.id === labId);
    const content = document.getElementById('dashboardContent');
    
    content.innerHTML = `
        <div class="dashboard-header">
            <button class="btn btn-outline" onclick="viewLabDetails(${labId})">
                <i class="fas fa-arrow-left"></i> Back to Lab Details
            </button>
        </div>
        <div class="booking-form">
            <h2>Book Slot for ${lab.name}</h2>
            <form onsubmit="submitBooking(event, ${labId})">
                <div class="form-group">
                    <label>Select Date:</label>
                    <input type="date" id="bookingDate" required min="${getTodayDate()}">
                </div>
                <div class="form-group">
                    <label>Select Time Slot:</label>
                    <select id="timeSlot" required>
                        <option value="">Choose a time slot</option>
                        <option value="09:00-11:00">9:00 AM - 11:00 AM</option>
                        <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                        <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                        <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Purpose (Optional):</label>
                    <textarea id="purpose" rows="3" placeholder="Brief description of your research/work"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Confirm Booking</button>
            </form>
        </div>
    `;
    
    // Add form styles
    if (!document.getElementById('formStyles')) {
        const style = document.createElement('style');
        style.id = 'formStyles';
        style.textContent = `
            .booking-form { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 500px; }
            .form-group { margin-bottom: 1.5rem; }
            .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151; }
            .form-group input, .form-group select, .form-group textarea { 
                width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 8px; 
                font-size: 1rem; transition: border-color 0.2s;
            }
            .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
                outline: none; border-color: #3b82f6;
            }
        `;
        document.head.appendChild(style);
    }
}

// Submit booking
function submitBooking(event, labId) {
    event.preventDefault();
    
    const lab = labs.find(l => l.id === labId);
    const date = document.getElementById('bookingDate').value;
    const timeSlot = document.getElementById('timeSlot').value;
    const purpose = document.getElementById('purpose').value;
    
    const booking = {
        id: Date.now(),
        labId: labId,
        labName: lab.name,
        date: date,
        timeSlot: timeSlot,
        purpose: purpose,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        studentId: currentUser.studentId || 'N/A',
        status: 'pending', // Changed from 'confirmed' to 'pending'
        createdAt: new Date().toISOString()
    };
    
    // Save booking
    const bookings = getStoredBookings();
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Show success message
    showNotification('Booking request submitted! Waiting for admin approval.', 'success');
    
    // Redirect to booking history
    setTimeout(() => {
        showDashboardView('bookings');
    }, 1500);
}

// Get stored bookings
function getStoredBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}

// Render booking history
function renderBookingHistory() {
    const allBookings = getStoredBookings();
    const userBookings = currentUser.role === 'admin' ? allBookings : allBookings.filter(b => b.userId === currentUser.id);
    
    // Get notifications for status changes (only for users)
    const notifications = currentUser.role === 'user' ? getUserNotifications() : '';
    
    return `
        <div class="dashboard-header">
            <h2 class="dashboard-title">${currentUser.role === 'admin' ? 'All Bookings' : 'My Bookings'}</h2>
            <p class="dashboard-subtitle">${currentUser.role === 'admin' ? 'View all lab reservations' : 'Track all your booking requests and their status'}</p>
        </div>
        ${notifications}
        ${currentUser.role === 'user' ? renderUserBookingFilters() : ''}
        <div class="bookings-list" id="userBookingsList">
            ${userBookings.length === 0 ? 
                `<div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No Bookings Found</h3>
                    <p>${currentUser.role === 'admin' ? 'No bookings have been made yet.' : 'You haven\'t made any booking requests yet.'}</p>
                </div>` : 
                renderUserBookings(userBookings, 'all')
            }
        </div>
    `;
}

// Render user booking filters
function renderUserBookingFilters() {
    return `
        <div class="booking-filters">
            <button class="btn btn-outline filter-btn active" onclick="filterUserBookings('all')">All Bookings</button>
            <button class="btn btn-outline filter-btn" onclick="filterUserBookings('pending')">Pending</button>
            <button class="btn btn-outline filter-btn" onclick="filterUserBookings('confirmed')">Confirmed</button>
            <button class="btn btn-outline filter-btn" onclick="filterUserBookings('rejected')">Rejected</button>
        </div>
    `;
}

// Render user bookings with filtering
function renderUserBookings(bookings, filter = 'all') {
    const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);
    
    if (filteredBookings.length === 0) {
        return `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <h3>No ${filter === 'all' ? '' : filter.charAt(0).toUpperCase() + filter.slice(1)} Bookings</h3>
                <p>You don't have any ${filter === 'all' ? '' : filter} booking requests.</p>
            </div>
        `;
    }
    
    return filteredBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(booking => `
        <div class="booking-card booking-${booking.status}">
            <div class="booking-info">
                <div class="booking-header">
                    <h3>${booking.labName}</h3>
                    <span class="status-badge status-${booking.status}">${booking.status.toUpperCase()}</span>
                </div>
                <div class="booking-details">
                    <div class="detail-row">
                        <i class="fas fa-calendar"></i>
                        <span><strong>Date:</strong> ${formatDate(booking.date)}</span>
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-clock"></i>
                        <span><strong>Time:</strong> ${booking.timeSlot}</span>
                    </div>
                    ${currentUser.role === 'admin' ? `
                    <div class="detail-row">
                        <i class="fas fa-user"></i>
                        <span><strong>Student:</strong> ${booking.userName}</span>
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-envelope"></i>
                        <span><strong>Email:</strong> ${booking.userEmail}</span>
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-id-card"></i>
                        <span><strong>Student ID:</strong> ${booking.studentId}</span>
                    </div>
                    ` : ''}
                    ${booking.purpose ? `
                    <div class="detail-row">
                        <i class="fas fa-info-circle"></i>
                        <span><strong>Purpose:</strong> ${booking.purpose}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <i class="fas fa-calendar-plus"></i>
                        <span><strong>Requested:</strong> ${formatDateTime(booking.createdAt)}</span>
                    </div>
                    ${booking.status === 'confirmed' && booking.approvedAt ? `
                    <div class="detail-row status-approved">
                        <i class="fas fa-check-circle"></i>
                        <span><strong>Approved:</strong> ${formatDateTime(booking.approvedAt)} by ${booking.approvedBy}</span>
                    </div>
                    ` : ''}
                    ${booking.status === 'rejected' && booking.rejectedAt ? `
                    <div class="detail-row status-rejected">
                        <i class="fas fa-times-circle"></i>
                        <span><strong>Rejected:</strong> ${formatDateTime(booking.rejectedAt)} by ${booking.rejectedBy}</span>
                    </div>
                    ` : ''}
                    ${booking.status === 'pending' ? `
                    <div class="detail-row status-pending">
                        <i class="fas fa-hourglass-half"></i>
                        <span><strong>Status:</strong> Waiting for admin approval</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Filter user bookings
function filterUserBookings(status) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const allBookings = getStoredBookings();
    const userBookings = allBookings.filter(b => b.userId === currentUser.id);
    
    const bookingsList = document.getElementById('userBookingsList');
    bookingsList.innerHTML = renderUserBookings(userBookings, status);
}

// Get user notifications for booking status changes
function getUserNotifications() {
    if (currentUser.role === 'admin') return '';
    
    const userBookings = getStoredBookings().filter(b => b.userId === currentUser.id);
    const recentlyUpdated = userBookings.filter(booking => {
        const now = new Date();
        
        if (booking.status === 'confirmed' && booking.approvedAt) {
            const approvedTime = new Date(booking.approvedAt);
            const timeDiff = now - approvedTime;
            return timeDiff < 7 * 24 * 60 * 60 * 1000; // Within 7 days
        }
        if (booking.status === 'rejected' && booking.rejectedAt) {
            const rejectedTime = new Date(booking.rejectedAt);
            const timeDiff = now - rejectedTime;
            return timeDiff < 7 * 24 * 60 * 60 * 1000; // Within 7 days
        }
        return false;
    });
    
    if (recentlyUpdated.length === 0) return '';
    
    return recentlyUpdated.map(booking => {
        if (booking.status === 'confirmed') {
            return `
                <div class="notification success">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>Booking Approved!</strong><br>
                        Your booking for <strong>${booking.labName}</strong> on ${formatDate(booking.date)} (${booking.timeSlot}) has been approved by ${booking.approvedBy || 'Admin'}.
                    </div>
                </div>
            `;
        } else if (booking.status === 'rejected') {
            return `
                <div class="notification error">
                    <i class="fas fa-times-circle"></i>
                    <div>
                        <strong>Booking Declined</strong><br>
                        Your booking request for <strong>${booking.labName}</strong> on ${formatDate(booking.date)} (${booking.timeSlot}) has been declined by ${booking.rejectedBy || 'Admin'}.
                    </div>
                </div>
            `;
        }
        return '';
    }).join('');
}

// Render pending bookings (Admin only)
function renderPendingBookings() {
    if (currentUser.role !== 'admin') return '<p>Access denied.</p>';
    
    const pendingBookings = getStoredBookings().filter(b => b.status === 'pending');
    
    return `
        <div class="dashboard-header">
            <h2 class="dashboard-title">Pending Booking Requests</h2>
            <p class="dashboard-subtitle">Review and approve student booking requests</p>
        </div>
        ${getAdminNotifications()}
        ${pendingBookings.length === 0 ? 
            `<div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No Pending Requests</h3>
                <p>All booking requests have been processed.</p>
            </div>` : 
            `<div class="bookings-list">
                ${pendingBookings.map(booking => `
                    <div class="booking-card pending-booking">
                        <div class="booking-info">
                            <div class="booking-header">
                                <h3>${booking.labName}</h3>
                                <span class="status-badge status-pending">Pending Approval</span>
                            </div>
                            <div class="booking-details">
                                <div class="detail-row">
                                    <i class="fas fa-user"></i>
                                    <span><strong>Student:</strong> ${booking.userName}</span>
                                </div>
                                <div class="detail-row">
                                    <i class="fas fa-envelope"></i>
                                    <span><strong>Email:</strong> ${booking.userEmail}</span>
                                </div>
                                <div class="detail-row">
                                    <i class="fas fa-id-card"></i>
                                    <span><strong>Student ID:</strong> ${booking.studentId}</span>
                                </div>
                                <div class="detail-row">
                                    <i class="fas fa-calendar"></i>
                                    <span><strong>Date:</strong> ${formatDate(booking.date)}</span>
                                </div>
                                <div class="detail-row">
                                    <i class="fas fa-clock"></i>
                                    <span><strong>Time:</strong> ${booking.timeSlot}</span>
                                </div>
                                ${booking.purpose ? `
                                <div class="detail-row">
                                    <i class="fas fa-info-circle"></i>
                                    <span><strong>Purpose:</strong> ${booking.purpose}</span>
                                </div>
                                ` : ''}
                                <div class="detail-row">
                                    <i class="fas fa-calendar-plus"></i>
                                    <span><strong>Requested:</strong> ${formatDateTime(booking.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                        <div class="booking-actions">
                            <button class="btn btn-success btn-large" onclick="approveBooking(${booking.id})">
                                <i class="fas fa-check"></i> Accept Request
                            </button>
                            <button class="btn btn-danger btn-large" onclick="rejectBooking(${booking.id})">
                                <i class="fas fa-times"></i> Reject Request
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>`
        }
    `;
}

// Approve booking
function approveBooking(bookingId) {
    const bookings = getStoredBookings();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        booking.status = 'confirmed';
        booking.approvedAt = new Date().toISOString();
        booking.approvedBy = currentUser.name;
        
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        console.log('Booking approved:', booking); // Debug log
        
        showNotification(`Booking request for ${booking.labName} has been approved!`, 'success');
        
        // Refresh the pending bookings view
        setTimeout(() => {
            showDashboardView('pending');
        }, 1000);
    }
}

// Reject booking
function rejectBooking(bookingId) {
    const bookings = getStoredBookings();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        booking.status = 'rejected';
        booking.rejectedAt = new Date().toISOString();
        booking.rejectedBy = currentUser.name;
        
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        console.log('Booking rejected:', booking); // Debug log
        
        showNotification(`Booking request for ${booking.labName} has been rejected.`, 'error');
        
        // Refresh the pending bookings view
        setTimeout(() => {
            showDashboardView('pending');
        }, 1000);
    }
}

// Debug function to check notifications
function debugNotifications() {
    console.log('Current user:', currentUser);
    console.log('All bookings:', getStoredBookings());
    console.log('User bookings:', getStoredBookings().filter(b => b.userId === currentUser.id));
    console.log('Notifications HTML:', getUserNotifications());
}

// Render maintenance (admin only)
function renderMaintenance() {
    return `
        <div class="dashboard-header">
            <h2 class="dashboard-title">Maintenance Records</h2>
            <p class="dashboard-subtitle">Lab maintenance and service history</p>
        </div>
        <div class="maintenance-list">
            <p>Maintenance records feature coming soon...</p>
        </div>
    `;
}

// Render appointments (admin only)
function renderAppointments() {
    if (currentUser.role !== 'admin') return '<p>Access denied.</p>';
    
    const allBookings = getStoredBookings();
    
    return `
        <div class="dashboard-header">
            <h2 class="dashboard-title">All Bookings</h2>
            <p class="dashboard-subtitle">Complete overview of all lab bookings</p>
        </div>
        ${getAdminNotifications()}
        <div class="booking-filters">
            <button class="btn btn-outline filter-btn active" onclick="filterBookings('all')">All</button>
            <button class="btn btn-outline filter-btn" onclick="filterBookings('confirmed')">Confirmed</button>
            <button class="btn btn-outline filter-btn" onclick="filterBookings('pending')">Pending</button>
            <button class="btn btn-outline filter-btn" onclick="filterBookings('rejected')">Rejected</button>
        </div>
        <div class="appointments-list" id="appointmentsList">
            ${allBookings.length === 0 ? 
                '<p>No bookings found.</p>' : 
                allBookings.map(booking => `
                    <div class="appointment-card booking-${booking.status}">
                        <div class="appointment-info">
                            <h3>${booking.labName}</h3>
                            <p><i class="fas fa-user"></i> ${booking.userName} (${booking.userEmail})</p>
                            <p><i class="fas fa-id-card"></i> Student ID: ${booking.studentId}</p>
                            <p><i class="fas fa-calendar"></i> ${formatDate(booking.date)}</p>
                            <p><i class="fas fa-clock"></i> ${booking.timeSlot}</p>
                            ${booking.purpose ? `<p><i class="fas fa-info-circle"></i> ${booking.purpose}</p>` : ''}
                            <p><i class="fas fa-calendar-plus"></i> Requested: ${formatDateTime(booking.createdAt)}</p>
                        </div>
                        <div class="appointment-status">
                            <span class="status-badge status-${booking.status}">${booking.status}</span>
                            ${booking.status === 'pending' ? `
                                <div class="quick-actions">
                                    <button class="btn btn-sm btn-success" onclick="approveBooking(${booking.id})">Approve</button>
                                    <button class="btn btn-sm btn-danger" onclick="rejectBooking(${booking.id})">Reject</button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')
            }
        </div>
    `;
}

// Filter bookings
function filterBookings(status) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const allBookings = getStoredBookings();
    const filteredBookings = status === 'all' ? allBookings : allBookings.filter(b => b.status === status);
    
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = filteredBookings.length === 0 ? 
        `<p>No ${status === 'all' ? '' : status} bookings found.</p>` : 
        filteredBookings.map(booking => `
            <div class="appointment-card booking-${booking.status}">
                <div class="appointment-info">
                    <h3>${booking.labName}</h3>
                    <p><i class="fas fa-user"></i> ${booking.userName} (${booking.userEmail})</p>
                    <p><i class="fas fa-id-card"></i> Student ID: ${booking.studentId}</p>
                    <p><i class="fas fa-calendar"></i> ${formatDate(booking.date)}</p>
                    <p><i class="fas fa-clock"></i> ${booking.timeSlot}</p>
                    ${booking.purpose ? `<p><i class="fas fa-info-circle"></i> ${booking.purpose}</p>` : ''}
                    <p><i class="fas fa-calendar-plus"></i> Requested: ${formatDateTime(booking.createdAt)}</p>
                </div>
                <div class="appointment-status">
                    <span class="status-badge status-${booking.status}">${booking.status}</span>
                    ${booking.status === 'pending' ? `
                        <div class="quick-actions">
                            <button class="btn btn-sm btn-success" onclick="approveBooking(${booking.id})">Approve</button>
                            <button class="btn btn-sm btn-danger" onclick="rejectBooking(${booking.id})">Reject</button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
}

// Utility functions
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i> ${message}`;
    
    // Try to add to dashboard content first, then fallback to body
    const dashboardContent = document.getElementById('dashboardContent');
    const mainContent = document.querySelector('.main-content');
    
    if (dashboardContent) {
        dashboardContent.insertBefore(notification, dashboardContent.firstChild);
    } else if (mainContent) {
        mainContent.insertBefore(notification, mainContent.firstChild);
    } else {
        document.body.insertBefore(notification, document.body.firstChild);
    }
    
    // Auto remove notification
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

function signOut() {
    // Clear current user but keep bookings data
    localStorage.removeItem('currentUser');
    currentUser = null;
    
    // Remove dashboard
    const dashboard = document.querySelector('.dashboard');
    if (dashboard) dashboard.remove();
    
    // Show homepage
    document.querySelector('.main-content').style.display = 'block';
    document.querySelector('.header').style.display = 'block';
    
    showNotification('Signed out successfully!', 'success');
}

// Window click event to close modals
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Test function to create a sample booking (for debugging)
function createTestBooking() {
    if (!currentUser || currentUser.role !== 'user') {
        console.log('Please login as a user first');
        return;
    }
    
    const testBooking = {
        id: Date.now(),
        labId: 1,
        labName: "Assistive Technology",
        date: "2024-12-20",
        timeSlot: "09:00-11:00",
        purpose: "Test booking for notification system",
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        studentId: currentUser.studentId || 'TEST123',
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    const bookings = getStoredBookings();
    bookings.push(testBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    console.log('Test booking created:', testBooking);
    showNotification('Test booking created successfully!', 'success');
}