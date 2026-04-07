import React, { useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes } from "react-router-dom";

const vendors = [
  { name: "Sharma Chaat Corner", category: "Food", rating: 4.8, distance: 1.4, location: "Rajajinagar, Bengaluru", tag: "Best seller", blurb: "Pani puri, dahi papdi, and quick snack combos loved by evening crowds." },
  { name: "Ramesh Vegetables", category: "Vegetables", rating: 4.5, distance: 0.9, location: "Malleshwaram, Bengaluru", tag: "Fresh today", blurb: "Daily fruits, greens, and seasonal vegetables sourced from nearby markets." },
  { name: "Ayesha Boutique Cart", category: "Clothes", rating: 4.2, distance: 2.6, location: "Indiranagar, Bengaluru", tag: "Trending", blurb: "Affordable kurtis, scarves, and colorful local fashion selections." },
  { name: "Kiran Repair Hub", category: "Services", rating: 4.7, distance: 3.1, location: "Basavanagudi, Bengaluru", tag: "Trusted", blurb: "Reliable device repair and neighborhood support for everyday tech issues." },
  { name: "Gupta Fruit Stall", category: "Vegetables", rating: 3.9, distance: 4.8, location: "Jayanagar, Bengaluru", tag: "Budget picks", blurb: "Fruit bowls, fresh apples, bananas, and healthy impulse buys." },
  { name: "Sita Tiffin Point", category: "Food", rating: 4.6, distance: 2.2, location: "Yeshwanthpur, Bengaluru", tag: "Morning rush", blurb: "Idli, dosa, filter coffee, and breakfast favorites for office commuters." }
];

const categories = [
  { name: "Food", icon: "F" },
  { name: "Clothes", icon: "C" },
  { name: "Vegetables", icon: "V" },
  { name: "Services", icon: "S" }
];

const suggestions = ["pani puri near me", "fresh fruits", "budget kurtis", "repair services"];
const products = [
  { name: "Pani Puri Plate", price: 40, tag: "Top rated" },
  { name: "Dahi Papdi", price: 55, tag: "Crowd favorite" },
  { name: "Sev Puri", price: 50, tag: "Fast moving" },
  { name: "Masala Soda", price: 35, tag: "Refreshing" }
];
const featuredReviews = [
  { author: "Priya N.", rating: 5, text: "Clean setup, fast service, and the pani puri tasted amazing." },
  { author: "Arjun K.", rating: 4, text: "Loved the QR verification. It made the vendor feel trustworthy instantly." },
  { author: "Megha S.", rating: 5, text: "Quick UPI payment and fair prices. Very smooth overall experience." }
];
const editableProducts = [
  { name: "Pani Puri Plate", price: 40, status: "Active" },
  { name: "Dahi Papdi", price: 55, status: "Active" },
  { name: "Masala Soda", price: 35, status: "Low stock" }
];
const orders = [
  { id: "#LS1024", item: "2x Pani Puri", amount: "Rs. 80", status: "Completed" },
  { id: "#LS1025", item: "1x Dahi Papdi", amount: "Rs. 55", status: "Preparing" },
  { id: "#LS1026", item: "1x Masala Soda", amount: "Rs. 35", status: "Completed" }
];
const visitsSeries = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 54 },
  { label: "Wed", value: 48 },
  { label: "Thu", value: 70 },
  { label: "Fri", value: 81 },
  { label: "Sat", value: 88 },
  { label: "Sun", value: 76 }
];
const salesSeries = [35, 48, 42, 63, 58, 72, 86];
const topSellingItems = [
  { name: "Pani Puri", units: 132, width: 90 },
  { name: "Dahi Papdi", units: 94, width: 68 },
  { name: "Masala Soda", units: 71, width: 54 }
];
const earningsBars = [38, 56, 48, 66, 72, 60, 84];

