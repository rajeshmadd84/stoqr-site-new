import type { Metadata } from "next";
import WMSPage from "@/components/wms-page";
import "@/components/stoqr.css";

export const metadata: Metadata = {
  title: "Warehousing — Agentic WMS | Stoqr",
  description:
    "Stoqr is an agentic platform for warehousing and transport. AI agents receive, store, pick, pack, dispatch, and bill — across every zone, in every region, for SMB warehouses, 3PLs, and enterprises.",
};

export default function Page() {
  return <WMSPage />;
}
