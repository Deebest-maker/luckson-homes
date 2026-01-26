// ============================================
// HELPER FUNCTIONS
// Utility functions used throughout the app
// ============================================

// Format price in Nigerian Naira
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Format price in short form (e.g., ₦45M, ₦22.5M)
export const formatPriceShort = (price) => {
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
  }
  return formatPrice(price);
};

// Format date to readable format
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Calculate reading time for blog posts
export const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};

// Truncate text to specified length
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

// Generate slug from title
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate Nigerian phone number
export const isValidPhone = (phone) => {
  // Remove spaces, dashes, and brackets
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

  // Check for Nigerian phone patterns
  const patterns = [
    /^(\+234|234|0)[7-9][0-1]\d{8}$/, // Nigerian mobile
    /^(\+234|234|0)[1-9]\d{8}$/, // Nigerian landline
  ];

  return patterns.some((pattern) => pattern.test(cleanPhone));
};

// Format phone number for display
export const formatPhone = (phone) => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

  if (cleanPhone.startsWith("+234")) {
    return cleanPhone.replace(/(\+234)(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
  }
  if (cleanPhone.startsWith("234")) {
    return cleanPhone.replace(/(234)(\d{3})(\d{3})(\d{4})/, "+$1 $2 $3 $4");
  }
  if (cleanPhone.startsWith("0")) {
    return cleanPhone.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  }

  return phone;
};

// Scroll to top smoothly
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Scroll to element
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Share on social media
export const shareOnSocial = (platform, url, title) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  if (urls[platform]) {
    window.open(urls[platform], "_blank", "width=600,height=400");
  }
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Calculate mortgage payment
export const calculateMortgage = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return Math.round(monthlyPayment);
};

// Filter properties based on criteria
export const filterProperties = (properties, filters) => {
  return properties.filter((property) => {
    // Location filter
    if (
      filters.location &&
      filters.location !== "all" &&
      !property.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    // Type filter
    if (
      filters.type &&
      filters.type !== "all" &&
      property.type.toLowerCase() !== filters.type.toLowerCase()
    ) {
      return false;
    }

    // Price range filter
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== "all") {
      if (filters.bedrooms === "5+" && property.beds < 5) {
        return false;
      } else if (
        filters.bedrooms !== "5+" &&
        property.beds !== parseInt(filters.bedrooms)
      ) {
        return false;
      }
    }

    // Status filter
    if (
      filters.status &&
      filters.status !== "all" &&
      property.status.toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }

    return true;
  });
};

// Sort properties
export const sortProperties = (properties, sortBy) => {
  const sorted = [...properties];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => b.yearBuilt - a.yearBuilt);
    case "popular":
      return sorted.sort((a, b) => b.featured - a.featured);
    default:
      return sorted;
  }
};

// Get unique values from array of objects
export const getUniqueValues = (array, key) => {
  return [...new Set(array.map((item) => item[key]))];
};

// Animation variants for Framer Motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