function App() {
  const [search, setSearch] = useState("");
  const [distance, setDistance] = useState(5);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("All");
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [scanComplete, setScanComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [communityReviews, setCommunityReviews] = useState([
    { author: "Rahul", rating: 5, comment: "Very hygienic and friendly service." },
    { author: "Nisha", rating: 4, comment: "Good taste and easy to locate on the map." },
    { author: "Dev", rating: 5, comment: "Payment was instant and the QR system felt premium." }
  ]);

  const filteredVendors = useMemo(() => vendors.filter((vendor) => {
    const searchMatch = search.trim() === "" || `${vendor.name} ${vendor.category} ${vendor.blurb}`.toLowerCase().includes(search.toLowerCase());
    const distanceMatch = vendor.distance <= distance;
    const ratingMatch = vendor.rating >= rating;
    const categoryMatch = category === "All" || vendor.category === category;
    return searchMatch && distanceMatch && ratingMatch && categoryMatch;
  }), [search, distance, rating, category]);

  const salesChart = useMemo(() => {
    const width = 560;
    const height = 220;
    const step = width / (salesSeries.length - 1);
    const points = salesSeries.map((value, index) => {
      const x = index * step;
      const y = height - (value / 100) * (height - 20) - 10;
      return `${x},${y}`;
    }).join(" ");
    return { width, height, points };
  }, []);

  const handleSubmitReview = () => {
    if (!selectedStars || !reviewText.trim()) return;
    setCommunityReviews((current) => [{ author: "You", rating: selectedStars, comment: reviewText.trim() }, ...current]);
    setReviewText("");
    setSelectedStars(0);
  };

  const sharedProps = {
    search, setSearch, distance, setDistance, rating, setRating, category, setCategory,
    filteredVendors, selectedStars, setSelectedStars, reviewText, setReviewText,
    communityReviews, handleSubmitReview, scanComplete, setScanComplete, paymentComplete, setPaymentComplete,
    salesChart
  };

  return (
    <BrowserRouter>
      <div className="page-shell">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<LandingPage {...sharedProps} />} />
            <Route path="/dashboard" element={<DashboardPage {...sharedProps} />} />
            <Route path="/vendor-profile" element={<VendorProfilePage />} />
            <Route path="/scan" element={<ScanPage {...sharedProps} />} />
            <Route path="/payment" element={<PaymentPage {...sharedProps} />} />
            <Route path="/reviews" element={<ReviewsPage {...sharedProps} />} />
            <Route path="/vendor-dashboard" element={<VendorDashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage salesChart={salesChart} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <span className="bridge bridge-left" />
          <span className="bridge bridge-right" />
        </span>
        <span>
          <strong>LocalSetu</strong>
          <small>Connecting Local Vendors Digitally</small>
        </span>
      </Link>
      <nav className="topnav">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/dashboard">Explore</NavItem>
        <NavItem to="/vendor-profile">Vendor Profile</NavItem>
        <NavItem to="/scan">QR Scan</NavItem>
        <NavItem to="/payment">Payment</NavItem>
        <NavItem to="/reviews">Reviews</NavItem>
        <NavItem to="/vendor-dashboard">Vendor Tools</NavItem>
        <NavItem to="/analytics">Analytics</NavItem>
      </nav>
      <div className="topbar-actions">
        <Link className="button button-secondary button-link" to="/dashboard">View Demo</Link>
        <Link className="button button-primary button-link" to="/vendor-dashboard">Register Vendor</Link>
      </div>
    </header>
  );
}

function NavItem({ to, children }) {
  return <NavLink className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to={to}>{children}</NavLink>;
}

function LandingPage({ search, setSearch }) {
  return (
    <section className="hero">
      <div className="hero-copy glass-card">
        <div className="eyebrow">Street Vendor Digital Identity Platform</div>
        <h1>Build trust between neighborhoods and vendors with one digital bridge.</h1>
        <p>LocalSetu helps users discover nearby street vendors, verify identity through QR, pay instantly, and leave reviews that help local businesses grow.</p>
        <div className="search-panel">
          <div className="search-icon" />
          <input type="text" placeholder="Search vendors or products" value={search} onChange={(event) => setSearch(event.target.value)} />
          <Link className="button button-primary button-link" to="/dashboard">Explore Vendors</Link>
        </div>
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => setSearch(suggestion)}>{suggestion}</button>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="button button-primary button-link" to="/dashboard">Explore Vendors</Link>
          <Link className="button button-secondary button-link" to="/vendor-dashboard">Register as Vendor</Link>
        </div>
        <div className="category-grid">
          {categories.map((item) => (
            <article className="category-card" key={item.name}>
              <div className="category-icon">{item.icon}</div>
              <strong>{item.name}</strong>
              <p>Discover trusted {item.name.toLowerCase()} vendors nearby.</p>
            </article>
          ))}
        </div>
      </div>
      <div className="hero-preview glass-card">
        <div className="hero-preview-top">
          <span className="section-chip">Nearby vendors</span>
          <span className="live-dot">Live</span>
        </div>
        <div className="vendor-preview-list">
          {vendors.slice(0, 3).map((vendor) => (
            <article className="preview-card" key={vendor.name}>
              <div className="badge-row">
                <span className="badge">{vendor.category}</span>
                <span className="badge">{vendor.tag}</span>
              </div>
              <strong>{vendor.name}</strong>
              <p>{vendor.blurb}</p>
              <div className="preview-meta">
                <span>{vendor.rating} stars</span>
                <span>{vendor.distance} km</span>
                <span>{vendor.location}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPage({ distance, setDistance, rating, setRating, category, setCategory, filteredVendors }) {
  return (
    <PageSection eyebrow="User Dashboard" title="Discover trusted vendors around you" body="Location-first listing with clear filters, ratings, and fast access to profiles.">
      <div className="dashboard-layout">
        <aside className="filter-panel glass-card">
          <h3>Filters</h3>
          <label>
            Distance
            <input type="range" min="1" max="10" value={distance} onChange={(event) => setDistance(Number(event.target.value))} />
            <span>Within {distance} km</span>
          </label>
          <label>
            Minimum Rating
            <select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
              <option value="0">All ratings</option>
              <option value="3.5">3.5+</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
            </select>
          </label>
          <label>
            Category
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="All">All categories</option>
              {categories.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
            </select>
          </label>
          <div className="map-card">
            <div className="map-grid" />
            <div className="map-pin pin-a" />
            <div className="map-pin pin-b" />
            <div className="map-pin pin-c" />
            <span>Rajajinagar, Bengaluru</span>
          </div>
        </aside>
        <div className="dashboard-content">
          <div className="vendor-list-header">
            <div>
              <h3>Recommended for you</h3>
              <p>Curated using distance, popularity, and recent scans.</p>
            </div>
          </div>
          <div className="vendor-grid">
            {filteredVendors.map((vendor) => (
              <article className="vendor-card" key={vendor.name}>
                <div className="badge-row">
                  <span className="badge">{vendor.category}</span>
                  <span className="badge">{vendor.distance} km away</span>
                </div>
                <strong>{vendor.name}</strong>
                <p>{vendor.blurb}</p>
                <div className="vendor-card-meta">
                  <span>{vendor.rating} stars</span>
                  <span>{vendor.location}</span>
                </div>
                <Link className="button button-secondary button-link full-width" to="/vendor-profile">View Profile</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function VendorProfilePage() {
  return (
    <PageSection eyebrow="Vendor Profile" title="Verified digital storefront with QR identity" body="Highlighting identity, products, trust signals, and direct actions in one place.">
      <div className="vendor-profile-card glass-card">
        <div className="vendor-banner">
          <div className="vendor-banner-copy">
            <span className="section-chip">Verified Street Food Vendor</span>
            <h3>Sharma Chaat Corner</h3>
            <p>Beloved evening snack spot known for pani puri, dahi papdi, and fast digital payments.</p>
            <div className="meta-row">
              <span>4.8 rating</span>
              <span>1.4 km away</span>
              <span>Open until 10:30 PM</span>
            </div>
          </div>
          <div className="qr-panel">
            <div className="qr-code" aria-label="Vendor QR code" />
            <strong>Scan to verify vendor</strong>
            <small>Vendor ID: LS-BLR-2291</small>
          </div>
        </div>
        <div className="profile-content">
          <div className="product-panel">
            <div className="panel-header">
              <h4>Popular products</h4>
              <span className="section-chip">Updated today</span>
            </div>
            <div className="product-list">
              {products.map((product) => (
                <article className="product-item" key={product.name}>
                  <div>
                    <strong>{product.name}</strong>
                    <span className="pill">{product.tag}</span>
                  </div>
                  <strong>Rs. {product.price}</strong>
                </article>
              ))}
            </div>
          </div>
          <div className="action-panel">
            <button className="button button-primary">Call Vendor</button>
            <button className="button button-secondary">Get Directions</button>
            <Link className="button button-secondary button-link" to="/payment">Pay via UPI</Link>
            <div className="trust-box">
              <strong>Why users trust this vendor</strong>
              <p>Verified by QR scan, repeat customer reviews, and consistent product pricing.</p>
            </div>
          </div>
        </div>
        <div className="reviews-panel">
          <div className="panel-header">
            <h4>Ratings &amp; reviews</h4>
            <span className="section-chip">132 reviews</span>
          </div>
          <div className="review-grid">
            {featuredReviews.map((review) => (
              <article className="review-card" key={review.author}>
                <strong>{review.author}</strong>
                <div className="vendor-card-meta"><span>{renderStars(review.rating)}</span></div>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function ScanPage({ scanComplete, setScanComplete }) {
  return (
    <PageSection eyebrow="QR Scan Screen" title="Camera-first scan experience" body="A focused scan flow that routes users into a verified vendor profile.">
      <div className="single-mobile-wrap">
        <div className="mobile-mock glass-card">
          <div className="scanner-frame">
            <div className="scanner-overlay" />
            <div className="scan-line" />
            <div className="scanner-corners corner-tl" />
            <div className="scanner-corners corner-tr" />
            <div className="scanner-corners corner-bl" />
            <div className="scanner-corners corner-br" />
            <div className="scan-status">Scanning verified LocalSetu QR...</div>
          </div>
          <button className="button button-primary full-width" onClick={() => setScanComplete(true)}>Complete Scan</button>
          <p className="mock-note">{scanComplete ? "Scan complete. Vendor verified and ready to view." : "After scan, users are redirected to the verified vendor profile."}</p>
          <Link className="button button-secondary button-link full-width" to="/vendor-profile">Go to Vendor Profile</Link>
        </div>
      </div>
    </PageSection>
  );
}

function PaymentPage({ paymentComplete, setPaymentComplete }) {
  return (
    <PageSection eyebrow="Payment Screen" title="Fast UPI payment with instant confirmation" body="Secure, simple payment UI designed for quick street-side transactions.">
      <div className="single-mobile-wrap">
        <div className="mobile-mock glass-card">
          <div className="payment-card">
            <div className="upi-qr" />
            <div className="payment-meta">
              <strong>Pay Rs. 180 via UPI</strong>
              <small>sharmachaat@oksbi</small>
            </div>
            <button className="button button-primary full-width" onClick={() => setPaymentComplete(true)}>Simulate Payment</button>
          </div>
          <div className={`success-state ${paymentComplete ? "active" : ""}`}>
            <div className="success-tick" />
            <strong>Payment Successful</strong>
            <p>Your payment has been securely sent to Sharma Chaat Corner.</p>
          </div>
          <Link className="button button-secondary button-link full-width" to="/reviews">Leave a Review</Link>
        </div>
      </div>
    </PageSection>
  );
}

function ReviewsPage({ selectedStars, setSelectedStars, reviewText, setReviewText, communityReviews, handleSubmitReview }) {
  return (
    <PageSection eyebrow="Review & Rating UI" title="Simple, trust-building feedback loop" body="The flow closes the loop after payment and helps vendors improve visibility.">
      <div className="review-layout">
        <div className="review-form glass-card">
          <h3>Rate your experience</h3>
          <div className="star-row">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              return <button key={value} type="button" className={`star ${value <= selectedStars ? "active" : ""}`} onClick={() => setSelectedStars(value)}>★</button>;
            })}
          </div>
          <textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} placeholder="Tell others about the taste, pricing, service, or hygiene..." />
          <button className="button button-primary" onClick={handleSubmitReview}>Submit Review</button>
        </div>
        <div className="review-feed glass-card">
          <div className="panel-header">
            <h4>Recent customer reviews</h4>
            <span className="section-chip">Community voice</span>
          </div>
          <div className="review-feed-list">
            {communityReviews.map((review, index) => (
              <article className="review-card" key={`${review.author}-${index}`}>
                <strong>{review.author}</strong>
                <div className="vendor-card-meta"><span>{renderStars(review.rating)}</span></div>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function VendorDashboardPage() {
  return (
    <PageSection eyebrow="Vendor Dashboard" title="Everything a vendor needs to manage digital presence" body="Products, orders, earnings, and popular items in one friendly control center.">
      <div className="vendor-dashboard-grid">
        <div className="glass-card inventory-panel">
          <div className="panel-header">
            <h4>Add / Edit products</h4>
            <button className="button button-secondary small-button">+ Add Product</button>
          </div>
          <div className="editable-products">
            {editableProducts.map((product) => (
              <article className="editable-product" key={product.name}>
                <div>
                  <strong>{product.name}</strong>
                  <p>Rs. {product.price}</p>
                </div>
                <div className="inline-actions">
                  <span className="pill">{product.status}</span>
                  <span className="pill">Edit</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="glass-card orders-panel">
          <div className="panel-header">
            <h4>Orders</h4>
            <span className="section-chip">Today</span>
          </div>
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-item" key={order.id}>
                <strong>{order.id}</strong>
                <div className="order-meta">
                  <span>{order.item}</span>
                  <span>{order.amount}</span>
                  <span className="pill">{order.status}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="glass-card earnings-panel">
          <div className="panel-header">
            <h4>Earnings summary</h4>
            <span className="section-chip">This week</span>
          </div>
          <div className="mini-chart">
            {earningsBars.map((value, index) => (
              <div className="bar" style={{ height: `${value}%` }} key={index}>
                <span>{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
              </div>
            ))}
          </div>
          <div className="metric-row">
            <div><strong>Rs. 12,480</strong><small>Total earnings</small></div>
            <div><strong>+18%</strong><small>vs last week</small></div>
          </div>
        </div>
        <div className="glass-card popular-panel">
          <div className="panel-header">
            <h4>Popular products</h4>
            <span className="section-chip">Top ranked</span>
          </div>
          <div className="popular-products">
            {topSellingItems.map((item) => (
              <article className="popular-item" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${item.width}%` }} /></div>
                </div>
                <strong>{item.units}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function AnalyticsPage({ salesChart }) {
  return (
    <PageSection eyebrow="Analytics Screen" title="Readable insights for growth and visibility" body="Simple charts make sales, visits, and top items easy to understand at a glance.">
      <div className="analytics-grid analytics-grid-wide">
        <div className="glass-card analytics-card">
          <div className="panel-header">
            <h4>Sales performance</h4>
            <span className="section-chip">Last 7 days</span>
          </div>
          <div className="line-chart">
            <svg viewBox={`0 0 ${salesChart.width} ${salesChart.height}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(46,134,222,0.25)" />
                  <stop offset="100%" stopColor="rgba(46,134,222,0.02)" />
                </linearGradient>
              </defs>
              <polyline fill="none" stroke="rgba(21,49,58,0.12)" strokeWidth="1" points={`0,180 ${salesChart.width},180`} />
              <polygon fill="url(#lineFill)" points={`${salesChart.points} ${salesChart.width},${salesChart.height} 0,${salesChart.height}`} />
              <polyline fill="none" stroke="#0d7b79" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={salesChart.points} />
              {salesSeries.map((value, index) => {
                const x = index * (salesChart.width / (salesSeries.length - 1));
                const y = salesChart.height - (value / 100) * (salesChart.height - 20) - 10;
                return <circle key={index} cx={x} cy={y} r="6" fill="#2e86de" />;
              })}
            </svg>
            <div className="axis-labels">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>
        <div className="glass-card analytics-card">
          <div className="panel-header">
            <h4>Customer visits</h4>
            <span className="section-chip">Footfall</span>
          </div>
          <div className="bar-chart">
            {visitsSeries.map((item) => (
              <div className="bar" style={{ height: `${item.value}%` }} key={item.label}>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card analytics-card">
          <div className="panel-header">
            <h4>Top-selling items</h4>
            <span className="section-chip">Best sellers</span>
          </div>
          <div className="top-items">
            {topSellingItems.map((item) => (
              <article className="top-item" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${item.width}%` }} /></div>
                </div>
                <strong>{item.units}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}

function PageSection({ eyebrow, title, body, children }) {
  return (
    <section className="screen-block">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <p>{body}</p>
      </div>
      {children}
    </section>
  );
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return `${"★".repeat(fullStars)}${hasHalf ? "½" : ""}`;
}

export default App;
