// ============================================
// D-Wali Cosmetics — Product Data
// ============================================

export const PRODUCTS = [
  {
    id: "full-collection",
    slug: "full-collection",
    name: "The Full Collection",
    tagline: "Complete Premium Skincare — Everything Your Skin Needs",
    shortDescription:
      "Experience the full range of D-Wali premium skincare products designed for radiant, healthy skin.",
    fullDescription:
      "The D-Wali Full Collection brings together our three signature products — the Anti-Aging Hand & Body Cream, Anti-Fungal Cuticle & Body Oil, and Liquid Gold Shower Gel. Each product is carefully crafted with premium ingredients including rooibos extract, natural essential oils, and powerful antioxidants. Together, they form a complete skincare routine that cleanses, nourishes, heals, and protects your skin from head to toe. Whether you're combating signs of aging, treating fungal concerns, or simply indulging in luxury daily care, this collection has you covered.",
    ingredients:
      "Hand & Body Cream: Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride, Benzyl Alcohol, Methylchlorisothiazolinone, Methylisothiazolinone, Rooibos Extract, Parfum. • Cuticle & Body Oil: Castor Oil, Olive Oil, Coconut Oil, Tea Tree, Peppermint, Lavender, Frankincense. • Shower Gel: Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride, Benzyl Alcohol, Methylchlorisothiazolinone, Methylisothiazolinone, Rooibos Extract, Parfum.",
    heroImage: "/asserts/images/All-products-together.webp",
    gallery: [
      "/asserts/images/All-products-together.webp",
      "/asserts/images/All-products.webp",
      "/asserts/images/Dwali-hand-&-Body-Lotion.webp",
      "/asserts/images/dwali-oil.webp",
      "/asserts/images/dwali-shower-gel.webp",
      "/asserts/images/D-wali-body-lotion.webp",
    ],
    benefits: [
      {
        icon: "fa-gem",
        title: "Complete Routine",
        description: "Cleanse, nourish, and protect — all in one collection",
      },
      {
        icon: "fa-magic",
        title: "Anti-Aging Power",
        description: "Combat fine lines with our signature hand & body cream",
      },
      {
        icon: "fa-shield-virus",
        title: "Anti-Fungal Care",
        description: "Natural oil blend for healthy skin and nails",
      },
      {
        icon: "fa-shower",
        title: "Luxury Cleansing",
        description: "Rooibos-infused shower gel for radiant clean",
      },
    ],
    color: "#d4a853",
    isCollection: true,
  },
  {
    id: "anti-aging-hand-body-cream",
    slug: "anti-aging-hand-body-cream",
    name: "Anti-Aging Hand & Body Cream",
    tagline: "Premium Skincare for Radiant, Youthful Skin",
    shortDescription:
      "Our signature anti-aging formula that heals, moisturizes, and protects your skin all year round.",
    fullDescription:
      "D-Wali Anti-Aging Hand & Body Cream is our flagship product, meticulously formulated with powerful antioxidants and nourishing ingredients. This luxurious cream penetrates deep into the skin layers, combating fine lines and wrinkles while providing all-day hydration. Perfect for winter protection or as a water-based daily moisturizer, it delivers visible results from the very first application.",
    ingredients:
      "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride, Benzyl Alcohol, Methylchlorisothiazolinone, Methylisothiazolinone, Rooibos Extract, Parfum.",
    heroImage: "/asserts/images/Dwali-hand-&-Body-Lotion.webp",
    gallery: [
      "/asserts/images/D-wali-anti-aging-hand-cream.webp",
      "/asserts/images/Dwali-hand-cream.webp",
      "/asserts/images/Dwali-hand-c.webp",
      "/asserts/images/dwali-anti-aging-b&h.webp",
      "/asserts/images/dwali-b&h-new2.webp",
      "/asserts/images/dwali-b&h-product-display.webp",
      "/asserts/images/dwali-b&h-new-1.webp",
    ],
    benefits: [
      {
        icon: "fa-magic",
        title: "Anti-Aging Formula",
        description: "Reduces fine lines and wrinkles for youthful skin",
      },
      {
        icon: "fa-tint",
        title: "Deep Moisturizing",
        description: "Intensive hydration that lasts all day",
      },
      {
        icon: "fa-snowflake",
        title: "Winter Protection",
        description: "Creates a protective barrier against harsh weather",
      },
      {
        icon: "fa-leaf",
        title: "Rooibos Extract",
        description: "Rich in antioxidants for natural skin repair",
      },
    ],
    color: "#d4a853",
  },
  {
    id: "anti-fungal-cuticle-body-oil",
    slug: "anti-fungal-cuticle-body-oil",
    name: "Anti-Fungal Cuticle & Body Oil",
    tagline: "Nature's Healing Power in Every Drop",
    shortDescription:
      "A powerful blend of natural oils enriched with essential oils for healthy skin and nails.",
    fullDescription:
      "D-Wali Anti-Fungal Cuticle & Body Oil is a powerhouse of nature's finest healing oils. Combining Castor Oil, Olive Oil, and Coconut Oil with therapeutic-grade essential oils including Tea Tree, Peppermint, Lavender, and Frankincense, this oil delivers exceptional anti-fungal protection while deeply nourishing your skin and cuticles. Each ingredient is carefully selected for its proven healing and restorative properties.",
    ingredients:
      "Castor Oil, Olive Oil, Coconut Oil, Tea Tree, Peppermint, Lavender, Frankincense.",
    heroImage: "/asserts/images/dwali-oil.webp",
    gallery: [
      "/asserts/images/dwali-oil.webp",
      "/asserts/images/All-products-together.webp",
      "/asserts/images/All-products.webp",
    ],
    benefits: [
      {
        icon: "fa-shield-virus",
        title: "Anti-Fungal Protection",
        description: "Tea Tree oil provides powerful anti-fungal properties",
      },
      {
        icon: "fa-spa",
        title: "Cuticle Care",
        description: "Strengthens and nourishes nails and cuticles",
      },
      {
        icon: "fa-leaf",
        title: "100% Natural Oils",
        description: "Pure blend of Castor, Olive, and Coconut oils",
      },
      {
        icon: "fa-heart",
        title: "Healing Aromatherapy",
        description: "Lavender and Frankincense for calming repair",
      },
    ],
    color: "#7fb069",
  },
  {
    id: "liquid-gold-shower-gel",
    slug: "liquid-gold-shower-gel",
    name: "Liquid Gold Shower Gel",
    tagline: "Transform Your Shower Into a Luxurious Experience",
    shortDescription:
      "A premium shower gel infused with rooibos extract for a radiant cleanse.",
    fullDescription:
      "D-Wali Liquid Gold Shower Gel transforms your daily shower into a spa-like indulgence. This rich, lathering formula gently cleanses while infusing your skin with rooibos extract — one of nature's most powerful antioxidants. The golden formula leaves your skin feeling refreshed, hydrated, and radiantly clean. Its sophisticated fragrance lingers on the skin, making every shower a luxurious experience.",
    ingredients:
      "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride, Benzyl Alcohol, Methylchlorisothiazolinone, Methylisothiazolinone, Rooibos Extract, Parfum.",
    heroImage: "/asserts/images/dwali-shower-gel.webp",
    gallery: [
      "/asserts/images/dwali-shower-gel.webp",
      "/asserts/images/D-wali-body-lotion.webp",
      "/asserts/images/Dwali-hand-&-Body-Lotion.webp",
      "/asserts/images/All-products-together.webp",
    ],
    benefits: [
      {
        icon: "fa-shower",
        title: "Luxury Lather",
        description: "Rich, creamy foam for a spa-like cleanse",
      },
      {
        icon: "fa-sun",
        title: "Rooibos Infused",
        description: "Antioxidant-rich formula for radiant skin",
      },
      {
        icon: "fa-water",
        title: "Gentle Cleansing",
        description: "Cleanses without stripping natural oils",
      },
      {
        icon: "fa-wind",
        title: "Lasting Fragrance",
        description: "Sophisticated scent that lingers all day",
      },
    ],
    color: "#c79a3f",
  },
];

/**
 * Find a product by its URL slug
 * @param {string} slug - Product URL slug
 * @returns {object|undefined} Product data or undefined
 */
export const getProductBySlug = (slug) => {
  return PRODUCTS.find((product) => product.slug === slug);
};
