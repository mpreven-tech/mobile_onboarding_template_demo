import { Drill, TreePine, Zap, Hammer, PaintBucket, Lightbulb } from "lucide-react";
import { BrandKitConfig, VERTICAL_PRESETS } from '../../types/brandKit';
import * as Icons from 'lucide-react';

interface SavingsScreenProps {
  onNext: () => void;
  onBack: () => void;
  selectedCategories: string[];
  onToggle: (category: string) => void;
  brandKit: BrandKitConfig;
}

export function SavingsScreen({
  onNext,
  onBack,
  selectedCategories,
  onToggle,
  brandKit,
}: SavingsScreenProps) {
  const canProceed = selectedCategories.length > 0;

  // Get the third question from the brand kit's vertical preset
  const verticalPreset = VERTICAL_PRESETS[brandKit.vertical];
  const question = verticalPreset?.onboardingQuestions[2] || {
    id: 'default',
    title: 'What interests you most?',
    subtitle: 'Select all that apply',
    icon: 'Star',
    selectionType: 'multi' as const,
    options: [
      { id: 'option-1', label: 'Option 1', icon: 'Circle' },
      { id: 'option-2', label: 'Option 2', icon: 'Circle' },
    ],
  };

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
        <div className="mb-2">
          <span className="text-sm font-semibold" style={{ color: brandKit.primaryColor }}>
            STEP 3 OF 3
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {question.title}
        </h2>
        <p className="text-gray-600 text-base">
          {question.subtitle}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-6">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full w-[71%] rounded-full transition-all duration-300" 
            style={{ backgroundColor: brandKit.primaryColor }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((category) => {
            const IconComponent = (Icons as any)[category.icon] || Icons.Circle;
            const isSelected = selectedCategories.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => onToggle(category.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? ""
                    : "border-gray-200 bg-white active:bg-gray-50"
                }`}
                style={isSelected ? {
                  borderColor: brandKit.primaryColor,
                  backgroundColor: `${brandKit.primaryColor}15`
                } : {}}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    !isSelected ? "bg-gray-100" : ""
                  }`}
                  style={isSelected ? { backgroundColor: brandKit.primaryColor } : {}}
                >
                  <IconComponent
                    className={`w-6 h-6 ${
                      isSelected ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <p
                  className={`text-sm font-semibold text-left ${
                    !isSelected ? "text-gray-900" : ""
                  }`}
                  style={isSelected ? { color: brandKit.primaryColor } : {}}
                >
                  {category.label}
                </p>
                {isSelected && (
                  <div 
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: brandKit.primaryColor }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          You can select multiple categories
        </p>
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
          Complete Setup
        </button>
      </div>
    </div>
  );
}