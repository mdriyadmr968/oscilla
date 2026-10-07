"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Package,
  Layers,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Search,
} from "lucide-react";
import { WATCHES_DATA } from "@/lib/data/watches";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { OrderRecord, WatchProduct } from "@/lib/types";

export function AdminClient() {
  const [activeTab, setActiveTab] = useState<"inventory" | "orders">("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const orders = useCartStore((state) => state.orders);
  const updateOrderFulfillment = useCartStore((state) => state.updateOrderFulfillment);

  // Local inventory stock tracking state for demonstration
  const [stockOverrides, setStockOverrides] = useState<Record<string, number>>({});

  const getWatchStock = (w: WatchProduct) => {
    return stockOverrides[w.id] !== undefined ? stockOverrides[w.id] : w.stockCount;
  };

  const adjustStock = (watchId: string, delta: number) => {
    const watch = WATCHES_DATA.find((w) => w.id === watchId);
    if (!watch) return;
    const current = getWatchStock(watch);
    const updated = Math.max(0, current + delta);
    setStockOverrides((prev) => ({ ...prev, [watchId]: updated }));
  };

  // KPIs
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalPiecesInStock = WATCHES_DATA.reduce((acc, w) => acc + getWatchStock(w), 0);
  const lowStockCount = WATCHES_DATA.filter((w) => getWatchStock(w) < 4).length;

  const filteredWatches = WATCHES_DATA.filter(
    (w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.collection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="border-b border-[#1c1f2b] pb-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400">
              Atelier Management Console
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Inventory &amp; Armored Fulfillment Hub
          </h1>
        </div>

        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#171924] hover:bg-[#202332] text-xs text-neutral-300 font-mono border border-[#272b3c] transition-colors"
        >
          <span>Open Public Storefront</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="p-5 rounded-2xl bg-[#10121b] border border-[#202433]">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Settlement</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {formatCurrency(totalRevenue || 12850)}
          </div>
          <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
            {orders.length} orders recorded in ledger
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#10121b] border border-[#202433]">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Calibers</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {WATCHES_DATA.length} Models
          </div>
          <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
            Across 5 exclusive collections
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#10121b] border border-[#202433]">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Vault Units</span>
            <Package className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {totalPiecesInStock} Pieces
          </div>
          <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
            Physical Geneva vault balance
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#10121b] border border-[#202433]">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Allocation Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-300">
            {lowStockCount} Low / Sold Out
          </div>
          <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
            Requires atelier manufacturing batch
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#1f2231] pb-4">
        <button
          onClick={() => setActiveTab("inventory")}
          className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === "inventory"
              ? "bg-amber-500 text-black shadow-md font-bold"
              : "bg-[#141622] text-neutral-400 hover:text-white"
          }`}
        >
          Timepiece Stock &amp; References ({WATCHES_DATA.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === "orders"
              ? "bg-amber-500 text-black shadow-md font-bold"
              : "bg-[#141622] text-neutral-400 hover:text-white"
          }`}
        >
          Armored Fulfillment Orders ({orders.length})
        </button>
      </div>

      {/* Tab 1: Inventory Management */}
      {activeTab === "inventory" && (
        <div className="bg-[#10121b] border border-[#202432] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-[#1c1f2b] flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by name, reference or series..."
                className="w-full bg-[#161824] border border-[#232737] rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Live Stock Controller
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0c12] text-neutral-400 uppercase font-mono text-[10px] tracking-wider border-b border-[#1a1d29]">
                <tr>
                  <th className="py-3 px-4">Timepiece</th>
                  <th className="py-3 px-4">Caliber</th>
                  <th className="py-3 px-4">Material</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock Level</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171926]">
                {filteredWatches.map((watch) => {
                  const stock = getWatchStock(watch);
                  return (
                    <tr key={watch.id} className="hover:bg-[#141622] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 bg-black rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={watch.images.hero} alt={watch.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-amber-400 block">
                              {watch.referenceNumber}
                            </span>
                            <span className="font-semibold text-white truncate block max-w-xs">
                              {watch.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-neutral-300">
                        {watch.specs.movement.caliber}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-400">
                        {watch.specs.caseAndDial.material}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {formatCurrency(watch.price)}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`font-mono font-bold ${stock < 3 ? "text-rose-400" : "text-neutral-200"}`}>
                          {stock} units
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {stock === 0 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Exhausted
                          </span>
                        ) : stock < 4 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            Low Reserve
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Allocated
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1 bg-[#1a1c27] rounded border border-[#272b3a] p-0.5">
                          <button
                            onClick={() => adjustStock(watch.id, -1)}
                            className="px-2 py-0.5 text-neutral-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-1 font-mono text-[11px] text-neutral-300">{stock}</span>
                          <button
                            onClick={() => adjustStock(watch.id, 1)}
                            className="px-2 py-0.5 text-neutral-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Fulfillment */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#10121b] border border-[#202432] rounded-2xl p-12 text-center max-w-lg mx-auto">
              <Package className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
              <h3 className="text-base font-serif font-bold text-white mb-1">
                No Customer Orders Yet
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Place a test order via the store to see live order tracking and fulfillment state modifications.
              </p>
              <Link
                href="/catalog"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-semibold uppercase tracking-wider"
              >
                Place Test Order
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-2xl bg-[#10121b] border border-[#202432] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1c1f2b] pb-3 gap-2">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-mono block">Order ID</span>
                    <span className="text-base font-bold font-mono text-white">{order.id}</span>
                    <span className="text-xs text-neutral-400 ml-2">by {order.customer.fullName} ({order.customer.email})</span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">Stage:</span>
                    <select
                      value={order.fulfillmentStatus}
                      onChange={(e) =>
                        updateOrderFulfillment(
                          order.id,
                          e.target.value as OrderRecord["fulfillmentStatus"]
                        )
                      }
                      className="bg-[#191b26] border border-[#262a3a] text-xs text-white rounded-lg p-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="preparing">Preparing Quality Check</option>
                      <option value="dispatched">Armored Transit (Dispatched)</option>
                      <option value="delivered">Delivered (Biometric Signature)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block">Transit Address:</span>
                    <div className="text-neutral-300">
                      {order.customer.streetAddress}, {order.customer.city}, {order.customer.postalCode}, {order.customer.country}
                    </div>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Assigned Logistics:</span>
                    <div className="text-white font-mono">
                      {order.courierName} • {order.trackingNumber}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#1c1f2b] pt-3 flex justify-between items-center text-xs">
                  <span className="text-neutral-400">{order.items.length} Timepiece Items</span>
                  <span className="text-base font-bold font-mono text-amber-300">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
