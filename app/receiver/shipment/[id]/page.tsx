"use client";
import { ShipmentDetail } from "@/components/shared/ShipmentDetail";
import { ReceiverActions } from "@/components/receiver/ReceiverActions";
import { use, useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Shipment } from "@/types";

export default function ReceiverShipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [shipment, setShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    api<Shipment>(`/shipment/${id}`).then(setShipment).catch(() => {});
  }, [id]);

  return (
    <div className="flex flex-col min-h-full bg-[#EAEBEB]">
      {/* Header Area */}
      <div className="px-6 lg:px-12 py-8 lg:py-10 border-b border-black bg-white relative">
        <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
          <span className="bg-black text-white text-[8px] lg:text-[10px] font-black px-2 lg:px-3 py-1 uppercase tracking-widest leading-none">
            RECIPIENT_MANIFEST
          </span>
          <span className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            LOG_REF: {id.slice(0, 14).toUpperCase()}
          </span>
        </div>
        <h1 className="text-[2.5rem] lg:text-[4.5rem] font-light leading-[0.9] tracking-tighter text-black uppercase">
          Shipment<br />Manifest<span className="text-[#D0554A]">_</span>
        </h1>
      </div>

      <div className="flex-grow p-6 lg:p-12">
        <ShipmentDetail shipmentId={id} role="RECEIVER" hideHeader={true}>
          {shipment && <ReceiverActions shipmentId={id} confirmed={shipment.receiverConfirmed} />}
        </ShipmentDetail>
      </div>
    </div>
  );
}
