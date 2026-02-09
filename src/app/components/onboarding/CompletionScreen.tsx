import { OnboardingData } from "../HomeDepotOnboarding";
import { Check } from "lucide-react";
import { BrandKitConfig } from '../../types/brandKit';

interface CompletionScreenProps {
  data: OnboardingData;
  onNext: () => void;
  onBack?: () => void;
  brandKit: BrandKitConfig;
}

export function CompletionScreen({ data, onNext, onBack, brandKit }: CompletionScreenProps) {
  return (
    <div 
      className="h-full flex flex-col text-white px-6 pb-8"
      style={{ 
        background: `linear-gradient(to bottom, ${brandKit.primaryColor}, ${brandKit.primaryColor}dd)` 
      }}
    >
      {/* Back Button */}
      {onBack && (
        <div className="pt-6 pb-2">
          <button
            onClick={onBack}
            className="text-white/80 hover:text-white active:text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* Success Icon */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-14 h-14" strokeWidth={3} style={{ color: brandKit.primaryColor }} />
          </div>
          <h1 className="text-3xl font-bold mb-3">You're All Set!</h1>
          <p className="text-lg opacity-90 mb-8 max-w-[280px] mx-auto">
            Your personalized {brandKit.brandName} experience is ready, {data.firstName}!
          </p>

          {/* Summary Cards */}
          <div className="space-y-3 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left">
              <p className="text-sm opacity-75 mb-1">Your Selection</p>
              <p className="font-semibold text-lg capitalize">
                {data.homeType?.replace("-", " ")}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left">
              <p className="text-sm opacity-75 mb-1">Your Interests</p>
              <p className="font-semibold text-lg">
                {data.projects.length} {data.projects.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-left">
              <p className="text-sm opacity-75 mb-1">Preferences</p>
              <p className="font-semibold text-lg">
                {data.savingsCategories.length} categories selected
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <p className="text-sm">
              🎉 <strong>Welcome Offer:</strong> Get 10% off your first purchase!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="space-y-3">
        <button
          onClick={onNext}
          className="w-full bg-white py-4 rounded-full font-semibold text-lg shadow-lg active:scale-95 transition-transform"
          style={{ color: brandKit.primaryColor }}
        >
          Get Started
        </button>
        <button className="w-full text-white py-3 rounded-full font-medium text-base underline">
          Customize Preferences Later
        </button>
      </div>
    </div>
  );
}