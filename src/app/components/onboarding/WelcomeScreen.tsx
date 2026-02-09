import { BrandKitConfig } from '../../types/brandKit';

interface WelcomeScreenProps {
  onNext: () => void;
  onBack?: () => void;
  brandKit: BrandKitConfig;
}

export function WelcomeScreen({ onNext, onBack, brandKit }: WelcomeScreenProps) {
  return (
    <div 
      className="h-full flex flex-col text-white px-6 pb-8"
      style={{ 
        background: `linear-gradient(to bottom, ${brandKit.primaryColor}, ${brandKit.primaryColor}dd)` 
      }}
    >
      {/* Back Button - Hidden on first screen but structure present */}
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

      {/* Logo Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg p-3">
            <img 
              src={brandKit.logoUrl} 
              alt={brandKit.brandName}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-3">Welcome to</h1>
          <h2 className="text-4xl font-bold mb-6">{brandKit.brandName}</h2>
          <p className="text-xl opacity-90 mb-2">Let's Get Started</p>
          <p className="text-base opacity-75 max-w-[280px] mx-auto">
            We're here to help {brandKit.tagline} like you complete every project
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        <button
          onClick={onNext}
          className="w-full bg-white py-4 rounded-full font-semibold text-lg shadow-lg active:scale-95 transition-transform"
          style={{ color: brandKit.primaryColor }}
        >
          Get Started
        </button>
        <button className="w-full text-white py-4 rounded-full font-medium text-base underline">
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}