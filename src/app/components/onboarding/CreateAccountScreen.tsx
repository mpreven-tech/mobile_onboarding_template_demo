import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BrandKitConfig } from '../../types/brandKit';

interface CreateAccountScreenProps {
  onNext: () => void;
  onBack: () => void;
  firstName: string;
  username: string;
  password: string;
  onUpdate: (data: { firstName?: string; username?: string; password?: string }) => void;
  brandKit: BrandKitConfig;
}

export function CreateAccountScreen({
  onNext,
  onBack,
  firstName,
  username,
  password,
  onUpdate,
  brandKit,
}: CreateAccountScreenProps) {
  const [showPassword, setShowPassword] = useState(false);

  const canProceed = firstName.trim() !== "" && username.trim() !== "" && password.trim() !== "";

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
          Create Your Account
        </h2>
        <p className="text-gray-600 text-base">
          Join the {brandKit.tagline} community and start your next project
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-6">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full w-[14%] rounded-full transition-all duration-300" 
            style={{ backgroundColor: brandKit.primaryColor }}
          />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder="Enter your first name"
              className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none text-base"
              style={{ 
                borderColor: firstName ? brandKit.primaryColor : undefined,
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = brandKit.primaryColor}
              onBlur={(e) => e.target.style.borderColor = firstName ? brandKit.primaryColor : '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => onUpdate({ username: e.target.value })}
              placeholder="Choose a username"
              className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none text-base"
              style={{ 
                borderColor: username ? brandKit.primaryColor : undefined 
              }}
              onFocus={(e) => e.target.style.borderColor = brandKit.primaryColor}
              onBlur={(e) => e.target.style.borderColor = username ? brandKit.primaryColor : '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => onUpdate({ password: e.target.value })}
                placeholder="Create a password"
                className="w-full px-4 py-3.5 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none text-base"
                style={{ 
                  borderColor: password ? brandKit.primaryColor : undefined 
                }}
                onFocus={(e) => e.target.style.borderColor = brandKit.primaryColor}
                onBlur={(e) => e.target.style.borderColor = password ? brandKit.primaryColor : '#d1d5db'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 active:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {password.length > 0 && password.length < 6 && (
              <p className="text-sm text-red-500 mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>
        </div>

        <div 
          className="mt-6 p-4 rounded-xl"
          style={{ backgroundColor: `${brandKit.primaryColor}15` }}
        >
          <p className="text-sm text-gray-700">
            By creating an account, you agree to {brandKit.brandName}'s{" "}
            <span className="font-semibold" style={{ color: brandKit.primaryColor }}>Terms of Service</span> and{" "}
            <span className="font-semibold" style={{ color: brandKit.primaryColor }}>Privacy Policy</span>
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