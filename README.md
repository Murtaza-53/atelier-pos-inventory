# Atelier POS Inventory

Build the exact Atelier Retail POS inventory dashboard shown in the attached screenshot (uploads/bc7fcab1-6276-4267-a375-f0110aa96bfb).

Implement the complete layout, styling, typography, colors, and components with high visual fidelity:

1. Layout & Theme:
- Clean modern retail POS theme in light blue and slate tones (`#F8FAFC` background, crisp white cards with subtle borders and shadows, brand blue `#1E40AF` / `#2563EB`).
- Collapsible/fixed left sidebar:
  - "ATELIER RETAIL", "Garment POS • v2.4" branding and logo.
  - Active Outlet badge: "Live • #01 Indiranagar Store".
  - Navigation items with icons: Dashboard, POS Checkout, Sales & Transactions, Inventory (active state), Stock Transfer, Products / Catalog, Customers (CRM), Suppliers, Offers & Loyalty, Reports, Store & Settings.
  - Sidebar bottom card: "Manage Smarter - Track stock, variants and reorder with ease" with "Add Product" button.
  - Cloud Sync status indicator: "Last sync 2 min ago".

2. Top Navigation Bar:
- Store switcher dropdown: "Store #01 Indiranagar".
- Global search bar with shortcut badge: "Search by SKU, product name, barcode... ⌘K".
- Status pills: "Store Online", "Shift #02 Live".
- "+ New Sale (F2)" primary button.
- Notification bell with badge (1) and user profile: "Ramesh Sharma - Store Manager" with avatar.

3. Page Header & Tabs:
- Page title: "Inventory" and subtitle: "Track your stock, variants and keep your store always ready".
- Top action buttons: "Import", "Export", and "+ Add Product".
- Horizontal sub-navigation tabs: Stock Overview (active), Products, Variants, Categories, Brands, Stock Adjustments, Stock Take, Low Stock, Expiring / Aging.

4. 5 KPI / Metric Cards:
- Total Products: 1,248 (+12 this week)
- Total Stock (Units): 12,842 (+5.6%)
- Stock Value: ₹48,26,900 (+3.2%)
- Low Stock Items: 48 (+12%)
- Out of Stock: 12 (+3%)

5. Filter & View Controls:
- Filter search input: "Search by product name, SKU, barcode...".
- Dropdowns: "All Categories", "All Brands", "All Status".
- "More Filters" and "Reset" buttons.
- View switchers: "Table" (active) and "Grid".

6. Inventory Data Table & Product Details Drawer:
- Responsive data table matching the columns: Checkbox, Product (thumbnail + name + subtitle/fit), SKU, Category, Brand, Variants, Stock, Reserved, Available, Status pill (In Stock [green], Low Stock [amber], Out of Stock [red]), Actions (...).
- Include all 10 sample items from the screenshot (Men's Casual Shirt, Women's Kurti, Denim Jeans, Kids T-Shirt, Hoodie, Track Pant, Dupatta, Leggings, Formal Trouser, Kids Frock).
- Pagination bar: "Showing 1–10 of 1,248 products", pagination controls `< 1 2 3 4 5 ... 125 >`, and `10 / page` selector.
- Right-side Product Details panel (collapsible / toggleable when clicking a row or the close button):
  - Product image preview, title "Men's Casual Shirt", status badge "Active", price "₹799", "SKU: SH-001".
  - Tabs: Overview, Variants, Stock History.
  - Key product specs: Category (Men), Brand (Allen Solly), HSN Code (62052000), Sales Price (₹799), Cost Price (₹520), Tax (GST 5%), Total Stock (65), Reserved (3), Available (62), Reorder Level (10), Location (RACK-A1), Last Updated (26 Aug 2024, 6:45 PM).
  - Action buttons: "View Stock History" and "Adjust Stock".

7. Bottom Analytics Widgets:
- Stock by Category: breakdown with progress bars for Men's Wear (38%), Women's Wear (31%), Kids Wear (15%), Accessories (10%), Footwear (6%).
- Stock by Status: donut chart showing 12,842 Total Units with In Stock (92%), Low Stock (0.4%), Out of Stock (0.1%).
- Recent Stock Movements: activity list with badges for Stock In (+120), Stock Out (-3), Adjustment (-2), Stock In (+50) with timestamps and destination/source details.

Ensure smooth interactions: row selection opens product details, tab navigation, search filtering, and responsive design.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eafe15d1-4656-414e-a220-0ab07b490b10).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
