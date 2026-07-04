import type { Metadata } from "next";
import ContactPage from "@/components/contact-page";
import "@/components/stoqr.css";

export const metadata: Metadata = {
  title: "Contact & pilot — Stoqr",
  description:
    "Get in touch with Stoqr — our Singapore office, email, and phone — or request a pilot. Put one warehouse flow on autopilot for SMB warehouses, 3PLs, and maritime operators.",
};

export default function Page() {
  return <ContactPage />;
}
