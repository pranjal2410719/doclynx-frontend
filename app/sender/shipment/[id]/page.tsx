"use client";
import { ShipmentDetail } from "@/components/shared/ShipmentDetail";
import { SenderActions } from "@/components/sender/SenderActions";
import { use, useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Shipment } from "@/types";

export default function SenderShipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [shipment, setShipment] = useState<Shipment | null>(null);

  const fetchShipment = async () => {
    const s = await api<Shipment>(`/shipment/${id}`);
    setShipment(s);
  };

  useEffect(() => {
    fetchShipment();
  }, [id]);

  return (
    <div className="flex flex-col min-h-full bg-[#EAEBEB]">
      {/* Header */}
      <header className="px-6 lg:px-12 py-8 lg:py-10 border-b border-black relative overflow-hidden bg-white">
        <div className="flex justify-between text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 lg:mb-8 border-b border-black/5 pb-4">
          <span>Date Logged: {shipment?.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : "Pending"}</span>
          <span className="hidden sm:inline">Register: SHP-V1</span>
          <span>Terminal: {id.slice(0, 8).toUpperCase()}</span>
        </div>
        <h2 className="text-[2.5rem] lg:text-[4.5rem] font-light leading-[0.9] tracking-tighter uppercase">
          Shipment<br />Manifest<span className="text-[#D0554A]">_</span>
        </h2>
      </header>

      <div className="flex-grow p-6 lg:p-12">
        <ShipmentDetail shipmentId={id} role="SENDER" hideHeader={true}>
          {shipment && (
            <SenderActions
              shipmentId={id}
              status={shipment.status}
              paymentStatus={shipment.payment?.status}
              onRefresh={fetchShipment}
            />
          )}
        </ShipmentDetail>
      </div>
    </div>
  );
}
