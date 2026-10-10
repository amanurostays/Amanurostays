"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FloatingActionBar";
import EnquiryModal from "@/components/EnquiryModal";
import AmenitiesSection from "@/components/AmenitiesSection";
import FoodSection from "@/components/FoodSection";
import TrustComparison from "@/components/TrustComparison";

export default function FoodAmenitiesPageView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoomType, setModalRoomType] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (roomType?: string) => {
    setModalRoomType(roomType);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white animate-page-fade">
      <Header onOpenEnquiry={handleOpenEnquiry} />

      <main className="flex-1">
        {/* Breadcrumb Strip */}
        <div className="bg-[#061e17] text-stone-300 py-2.5 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 text-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-amber-300 font-bold">Food &amp; Amenities</span>
          </div>
        </div>

        {/* 3x Daily Food Arrangement */}
        <FoodSection onOpenEnquiry={() => handleOpenEnquiry("Stay with 3x Food Arrangement")} />

        {/* Comprehensive Amenities Grid */}
        <AmenitiesSection />

        {/* Living Standards Comparison */}
        <TrustComparison />
      </main>

      <Footer />
      <FloatingActionBar onOpenEnquiry={() => handleOpenEnquiry()} />
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultRoomType={modalRoomType}
      />
    </div>
  );
}
