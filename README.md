# Centre of Excellence Lab Booking System

A modern, responsive web application for booking laboratory facilities at the Centre of Excellence @ REC.

## Features

### 🏠 Homepage
- Clean, academic design with modern UI
- Grid display of all 15 Centre of Excellence labs
- Each lab shown as an interactive card with icon, name, and description
- Google Authentication for login/signup

### 👤 User Dashboard
- **Lab Browsing**: View all available labs with detailed information
- **Lab Details**: Comprehensive lab information including location, equipment, and overview
- **Slot Booking**: Interactive booking system with date and time selection
- **Booking History**: Track all past and upcoming reservations
- **Profile Management**: User information and role display

### 🛠️ Admin Dashboard
- **Booking Notifications**: Real-time alerts for new user bookings
- **Booking Management**: View all user bookings across all labs
- **Maintenance Records**: Lab maintenance tracking (coming soon)
- **Appointment Overview**: Upcoming bookings dashboard

## Labs Included

1. **Assistive Technology** - Accessibility and independence solutions
2. **Biofilms** - Microbial communities research
3. **Computational Fluid Dynamics** - Advanced fluid flow simulation
4. **Digital Manufacturing** - Industry 4.0 and smart manufacturing
5. **Data Science** - Analytics and machine learning
6. **Electric Vehicles** - Sustainable transportation technology
7. **Embedded Technologies** - IoT and embedded systems
8. **Food Products and Process Design** - Food technology innovation
9. **High-Speed Jet Flows** - Aerospace aerodynamics research
10. **Internet of Things** - Connected devices and smart systems
11. **Machine Vision** - Computer vision and image processing
12. **Medical Imaging** - Healthcare imaging technologies
13. **MEMS & Microfluidics** - Micro-scale devices and systems
14. **Renewable Energy** - Sustainable energy technologies
15. **Sustainable Construction Materials** - Eco-friendly building materials

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Authentication**: Google OAuth (mock implementation)
- **Storage**: LocalStorage for demo purposes

## Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean cards, soft shadows, rounded corners
- **Color Scheme**: Professional blue and yellow accent colors
- **Typography**: Inter font family for excellent readability
- **Accessibility**: Focus states, semantic HTML, proper contrast ratios

## Getting Started

1. **Open the Application**
   ```bash
   # Simply open index.html in a web browser
   open index.html
   ```

2. **Login Options**
   - **Regular User**: Click "Login" or "Sign Up" and use Google Auth
   - **Admin Demo**: Click "Demo Admin" button for admin features

3. **Browse Labs**
   - View all labs on the homepage or dashboard
   - Click any lab card to see detailed information

4. **Book a Slot**
   - Navigate to lab details
   - Click "Book Slot"
   - Select date and time
   - Confirm booking

## User Roles

### User
- Browse all labs
- View lab details and equipment
- Book available time slots
- View personal booking history
- Manage profile

### Admin
- All user features
- View booking notifications
- Access all user bookings
- Manage maintenance records
- View appointment details

## File Structure

```
├── index.html          # Main homepage
├── styles.css          # Complete styling
├── script.js           # Application logic
└── README.md          # Documentation
```

## Key Features Implementation

### Authentication
- Google OAuth integration (mock for demo)
- Role-based access control
- Persistent login state

### Booking System
- Date and time slot selection
- Booking confirmation
- History tracking
- Admin notifications

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive navigation
- Touch-friendly interfaces

### User Experience
- Smooth transitions
- Loading states
- Success/error notifications
- Intuitive navigation

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Future Enhancements

- Real Google OAuth integration
- Backend API integration
- Email notifications
- Calendar integration
- Equipment-specific booking
- Maintenance scheduling
- Reporting dashboard
- Mobile app

## Demo Credentials

For testing purposes:
- **Regular User**: Use "Login" or "Sign Up" buttons
- **Admin Access**: Use "Demo Admin" button

## Contributing

This is a demonstration project showcasing modern web development practices for academic institution management systems.

## License

Educational use only - Centre of Excellence @ REC