"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoomsSection from "@/components/RoomsSection";
import DormitorySection from "@/components/DormitorySection";
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

        {/* Room Types: Single/Double/Triple/Four Sharing (Budget & Premium) */}
        <RoomsSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Dedicated Dormitory Section - Launching Soon */}
        <DormitorySection onOpenEnquiry={handleOpenEnquiry} />

        {/* Essential Amenities (Wi-Fi, Washing machine, Water & Power, Housekeeping, Security) */}
        <AmenitiesSection />

        {/* 3x Daily Homestyle Food Arrangement (For those who want it) */}
        <FoodSection onOpenEnquiry={() => handleOpenEnquiry("Stay with 3x Food Arrangement")} />

        {/* Palayam Main Hub & Upcoming 4-5 Trivandrum Branches Expansion */}
        <BranchesSection onOpenEnquiry={handleOpenEnquiry} />

        {/* Trust Comparison: Amanora Stays vs Typical PG/Hostel */}
        <TrustComparison />

        {/* Social Proof: Real Resident Experiences in Trivandrum */}
        <TestimonialsSection />

        {/* AEO / GEO Answer Engine Optimized FAQ Accordion */}
        <FaqSection onOpenEnquiry={() => handleOpenEnquiry()} />
      </main>

      {/* Comprehensive Footer with amanorastays.in Branding & Expansion Desk */}
      <Footer />

      {/* Mobile Sticky Bottom Conversion Bar + Desktop Action Bubble */}
      <FloatingActionBar onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Instant Room Visit & Price Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        defaultRoomType={modalRoomType}
        defaultBranch={modalBranch}
      />
    </div>
  );
}
