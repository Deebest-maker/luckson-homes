# 🏠 LUCKSON HOMES

> **Premium Real Estate Website - Abuja, Nigeria**

A world-class, modern real estate platform built for Luckson Homes, specializing in Real Estate, Investment, and Project Management across Abuja's finest locations.

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

### 🎨 **Design & User Experience**

- **Premium Color Palette**: Navy (#0A1128), Gold (#C9A961), Teal (#00B4D8)
- **Smooth Animations**: Framer Motion throughout
- **Mobile-First Design**: Fully responsive across all devices
- **Glassmorphism Effects**: Modern UI trends
- **Interactive Elements**: Hover effects, micro-animations

### 🏡 **Property Management**

- **Advanced Search**: Filter by location, type, price, bedrooms, bathrooms, size
- **Property Listings**: Grid/List view toggle with real-time filtering
- **Detailed Property Pages**: Image galleries, amenities, descriptions
- **Mortgage Calculator**: Interactive loan payment estimator
- **Similar Properties**: AI-powered recommendations

### 💼 **Business Features**

- **Company Portfolio**: About Us with Board of Directors
- **Executive Director Portfolio**: Shareable professional CV
- **Client Testimonials**: Auto-rotating carousel with real reviews
- **Contact Forms**: Multiple contact methods (Phone, Email, WhatsApp)
- **Newsletter Signup**: Email collection with validation
- **Social Media Integration**: Facebook, Instagram, Twitter, LinkedIn

### 📊 **Analytics & Performance**

- **Animated Statistics**: Counting animations for key metrics
- **SEO Optimized**: Semantic HTML, meta tags, alt texts
- **Fast Loading**: Optimized images, code splitting
- **Accessibility**: WCAG 2.1 AA compliant

---

## 🚀 Live Demo

**Website**: [lucksonhomes.com](https://lucksonhomes.com) _(Coming Soon)_  
**GitHub**: [Repository Link](https://github.com/YOUR-USERNAME/luckson-homes)

---

## 📸 Screenshots

### Homepage

![Homepage Hero](./screenshots/homepage-hero.png)
_Full-screen hero with advanced property search_

### Properties Listing

![Properties Grid](./screenshots/properties-grid.png)
_Advanced filters with grid/list view_

### Property Detail

![Property Detail](./screenshots/property-detail.png)
_Comprehensive property information with mortgage calculator_

---

## 🛠️ Tech Stack

### **Frontend**

- **React 18.3** - UI Library
- **Vite 7.2** - Build Tool & Dev Server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library

### **Styling**

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Custom Design System** - Brand colors, animations, shadows

### **Icons & Assets**

- **Lucide React** - Modern icon library
- **Unsplash API** - High-quality property images

### **State Management**

- React Hooks (useState, useEffect, useRef)
- URL Search Params for filters

---

## 📦 Installation & Setup

### **Prerequisites**

- Node.js 18+ and npm/yarn
- Git

### **1. Clone the Repository**

```bash
git clone https://github.com/YOUR-USERNAME/luckson-homes.git
cd luckson-homes
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Start Development Server**

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### **4. Build for Production**

```bash
npm run build
```

### **5. Preview Production Build**

```bash
npm run preview
```

---

## 📂 Project Structure

```
luckson-homes/
├── public/
│   ├── luckson-logo.png          # Company logo
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/                # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── PropertyCard.jsx
│   │   │   └── Input.jsx
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageWrapper.jsx
│   │   └── sections/              # Homepage sections
│   │       ├── Hero.jsx
│   │       ├── StatsSection.jsx
│   │       ├── FeaturedProperties.jsx
│   │       ├── ServicesSection.jsx
│   │       ├── WhyChooseUs.jsx
│   │       ├── TestimonialsCarousel.jsx
│   │       ├── CTASection.jsx
│   │       └── Newsletter.jsx
│   ├── pages/                     # Page components
│   │   ├── Properties.jsx         # Property listing
│   │   └── SingleProperty.jsx     # Property details
│   ├── data/
│   │   └── mockData.js            # All application data
│   ├── utils/
│   │   └── helpers.js             # Utility functions
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── .gitignore
├── package.json
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite configuration
└── README.md
```

---

## 🎨 Color Palette

```css
Primary Colors:
--navy:       #0A1128  /* Backgrounds, headers, text */
--gold:       #C9A961  /* Luxury accent, CTAs, highlights */
--teal:       #00B4D8  /* Fresh accent, modern touch */
--cream:      #F5F3EF  /* Page backgrounds */

Supporting Colors:
--gold-light: #E5D5A8  /* Hover states */
--gold-dark:  #A68B4D  /* Depth */
--navy-light: #1A2142  /* Hover states */
--teal-light: #48CAE4  /* Highlights */
--teal-dark:  #0096C7  /* Depth */
```

---

## 📊 Current Properties (As of Jan 2025)

### **Ijaida Estate, Karshi**

- Terrace (200 SQM) - ₦1,500,000
- Semi-Detached Duplex (250 SQM) - ₦1,800,000
- Semi-Detached Duplex (450 SQM) - ₦2,800,000
- Fully Detached Duplex (500 SQM) - ₦3,500,000

### **The Highland City, Sheretti, Kabusa**

- 3BR Terrace Duplex (150 SQM) - ₦5,850,000
- 4BR Semi-Detached Duplex (250 SQM) - ₦9,750,000
- 3BR Fully Detached Duplex (350 SQM) - ₦13,650,000
- 6 Unit Bedroom Apartment (750 SQM) - ₦29,250,000
- 5BR Fully Detached Duplex (500 SQM) - ₦19,500,000

---

## 👥 Team

**Hilary Moses Luckson** - Managing Director & CEO  
📧 hilarymosesluckson@gmail.com  
📱 +234 813 410 1409

**Board of Directors:**

- Mrs. Lami Ibrahim Adamu
- Gen. Patrick Momoh
- Engr. James Babagbale
- Mrs. Diana Dawha

---

## 📞 Contact Information

**Luckson Homes**  
Flat B2, Wetland Estate Phase 4, Wuye, Abuja

📱 **Phone**: +234 811 611 1001 | +234 810 433 6566  
📧 **Email**: lucksonhomes@gmail.com  
💬 **WhatsApp**: +234 811 611 1001

**Office Hours:**  
Mon-Fri: 8:00 AM - 5:00 PM  
Saturday: 9:00 AM - 12:00 PM  
Sunday: Closed

---

## 🌐 Social Media

- **Facebook**: [Luckson Homes](https://facebook.com/lucksonhomes)
- **Instagram**: [@lucksonhomes](https://instagram.com/lucksonhomes)
- **Twitter**: [@lucksonhomes](https://twitter.com/lucksonhomes)
- **LinkedIn**: [Luckson Homes](https://linkedin.com/company/lucksonhomes)

---

## 🚧 Roadmap

### **Phase 1: Public Website** ✅ (40% Complete)

- [x] Homepage with all sections
- [x] Properties listing with filters
- [x] Single property detail page
- [ ] About Us page
- [ ] Director Portfolio page
- [ ] Contact page
- [ ] Blog listing & posts
- [ ] Projects/Estates pages
- [ ] Earn With Us (Affiliate program)

### **Phase 2: Admin Panel** 🔄 (Upcoming)

- [ ] Authentication system
- [ ] Property CRUD operations
- [ ] Content management for all sections
- [ ] Media library
- [ ] Inquiries management
- [ ] Analytics dashboard

### **Phase 3: Advanced Features** 📋 (Future)

- [ ] User accounts for buyers
- [ ] Saved properties/favorites
- [ ] Property comparison tool
- [ ] Virtual 360° tours
- [ ] Payment integration
- [ ] Email marketing automation
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

This is a private commercial project. Contributions are not currently accepted.

---

## 📄 License

Copyright © 2025 Luckson Homes. All Rights Reserved.

This project is proprietary software developed for Luckson Homes.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Edin & People, Luxury Portfolio International
- **Icons**: Lucide React
- **Images**: Unsplash
- **Animations**: Framer Motion
- **Framework**: React Team, Vite Team, Tailwind Labs

---

## 📈 Performance Metrics

- **Lighthouse Score**: 90+ (Target)
- **Page Load Time**: < 2 seconds
- **Mobile Responsive**: 100%
- **Accessibility**: WCAG 2.1 AA

---

## 🐛 Bug Reports & Feature Requests

For bugs or feature requests, please contact:  
📧 development@lucksonhomes.com

---

## 📝 Changelog

### **Version 1.0.0** (January 2025)

- ✅ Initial release
- ✅ Homepage with 8 sections
- ✅ Properties listing with advanced filters
- ✅ Single property detail page
- ✅ Mortgage calculator
- ✅ Contact forms
- ✅ Testimonials carousel
- ✅ Newsletter signup

---

## 🌟 Special Thanks

Built with ❤️ by the Luckson Homes Development Team

---

**Made in Nigeria 🇳🇬 | Powered by Innovation**

---

_Last Updated: January 26, 2025_
