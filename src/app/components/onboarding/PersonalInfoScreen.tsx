import { BrandKitConfig } from '../../types/brandKit';

interface PersonalInfoScreenProps {
  onNext: () => void;
  onBack: () => void;
  birthday: string;
  zipcode: string;
  onUpdate: (data: { birthday?: string; zipcode?: string }) => void;
  brandKit: BrandKitConfig;
}

export function PersonalInfoScreen({
  onNext,
  onBack,
  birthday,
  zipcode,
  onUpdate,
  brandKit,
}: PersonalInfoScreenProps) {
  const canProceed = birthday !== "" && zipcode.length === 5;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <button
          onClick={onBack}
          className="text-gray-600 mb-6 active:text-gray-900"
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
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Tell Us About You
        </h2>
        <p className="text-gray-600 text-base">
          Help us personalize your experience
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-6">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full w-[28%] rounded-full transition-all duration-300" 
            style={{ backgroundColor: brandKit.primaryColor }}
          />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Birthday
            </label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => onUpdate({ birthday: e.target.value })}
              className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none text-base"
              style={{ 
                borderColor: birthday ? brandKit.primaryColor : undefined 
              }}
              onFocus={(e) => e.target.style.borderColor = brandKit.primaryColor}
              onBlur={(e) => e.target.style.borderColor = birthday ? brandKit.primaryColor : '#d1d5db'}
            />
            <p className="text-sm text-gray-500 mt-2">
              We'll send you special birthday offers!
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                onUpdate({ zipcode: value });
              }}
              placeholder="Enter your ZIP code"
              maxLength={5}
              className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none text-base"
              style={{ 
                borderColor: zipcode.length === 5 ? brandKit.primaryColor : undefined 
              }}
              onFocus={(e) => e.target.style.borderColor = brandKit.primaryColor}
              onBlur={(e) => e.target.style.borderColor = zipcode.length === 5 ? brandKit.primaryColor : '#d1d5db'}
            />
            <p className="text-sm text-gray-500 mt-2">
              We'll show you products available at your local location
            </p>
          </div>
        </div>

        <div 
          className="mt-6 p-4 rounded-xl flex gap-3"
          style={{ backgroundColor: `${brandKit.secondaryColor}15` }}
        >
          <div className="flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={brandKit.secondaryColor}
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <p className="text-sm text-gray-700">
            Your information is secure and will only be used to enhance your experience
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`w-full py-4 rounded-full font-semibold text-lg transition-all ${
            canProceed
              ? "text-white active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          style={canProceed ? { backgroundColor: brandKit.primaryColor } : {}}
        >
          Continue
        </button>
      </div>
    </div>
  );
}