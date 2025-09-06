export const laptopDeals = [
    {
        id: "6",
        name: "MacBook Air M2 (8GB | 256GB)",
        image: "/static/cat1.jpg",
        currentPrice: 89999,
        originalPrice: 119900,
        discount: 25,
        savings: 29901,
    },
    {
        id: "7",
        name: "Dell XPS 13 (16GB | 512GB)",
        image: "/static/cat1.jpg",
        currentPrice: 79999,
        originalPrice: 109999,
        discount: 27,
        savings: 30000,
    },
    {
        id: "8",
        name: "HP Pavilion Gaming (8GB | 512GB)",
        image: "/static/cat1.jpg",
        currentPrice: 54999,
        originalPrice: 74999,
        discount: 27,
        savings: 20000,
    },
    {
        id: "9",
        name: "Lenovo ThinkPad E14 (8GB | 256GB)",
        image: "/static/cat1.jpg",
        currentPrice: 42999,
        originalPrice: 59999,
        discount: 28,
        savings: 17000,
    },
    {
        id: "10",
        name: "ASUS ROG Strix G15 (16GB | 1TB)",
        image: "/static/cat1.jpg",
        currentPrice: 89999,
        originalPrice: 124999,
        discount: 28,
        savings: 35000,
    },
]

export const headphoneDeals = [
    {
        id: "11",
        name: "Sony WH-1000XM4 Wireless",
        image: "/sony-wh-1000xm4.png",
        currentPrice: 19999,
        originalPrice: 29990,
        discount: 33,
        savings: 9991,
    },
    {
        id: "12",
        name: "Apple AirPods Pro (2nd Gen)",
        image: "/images/products/airpods-pro.png",
        currentPrice: 21999,
        originalPrice: 24900,
        discount: 12,
        savings: 2901,
    },
    {
        id: "13",
        name: "Bose QuietComfort 45",
        image: "/bose-quietcomfort-45-headphones.png",
        currentPrice: 22999,
        originalPrice: 32900,
        discount: 30,
        savings: 9901,
    },
    {
        id: "14",
        name: "JBL Tune 760NC Wireless",
        image: "/jbl-tune-760nc-wireless-headphones.png",
        currentPrice: 4999,
        originalPrice: 7999,
        discount: 38,
        savings: 3000,
    },
    {
        id: "15",
        name: "Sennheiser HD 450BT",
        image: "/sennheiser-hd-450bt-bluetooth-headphones.png",
        currentPrice: 8999,
        originalPrice: 14990,
        discount: 40,
        savings: 5991,
    },
]



export const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Books',
    'Automotive',
    'Health'
];

export const products = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        originalPrice: 399.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'Electronics',
        brand: 'AudioTech',
        rating: 4.8,
        reviewCount: 2847,
        description: 'Experience superior sound quality with our premium wireless headphones featuring noise cancellation.',
        features: ['Noise Cancellation', '30-hour Battery', 'Quick Charge', 'Premium Materials'],
        inStock: true,
        isNew: true,
        isFeatured: true,
        tags: ['wireless', 'premium', 'noise-cancelling']
    },
    {
        id: '2',
        name: 'Smart Fitness Watch',
        price: 249.99,
        image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'Electronics',
        brand: 'FitTech',
        rating: 4.6,
        reviewCount: 1923,
        description: 'Track your fitness goals with advanced health monitoring and smart notifications.',
        features: ['Heart Rate Monitor', 'GPS Tracking', '7-day Battery', 'Waterproof'],
        inStock: true,
        isFeatured: true,
        tags: ['fitness', 'smart', 'health']
    },
    {
        id: '3',
        name: 'Designer Cotton T-Shirt',
        price: 39.99,
        originalPrice: 59.99,
        image: 'https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'Clothing',
        brand: 'StyleCo',
        rating: 4.4,
        reviewCount: 567,
        description: 'Comfortable and stylish cotton t-shirt perfect for everyday wear.',
        features: ['100% Cotton', 'Pre-shrunk', 'Machine Washable', 'Various Colors'],
        inStock: true,
        tags: ['cotton', 'casual', 'comfortable']
    },
    {
        id: '4',
        name: 'Professional Camera Lens',
        price: 899.99,
        image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'Electronics',
        brand: 'LensMaster',
        rating: 4.9,
        reviewCount: 432,
        description: 'Professional-grade camera lens for stunning photography and videography.',
        features: ['Ultra-wide Angle', 'Image Stabilization', 'Weather Sealed', 'Multi-coating'],
        inStock: true,
        isNew: true,
        tags: ['photography', 'professional', 'lens']
    },



];


