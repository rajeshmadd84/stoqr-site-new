import type { Metadata } from "next";
import StoqrLanding from "@/components/stoqr-landing";
import "@/components/stoqr.css";

export const metadata: Metadata = {
  title: "Stoqr — Agentic Warehousing & Transport Management",
  description:
    "Stoqr is an agentic platform for warehousing and transport. AI agents receive, store, pick, pack, dispatch, and bill across every zone — for SMB warehouses, 3PLs, and enterprises in Singapore, India, and the EU.",
};

export default function Page() {
  return <StoqrLanding />;
}
