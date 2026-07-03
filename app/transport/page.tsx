import type { Metadata } from "next";
import TransportPage from "@/components/transport-page";
import "@/components/stoqr.css";

export const metadata: Metadata = {
  title: "Transport — Freight Quotation Agent | Stoqr",
  description:
    "The Freight Quotation Agent is a Stoqr module that reads a client's email, decomposes the shipment into its service legs, sources rates from your partners, and returns a ranked, margin-applied quote.",
};

export default function Page() {
  return <TransportPage />;
}