const MOCK_PRODUCTS = [
    {
        id: '1',
        currentPrice: 89999,
        originalPrice: 119900,
        discount: 25,
        name: 'Nexus Pro Wireless Charger',
        description: 'Premium 15W wireless charging pad with LED status indicator',
        price: 79.99,
        salePrice: 59.99,
        category: 'Charging',
        imageUrl: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500",
        rating: 4.8,
        reviewCount: 124,
        isNew: true,
        isInStock: true,
        tags: ['wireless', 'fast-charging', 'premium']
    },
    {
        id: '2',
        currentPrice: 89999,
        originalPrice: 119900,
        discount: 25,
        name: 'Elite Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with hot-swappable switches',
        price: 149.99,
        category: 'Keyboards',
        imageUrl: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500",
        rating: 4.9,
        reviewCount: 89,
        isNew: false,
        isInStock: true,
        tags: ['mechanical', 'rgb', 'gaming']
    },
    {
        id: '3',
        currentPrice: 89999,
        originalPrice: 119900,
        discount: 25,
        name: 'Precision Mouse Pad XL',
        description: 'Extended gaming mouse pad with stitched edges',
        price: 24.99,
        category: 'Accessories',
        imageUrl: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500",
        rating: 4.6,
        reviewCount: 203,
        isNew: false,
        isInStock: true,
        tags: ['gaming', 'extended', 'stitched']
    },
    {
        id: '4',
        currentPrice: 89999,
        originalPrice: 119900,
        discount: 25,
        name: 'Nexus Monitor Stand Pro',
        description: 'Adjustable monitor stand with built-in USB hub',
        price: 89.99,
        salePrice: 69.99,
        category: 'Desk Setup',
        imageUrl: "https://images.pexels.com/photos/586974/pexels-photo-586974.jpeg?auto=compress&cs=tinysrgb&w=500",
        rating: 4.7,
        reviewCount: 156,
        isNew: true,
        isInStock: false,
        tags: ['adjustable', 'usb-hub', 'ergonomic']
    },
    {
        id: '5',
        currentPrice: 89999,
        originalPrice: 119900,
        discount: 25,
        name: 'Cable Management Kit',
        description: 'Complete cable organization solution for clean desk setup',
        price: 19.99,
        category: 'Desk Setup',
        imageUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500",
        rating: 4.4,
        reviewCount: 78,
        isNew: false,
        isInStock: true,
        tags: ['organization', 'clean', 'magnetic']
    },
    {
        id: '6',
        currentPrice: 89999,
        originalPrice: 119900,
        discount: 25,
        name: 'Ambient LED Strip Kit',
        description: 'Smart LED strips with app control and music sync',
        price: 39.99,
        category: 'Lighting',
        imageUrl: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500",
        rating: 4.3,
        reviewCount: 92,

        isNew: false,
        isInStock: true,
        tags: ['smart', 'rgb', 'music-sync']
    }
];

// Simulate API call with delay
export async function getProducts() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PRODUCTS;
}

export const CATEGORIES = ['Charging', 'Keyboards', 'Accessories', 'Desk Setup', 'Lighting'];

export const PRICE_RANGES = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100+', min: 100, max: Infinity }
];