# D-Wali Cosmetics — Premium Portfolio Website

A premium, high-performance React portfolio website for **D-Wali Cosmetics**, a South African skincare brand specializing in anti-aging, anti-fungal, and luxury body care products.

> **Live Site:** _Coming soon_

---

##  Features

- **Individual Product Pages** — Dedicated detail pages for each product with image galleries, ingredients, benefits, and CTAs
- **Video Carousel** — Showcasing 7 client testimonial and product demo videos with thumbnails and navigation
- **Client Gallery** — Auto-playing carousel of happy clients using D-Wali products
- **Review System** — Powered by Appwrite backend with image upload support
- **Contact Form** — Direct inquiry form connected to Appwrite database
- **Dark/Light Theme** — Toggle with smooth transitions
- **Custom Cursor** — Premium interactive cursor effect (desktop)
- **Smooth Animations** — Framer Motion scroll-triggered animations throughout
- **3D Product Display** — Interactive Three.js product viewer with drag rotation
- **Responsive Design** — Fully responsive from mobile to 4K displays
- **Performance Optimized** — Code-split into 15+ lazy-loaded chunks

---

##  Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router** | Client-side routing |
| **Framer Motion** | Animations & transitions |
| **Three.js** | 3D product visualization |
| **Appwrite** | Backend (reviews, contact form) |
| **Font Awesome** | Icons |
| **Sharp** | Image optimization (build tool) |

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── About.jsx
│   ├── BackToTop.jsx
│   ├── Benefits.jsx
│   ├── ClientGallery.jsx
│   ├── Contact.jsx
│   ├── CustomCursor.jsx
│   ├── ErrorBoundary.jsx
│   ├── Footer.jsx
│   ├── GalleryItem.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── Partners.jsx
│   ├── Preloader.jsx
│   ├── Products.jsx
│   ├── ReviewModal.jsx
│   ├── Reviews.jsx
│   ├── StatCounter.jsx
│   ├── Story.jsx
│   └── VideoShowcase.jsx
├── constants/           # Centralized static data
│   ├── index.js         # UI constants, benefits, nav sections
│   └── products.js      # Product data (ingredients, images, benefits)
├── hooks/               # Custom React hooks
│   ├── useScrollPosition.js
│   └── useTilt.js
├── lib/
│   └── appwrite.js      # Appwrite SDK configuration & API
├── pages/               # Route-level page components
│   ├── HomePage.jsx
│   └── ProductPage.jsx
├── styles/
│   └── index.css        # Global styles & design system
├── App.jsx              # Router shell
└── main.jsx             # Entry point
```

---

##  Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/D-wali.git
cd D-wali

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview    # Preview the production build
```

### Image Optimization

```bash
npm run optimize-images
```

Converts all JPG/PNG images in `public/asserts/images/` to WebP format using Sharp.

---

##  Products

| Product | Route |
|---|---|
| Anti-Aging Hand & Body Cream | `/products/anti-aging-hand-body-cream` |
| Anti-Fungal Cuticle & Body Oil | `/products/anti-fungal-cuticle-body-oil` |
| Liquid Gold Shower Gel | `/products/liquid-gold-shower-gel` |

---

##  Performance

The app is optimized with:

- **Code Splitting** — `React.lazy` + `Suspense` for all below-the-fold sections and pages
- **Memoization** — `React.memo`, `useMemo`, `useCallback` across all components
- **WebP Images** — All images converted from JPG/PNG to WebP (40-92% smaller)
- **Passive Event Listeners** — For scroll and mouse tracking
- **Error Boundaries** — Graceful error recovery without full page crashes

### Build Output

```
15+ code-split chunks
Main bundle: ~288 KB (95 KB gzipped)
CSS: ~136 KB (34 KB gzipped)
```

---

##  Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_REVIEWS_COLLECTION_ID=your_reviews_collection_id
VITE_APPWRITE_CONTACTS_COLLECTION_ID=your_contacts_collection_id
VITE_APPWRITE_STORAGE_BUCKET_ID=your_storage_bucket_id
```

---

## 📄 License

© 2025 D-Wali Cosmetics. All Rights Reserved.

Designed for Beautiful Skin. 💛
