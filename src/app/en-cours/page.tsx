import type { Metadata } from "next";
import EnCoursClient from "./EnCoursClient";

export const metadata: Metadata = {
  title: "Page en cours de création | AIA LAB",
  description:
    "Cette page est en cours de création. Notre équipe y travaille activement pour vous offrir une expérience d'exception.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComingSoonPage() {
  return <EnCoursClient />;
}
