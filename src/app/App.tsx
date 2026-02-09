import { HomeDepotOnboarding } from "@/app/components/HomeDepotOnboarding";
import { useState } from "react";
import { BrandKitEditor } from "@/app/components/BrandKitEditor";
import { BrandKitManager } from "@/app/components/BrandKitManager";
import { BrandKitConfig, DEFAULT_BRAND_KIT } from "@/app/types/brandKit";
import { Palette } from "lucide-react";

export default function App() {
  const [brandKit, setBrandKit] = useState<BrandKitConfig>(DEFAULT_BRAND_KIT);
  const [showBrandKit, setShowBrandKit] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 gap-6">
      <HomeDepotOnboarding 
        brandKit={brandKit}
      />
      
      {/* Spacer to push content down */}
      <div className="h-32" />
      
      {/* Brand Kit Button - Always visible outside phone */}
      <button
        onClick={() => setShowBrandKit(true)}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
      >
        <Palette className="w-6 h-6" />
        <span>Edit Brand Kit</span>
      </button>

      {/* Brand Kit Manager */}
      <BrandKitManager 
        currentConfig={brandKit}
        onLoad={setBrandKit}
      />

      <BrandKitEditor
        isOpen={showBrandKit}
        onClose={() => setShowBrandKit(false)}
        currentConfig={brandKit}
        onSave={setBrandKit}
      />
    </div>
  );
}