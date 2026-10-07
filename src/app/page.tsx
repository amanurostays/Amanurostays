"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoomsSection from "@/components/RoomsSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import FoodSection from "@/components/FoodSection";
import BranchesSection from "@/components/BranchesSection";
import TrustComparison from "@/components/TrustComparison";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";
import EnquiryModal from "@/components/EnquiryModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoomType, setModalRoomType] = useState<string | undefined>(undefined);
  const [modalBranch, setModalBranch] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (roomType?: string, branchName?: string) => {
    setModalRoomType(roomType);
    setModalBranch(branchName);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header with Fast Contact CTAs */}
      <Header onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Banner with Value Proposition & Direct Funnel */}
        <Hero onOpenEnquiry={handleOpenEnquiry} />

        {/* Room Types, Specs & Transparent Monthly Pricing */}
        <RoomsSection onOpenEnquiry={handleOpenEnquiry} />

        {/* High-Grade Facilities & Tech-First Amenities */}
        <AmenitiesSection />

        {/* 3x Daily Homestyle Food & In-House Kitchen Standards */}
        <FoodSection onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* Multi-Branch Expansion Architecture & Google Maps Locator */}
        <BranchesSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Authority & Trust Comparison: Zenith Living vs Traditional PG */}
        <TrustComparison />

        {/* Social Proof: Real Google Verified Resident Testimonials */}
        <TestimonialsSection />

        {/* AEO / GEO Answer Engine Optimized FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Comprehensive Footer with SEO Keywords & Partnership Desk */}
      <Footer />

      {/* Mobile Sticky Bottom Conversion Bar + Desktop WhatsApp Bubble */}
      <FloatingActionBar onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Instant Room Visit & Booking Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        defaultRoomType={modalRoomType}
        defaultBranch={modalBranch}
      />
    </div>
  );
}
