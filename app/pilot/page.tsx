import type { Metadata } from "next";
import PilotPage from "@/components/pilot-page";
import "@/components/stoqr.css";

export const metadata: Metadata = {
  title: "Start a pilot — Stoqr",
  description:
    "Put one warehouse flow on autopilot. Tell us about your operation and we'll stand up a Stoqr pilot — receiving, dispatch, or billing — for SMB warehouses, 3PLs, and maritime operators.",
};

export default function Page() {
  return <PilotPage />;
}
