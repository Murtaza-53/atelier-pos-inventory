import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ComponentType } from "react";
import {
  ArrowDownToLine, ArrowUpFromLine, Bell, Box, Boxes, Building2, CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, Cloud, Grid2X2,
  History, LayoutDashboard, Menu, MoreHorizontal, Package, PackageOpen, Plus,
  Search, Settings, Shirt, ShoppingBag, ShoppingCart, SlidersHorizontal,
  Tags, TriangleAlert, Truck, UserRound, Users, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import shirt from "@/assets/products/shirt.jpg";
import kurti from "@/assets/products/kurti.jpg";
import jeans from "@/assets/products/jeans.jpg";
import tshirt from "@/assets/products/tshirt.jpg";
import hoodie from "@/assets/products/hoodie.jpg";
import trackpant from "@/assets/products/trackpant.jpg";
import dupatta from "@/assets/products/dupatta.jpg";
import leggings from "@/assets/products/leggings.jpg";
import trouser from "@/assets/products/trouser.jpg";
import frock from "@/assets/products/frock.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Inventory — Atelier Retail" },
    { name: "description", content: "Track retail stock, variants, availability, and recent inventory movements." },
    { property: "og:title", content: "Inventory — Atelier Retail" },
    { property: "og:description", content: "Track retail stock, variants, availability, and recent inventory movements." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: InventoryPage,
});

type Status = "In Stock" | "Low Stock" | "Out of Stock";
type Product = { name:string; subtitle:string; sku:string; category:string; brand:string; variants:number; stock:number; reserved:number; status:Status; image:string };

const firstProduct: Product = { name:"Men's Casual Shirt",subtitle:"Smart Fit",sku:"SH-001",category:"Men",brand:"Allen Solly",variants:8,stock:65,reserved:3,status:"In Stock",image:shirt };
const products: Product[] = [
  firstProduct,
  { name:"Women's Kurti",subtitle:"A-Line",sku:"KR-110",category:"Women",brand:"Aurelia",variants:6,stock:12,reserved:2,status:"Low Stock",image:kurti },
  { name:"Denim Jeans",subtitle:"Slim Fit",sku:"JN-250",category:"Men",brand:"Levi's",variants:12,stock:0,reserved:0,status:"Out of Stock",image:jeans },
  { name:"Kids T-Shirt",subtitle:"Round Neck",sku:"KD-012",category:"Kids",brand:"H&M",variants:10,stock:34,reserved:4,status:"In Stock",image:tshirt },
  { name:"Hoodie",subtitle:"Winter Wear",sku:"HD-005",category:"Men",brand:"Puma",variants:6,stock:18,reserved:2,status:"In Stock",image:hoodie },
  { name:"Track Pant",subtitle:"Comfort Fit",sku:"TP-007",category:"Men",brand:"Nike",variants:8,stock:8,reserved:1,status:"Low Stock",image:trackpant },
  { name:"Dupatta",subtitle:"Chiffon",sku:"DP-009",category:"Women",brand:"Biba",variants:5,stock:2,reserved:0,status:"Low Stock",image:dupatta },
  { name:"Leggings",subtitle:"Stretch Fit",sku:"LG-019",category:"Women",brand:"Zudio",variants:6,stock:50,reserved:5,status:"In Stock",image:leggings },
  { name:"Formal Trouser",subtitle:"Classic Fit",sku:"TR-007",category:"Men",brand:"Van Heusen",variants:8,stock:0,reserved:0,status:"Out of Stock",image:trouser },
  { name:"Kids Frock",subtitle:"Party Wear",sku:"KD-021",category:"Kids",brand:"Max",variants:6,stock:22,reserved:3,status:"In Stock",image:frock },
];

const nav: [string, ComponentType<{className?:string}>][] = [
  ["Dashboard",LayoutDashboard],["POS Checkout",ShoppingBag],["Sales & Transactions",History],["Inventory",Package],
  ["Stock Transfer",Truck],["Products / Catalog",Boxes],["Customers (CRM)",Users],["Suppliers",UserRound],
  ["Offers & Loyalty",Tags],["Reports",Grid2X2],["Store & Settings",Settings],
];

function StatusPill({status}:{status:Status}) {
  const style = status === "In Stock" ? "bg-success-soft text-success" : status === "Low Stock" ? "bg-warning-soft text-warning" : "bg-danger-soft text-danger";
  return <span className={`inline-flex whitespace-nowrap rounded px-2 py-1 text-[11px] font-semibold ${style}`}>{status}</span>;
}

