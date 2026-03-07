// ============================================
// D-Wali Cosmetics — Static Data Constants
// ============================================

// --- Gallery Images (Client Gallery Section) ---
export const GALLERY_IMAGES = [
  "/asserts/images/Clint-with-product-1.webp",
  "/asserts/images/Clint-with-product-2.webp",
  "/asserts/images/Clint-with-product-3.webp",
  "/asserts/images/Clint-with-product-4.webp",
  "/asserts/images/dwaki-customer-showcase.webp",
  "/asserts/images/Clint-with-product-5.webp",
  "/asserts/images/Clint-with-product-6.webp",
  "/asserts/images/Clint-with-product-7.webp",
  "/asserts/images/Clint-with-product-8.webp",
];

// --- Benefits Section ---
export const BENEFITS = [
  {
    icon: "fa-magic",
    title: "Anti-Aging Properties",
    description:
      "Advanced formula that reduces fine lines and wrinkles, revealing youthful, radiant skin.",
  },
  {
    icon: "fa-tint",
    title: "Deep Moisturizing",
    description:
      "Intensive hydration that penetrates deep into the skin layers for lasting softness.",
  },
  {
    icon: "fa-snowflake",
    title: "Winter Protection",
    description:
      "Creates a protective barrier against harsh weather conditions and environmental damage.",
  },
  {
    icon: "fa-heart",
    title: "Healing Formula",
    description:
      "Soothes and repairs damaged skin, promoting natural healing and regeneration.",
  },
  {
    icon: "fa-shield-virus",
    title: "Antioxidant Rich",
    description:
      "Packed with powerful antioxidants that fight free radicals and prevent skin damage.",
  },
  {
    icon: "fa-water",
    title: "Water-Based Formula",
    description:
      "Light, non-greasy texture that absorbs quickly without clogging pores.",
  },
];

// --- Partner Benefits Section ---
export const PARTNER_BENEFITS = [
  {
    icon: "fa-boxes",
    title: "Bulk Orders",
    description: "Competitive pricing for wholesale quantities",
  },
  {
    icon: "fa-truck",
    title: "Global Shipping",
    description: "Reliable delivery to destinations worldwide",
  },
  {
    icon: "fa-handshake",
    title: "Business Support",
    description: "Dedicated account management and marketing materials",
  },
  {
    icon: "fa-certificate",
    title: "Quality Guaranteed",
    description: "Premium products backed by our satisfaction guarantee",
  },
];

// --- Placeholder Reviews (fallback when Appwrite is unreachable) ---
export const PLACEHOLDER_REVIEWS = [
  {
    $id: "1",
    name: "Jennifer A.",
    rating: 5,
    title: "Life-changing skincare!",
    review:
      "I've tried countless anti-aging creams, but D-Wali is truly different. My skin feels softer, looks brighter, and the fine lines around my eyes have visibly reduced. Absolutely worth every penny!",
    imageId: null,
    createdAt: "2025-12-15T10:00:00.000Z",
  },
  {
    $id: "2",
    name: "Maria S.",
    rating: 5,
    title: "Best cream I've ever used",
    review:
      "After just two weeks of using D-Wali, I noticed a remarkable difference. My hands no longer look dry and aged. The cream absorbs quickly and leaves my skin feeling luxuriously smooth.",
    imageId: null,
    createdAt: "2025-12-20T14:30:00.000Z",
  },
  {
    $id: "3",
    name: "Patricia L.",
    rating: 5,
    title: "My daily essential",
    review:
      "D-Wali has become an essential part of my skincare routine. The moisturizing effect lasts all day, and I love the subtle, elegant fragrance. My friends keep asking what's my secret!",
    imageId: null,
    createdAt: "2025-12-28T09:15:00.000Z",
  },
];

// --- Navigation Sections ---
export const NAV_SECTIONS = [
  "hero",
  "about",
  "products",
  "benefits",
  "story",
  "contact",
];

// --- Reviews Config ---
export const REVIEWS_PER_PAGE = 3;

// --- Auto-Carousel Config ---
export const CAROUSEL_INTERVAL_MS = 3500;

// --- Preloader Duration ---
export const PRELOADER_DURATION_MS = 2500;