function Metric({icon:Icon,label,value,change,tone}:{icon:ComponentType<{className?:string}>;label:string;value:string;change:string;tone:string}) {
  return <div className="flex min-w-[178px] flex-1 items-center gap-3 rounded-lg border bg-card p-3 shadow-card">
    <div className={`grid size-11 shrink-0 place-items-center rounded-lg ${tone}`}><Icon className="size-5" /></div>
    <div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="text-xl font-bold text-foreground">{value}</p><p className={`text-[11px] font-semibold ${change.includes("12%") || change.includes("3%") ? "text-danger" : "text-success"}`}>↑ {change}</p></div>
  </div>;
}

function ProductThumb({product,large=false}:{product:Product;large?:boolean}) {
  return <div className={`${large ? "h-24 w-20" : "size-9"} shrink-0 overflow-hidden rounded-md bg-muted`}><img src={product.image} alt="" width={384} height={384} loading="lazy" className="h-full w-full object-cover" /></div>;
}

function InventoryPage() {
  const [sidebarOpen,setSidebarOpen] = useState(true);
  const [detailsOpen,setDetailsOpen] = useState(true);
  const [selected,setSelected] = useState<Product>(firstProduct);
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("all");
  const [brand,setBrand] = useState("all");
  const [status,setStatus] = useState("all");
  const [section,setSection] = useState("Stock Overview");
  const [detailTab,setDetailTab] = useState("Overview");
  const [view,setView] = useState<"table"|"grid">("table");
  const filtered = useMemo(() => products.filter(p => {
    const q=query.toLowerCase();
    return (!q || [p.name,p.subtitle,p.sku,p.category,p.brand].some(v=>v.toLowerCase().includes(q))) && (category==="all"||p.category===category) && (brand==="all"||p.brand===brand) && (status==="all"||p.status===status);
  }),[query,category,brand,status]);
  const reset=()=>{setQuery("");setCategory("all");setBrand("all");setStatus("all")};

  return <div className="flex min-h-screen bg-background text-foreground">
    <aside className={`${sidebarOpen ? "w-[230px]" : "w-[68px]"} fixed inset-y-0 left-0 z-30 hidden flex-col border-r bg-card transition-[width] lg:flex`}>
      <div className="flex h-[66px] items-center gap-3 border-b px-5"><div className="grid size-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><Shirt className="size-5" /></div>{sidebarOpen&&<div><p className="text-sm font-bold text-primary">ATELIER RETAIL</p><p className="text-[10px] text-muted-foreground">Garment POS • v2.4</p></div>}</div>
      {sidebarOpen&&<div className="m-4 rounded-lg border bg-surface-soft p-3"><div className="flex items-center justify-between"><span className="text-[9px] font-semibold uppercase text-muted-foreground">Active Outlet</span><span className="rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-semibold text-success">● Live</span></div><div className="mt-2 flex justify-between text-xs"><b>Indiranagar Store</b><span className="text-muted-foreground">#01</span></div></div>}
      <nav className="flex-1 space-y-1 px-3 py-1">{nav.map(([label,Icon])=><Button key={label} variant="ghost" className={`h-10 w-full justify-start px-3 text-xs ${label==="Inventory"?"bg-accent font-semibold text-primary":"text-nav hover:text-foreground"}`} title={!sidebarOpen?label:undefined}><Icon className="size-4" />{sidebarOpen&&<span>{label}</span>}</Button>)}</nav>
      {sidebarOpen&&<div className="mx-4 mb-4 rounded-lg bg-promo p-4"><p className="text-xs font-bold text-primary">Manage Smarter</p><p className="mt-1 text-[10px] leading-4 text-muted-foreground">Track stock, variants and reorder with ease.</p><Button size="sm" className="mt-3 h-8 text-[11px]"><Plus />Add Product</Button></div>}
      <div className="flex h-14 items-center gap-2 border-t px-5 text-[11px]"><Cloud className="size-4 text-primary" />{sidebarOpen&&<><span>Cloud Sync</span><span className="ml-auto text-right text-[9px] text-muted-foreground">Last sync<br/>2 min ago</span></>}</div>
    </aside>

    <div className={`${sidebarOpen ? "lg:ml-[230px]" : "lg:ml-[68px]"} min-w-0 flex-1 transition-[margin]`}>
      <header className="sticky top-0 z-20 flex h-[66px] items-center gap-2 border-b bg-card px-3 sm:px-5">
        <Button variant="ghost" size="icon" onClick={()=>setSidebarOpen(v=>!v)} aria-label="Toggle sidebar"><Menu /></Button>
        <Button variant="outline" className="hidden h-11 w-44 justify-start sm:flex"><Building2 className="text-primary"/><span className="text-left text-[11px] leading-4">Store #01<br/><b>Indiranagar</b></span><ChevronDown className="ml-auto"/></Button>
        <div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input value={query} onChange={e=>setQuery(e.target.value)} className="h-11 pl-9 pr-12 text-xs" placeholder="Search by SKU, product name, barcode..."/><kbd className="absolute right-3 top-3 rounded border bg-muted px-1 text-[10px] text-muted-foreground">⌘K</kbd></div>
        <div className="hidden items-center gap-2 xl:flex"><div className="rounded-md border px-3 py-1.5 text-[10px]"><span className="text-success">●</span> Store<br/><b>Online</b></div><div className="rounded-md border px-3 py-1.5 text-[10px]">Shift #02<br/><span className="text-muted-foreground">Live</span></div></div>
        <Button className="hidden h-10 sm:flex"><Plus/>New Sale (F2)</Button>
        <Button variant="ghost" size="icon" className="relative"><Bell/><span className="absolute right-1 top-1 size-2 rounded-full bg-danger"/></Button>
        <div className="hidden items-center gap-2 border-l pl-3 2xl:flex"><div className="grid size-9 place-items-center rounded-full bg-foreground text-primary-foreground"><UserRound className="size-5"/></div><div className="text-[10px] leading-4"><b>Ramesh Sharma</b><br/><span className="text-muted-foreground">Store Manager</span></div><ChevronDown className="size-4"/></div>
      </header>

      <main className="p-3 sm:p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4"><div className="min-w-0"><h1 className="text-2xl font-bold">Inventory</h1><p className="mt-1 text-sm text-muted-foreground">Track your stock, variants and keep your store always ready</p></div><div className="hidden shrink-0 gap-2 md:flex"><Button variant="outline"><ArrowUpFromLine/>Import</Button><Button variant="outline"><ArrowDownToLine/>Export</Button><Button><Plus/>Add Product</Button></div></div>
        <div className="mt-3 overflow-x-auto border-b"><div className="flex min-w-max">{["Stock Overview","Products","Variants","Categories","Brands","Stock Adjustments","Stock Take","Low Stock","Expiring / Aging"].map(t=><button key={t} onClick={()=>setSection(t)} className={`border-b-2 px-4 py-3 text-xs font-medium ${section===t?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`}>{t}</button>)}</div></div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1"><Metric icon={UserRound} label="Total Products" value="1,248" change="+12 this week" tone="bg-info-soft text-primary"/><Metric icon={Box} label="Total Stock (Units)" value="12,842" change="+5.6%" tone="bg-violet-soft text-violet"/><Metric icon={ShoppingCart} label="Stock Value" value="₹48,26,900" change="+3.2%" tone="bg-success-soft text-success"/><Metric icon={TriangleAlert} label="Low Stock Items" value="48" change="+12%" tone="bg-warning-soft text-warning"/><Metric icon={PackageOpen} label="Out of Stock" value="12" change="+3%" tone="bg-danger-soft text-danger"/></div>

        <div className="mt-4 grid gap-2 xl:grid-cols-[minmax(250px,1fr)_126px_110px_110px_auto_auto]">
          <div className="relative"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground"/><Input value={query} onChange={e=>setQuery(e.target.value)} className="pl-9 text-xs" placeholder="Search by product name, SKU, barcode..."/></div>
          <Filter value={category} setValue={setCategory} placeholder="All Categories" items={["Men","Women","Kids"]}/><Filter value={brand} setValue={setBrand} placeholder="All Brands" items={["Allen Solly","Aurelia","Levi's","H&M","Puma","Nike","Biba","Zudio","Van Heusen","Max"]}/><Filter value={status} setValue={setStatus} placeholder="All Status" items={["In Stock","Low Stock","Out of Stock"]}/>
          <Button variant="outline"><SlidersHorizontal/>More Filters</Button><Button variant="ghost" onClick={reset} className="text-primary">Reset</Button>
        </div>
        <div className="mt-2 flex justify-end"><div className="inline-flex rounded-md border bg-card p-1"><Button size="sm" variant={view==="table"?"default":"ghost"} onClick={()=>setView("table")}><Grid2X2/>Table</Button><Button size="sm" variant={view==="grid"?"default":"ghost"} onClick={()=>setView("grid")}><Boxes/>Grid</Button></div></div>

        <div className={`mt-2 grid min-w-0 gap-4 ${detailsOpen?"2xl:grid-cols-[minmax(0,1fr)_310px]":"grid-cols-1"}`}>
          {view === "table" ? <div className="min-w-0 overflow-hidden rounded-lg border bg-card shadow-card"><div className="overflow-x-auto"><table className="w-full min-w-[900px] border-collapse text-left text-[11px]"><thead className="bg-table-head text-[10px] text-muted-foreground"><tr>{["","Product","SKU","Category","Brand","Variants","Stock ↓","Reserved","Available","Status","Actions"].map((h,i)=><th key={`${h}-${i}`} className="border-b px-3 py-2 font-semibold">{i===0?<Checkbox/>:h}</th>)}</tr></thead><tbody>{filtered.map(p=><tr key={p.sku} onClick={()=>{setSelected(p);setDetailsOpen(true)}} className={`cursor-pointer border-b last:border-0 hover:bg-accent/50 ${selected.sku===p.sku&&detailsOpen?"bg-selected":""}`}><td className="px-3 py-1.5" onClick={e=>e.stopPropagation()}><Checkbox/></td><td className="px-3 py-1.5"><div className="flex items-center gap-2"><ProductThumb product={p}/><div><b>{p.name}</b><p className="text-[10px] text-muted-foreground">{p.subtitle}</p></div></div></td><td className="px-3 text-muted-foreground">{p.sku}</td><td className="px-3">{p.category}</td><td className="px-3">{p.brand}</td><td className="px-3 text-center">{p.variants}</td><td className="px-3 text-center font-semibold">{p.stock}</td><td className="px-3 text-center">{p.reserved}</td><td className="px-3 text-center">{p.stock-p.reserved}</td><td className="px-3"><StatusPill status={p.status}/></td><td className="px-3"><Button variant="ghost" size="icon"><MoreHorizontal/></Button></td></tr>)}</tbody></table></div>{filtered.length===0&&<div className="p-12 text-center text-sm text-muted-foreground">No products match your filters.</div>}<div className="flex min-w-[680px] items-center border-t px-3 py-2 text-[10px] text-muted-foreground"><span>Showing 1–{filtered.length} of 1,248 products</span><div className="ml-auto flex items-center gap-1"><Button variant="ghost" size="icon" className="size-7"><ChevronLeft/></Button>{[1,2,3,4,5].map(n=><Button key={n} size="icon" variant={n===1?"default":"ghost"} className="size-7">{n}</Button>)}<span>...</span><Button variant="ghost" size="icon" className="size-7">125</Button><Button variant="ghost" size="icon" className="size-7"><ChevronRight/></Button><Button variant="outline" size="sm" className="ml-2">10 / page <ChevronDown/></Button></div></div></div> : <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">{filtered.map(p=><button key={p.sku} onClick={()=>{setSelected(p);setDetailsOpen(true)}} className="rounded-lg border bg-card p-3 text-left shadow-card hover:border-primary"><img src={p.image} alt="" width={384} height={384} loading="lazy" className="h-32 w-full rounded-md object-cover"/><b className="mt-3 block text-sm">{p.name}</b><span className="text-xs text-muted-foreground">{p.sku} · {p.brand}</span><div className="mt-2 flex items-center justify-between"><span className="text-sm font-bold">{p.stock} units</span><StatusPill status={p.status}/></div></button>)}</div>}
          {detailsOpen&&<ProductDetails product={selected} tab={detailTab} setTab={setDetailTab} close={()=>setDetailsOpen(false)}/>} 
        </div>
        <Analytics/>
      </main>
    </div>
  </div>;
}

function Filter({value,setValue,placeholder,items}:{value:string;setValue:(v:string)=>void;placeholder:string;items:string[]}) { return <Select value={value} onValueChange={setValue}><SelectTrigger className="text-xs"><SelectValue placeholder={placeholder}/></SelectTrigger><SelectContent><SelectItem value="all">{placeholder}</SelectItem>{items.map(i=><SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select> }

function ProductDetails({product,tab,setTab,close}:{product:Product;tab:string;setTab:(t:string)=>void;close:()=>void}) {
  return <aside className="rounded-lg border bg-card p-4 shadow-card 2xl:sticky 2xl:top-[82px] 2xl:self-start"><div className="flex items-center justify-between"><h2 className="text-sm font-bold">Product Details</h2><Button variant="ghost" size="icon" className="size-7" onClick={close}><X/></Button></div><div className="mt-3 flex gap-3"><ProductThumb product={product} large/><div className="min-w-0 pt-1"><b className="text-sm">{product.name}</b><p><span className="rounded bg-success-soft px-1.5 py-0.5 text-[10px] font-semibold text-success">Active</span></p><p className="mt-1 text-sm font-semibold">₹799</p><p className="text-[10px] text-muted-foreground">SKU: {product.sku}</p></div></div><div className="mt-4 flex border-b">{["Overview","Variants","Stock History"].map(t=><button key={t} onClick={()=>setTab(t)} className={`flex-1 border-b-2 py-2 text-[10px] font-medium ${tab===t?"border-primary text-primary":"border-transparent text-muted-foreground"}`}>{t}</button>)}</div>{tab==="Overview"?<><div className="grid grid-cols-3 gap-x-2 gap-y-4 py-4 text-[10px]"><Spec k="Category" v={product.category}/><Spec k="Brand" v={product.brand}/><Spec k="HSN Code" v="62052000"/><Spec k="Sales Price" v="₹799"/><Spec k="Cost Price" v="₹520"/><Spec k="Tax (GST)" v="5%"/></div><div className="grid grid-cols-3 rounded-lg border bg-surface-soft p-3"><Spec k="Total Stock" v={String(product.stock)}/><Spec k="Reserved" v={String(product.reserved)}/><Spec k="Available" v={String(product.stock-product.reserved)}/></div><div className="divide-y text-[10px]"><Line k="Reorder Level" v="10"/><Line k="Location" v="RACK-A1"/><Line k="Last Updated" v="26 Aug 2024, 6:45 PM"/></div></>:<div className="grid h-44 place-items-center text-xs text-muted-foreground">{tab} information for {product.name}</div>}<div className="mt-4 grid grid-cols-2 gap-2"><Button variant="outline" className="text-xs">View Stock History</Button><Button className="text-xs">Adjust Stock</Button></div></aside>
}
function Spec({k,v}:{k:string;v:string}) { return <div><p className="text-muted-foreground">{k}</p><b className="mt-1 block">{v}</b></div> }
function Line({k,v}:{k:string;v:string}) { return <div className="flex justify-between py-3"><span className="text-muted-foreground">{k}</span><b>{v}</b></div> }

function Analytics(){ const cats=[["Men's Wear","4,852","38%","bg-chart-a"],["Women's Wear","3,921","31%","bg-chart-b"],["Kids Wear","1,980","15%","bg-chart-c"],["Accessories","1,245","10%","bg-chart-d"],["Footwear","844","6%","bg-chart-e"]]; return <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_0.95fr_1.45fr]"><section className="rounded-lg border bg-card p-3 shadow-card"><h3 className="text-xs font-bold">Stock by Category</h3><div className="mt-2 space-y-2">{cats.map(([n,v,p,c])=><div key={n} className="grid grid-cols-[95px_1fr_42px_35px] items-center gap-2 text-[9px]"><span className="truncate">● {n}</span><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full ${c}`} style={{width:p}}/></div><b className="text-right">{v}</b><span className="text-muted-foreground">({p})</span></div>)}</div></section><section className="rounded-lg border bg-card p-3 shadow-card"><h3 className="text-xs font-bold">Stock by Status</h3><div className="mt-2 flex items-center justify-around"><div className="relative grid size-24 place-items-center rounded-full bg-donut"><div className="grid size-16 place-items-center rounded-full bg-card text-center"><div><b className="text-sm">12,842</b><p className="text-[8px] text-muted-foreground">Total Units</p></div></div></div><div className="space-y-3 text-[9px]"><p><span className="text-success">●</span> In Stock <b className="ml-4">11,782</b></p><p><span className="text-warning">●</span> Low Stock <b className="ml-3">48</b></p><p><span className="text-danger">●</span> Out of Stock <b className="ml-2">12</b></p></div></div></section><section className="rounded-lg border bg-card p-3 shadow-card"><div className="flex justify-between"><h3 className="text-xs font-bold">Recent Stock Movements</h3><button className="text-[9px] font-semibold text-primary">View All</button></div><div className="mt-2 divide-y">{[["Stock In","PR-2024-0826","+120","26 Aug, 10:32 AM","From: Main Warehouse","text-success"],["Stock Out","POS-001298","-3","26 Aug, 09:21 AM","To: POS (Indiranagar)","text-danger"],["Adjustment","ADJ-00045","-2","25 Aug, 06:10 PM","Reason: Damaged Item","text-primary"],["Stock In","TR-2024-0825","+50","25 Aug, 11:45 AM","From: City Mall Store","text-success"]].map((r,i)=><div key={r[1]} className="grid grid-cols-[64px_76px_38px_88px_1fr] gap-2 py-2 text-[9px]"><span className={r[5]}>{i===1?"↓":i===2?"↻":"↑"} {r[0]}</span><span className="text-primary">{r[1]}</span><b className={r[5]}>{r[2]}</b><span className="text-muted-foreground">{r[3]}</span><span className="truncate text-muted-foreground">{r[4]}</span></div>)}</div></section></div> }