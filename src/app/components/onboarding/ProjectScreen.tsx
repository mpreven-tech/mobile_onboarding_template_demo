import { BrandKitConfig, VERTICAL_PRESETS } from '../../types/brandKit';
import * as Icons from 'lucide-react';

interface ProjectScreenProps {
  onNext: () => void;
  onBack: () => void;
  selectedProjects: string[];
  onToggle: (project: string) => void;
  brandKit: BrandKitConfig;
}

export function ProjectScreen({
  onNext,
  onBack,
  selectedProjects,
  onToggle,
  brandKit,
}: ProjectScreenProps) {
  const canProceed = selectedProjects.length > 0;

  // Get the second question from the brand kit's vertical preset
  const verticalPreset = VERTICAL_PRESETS[brandKit.vertical];
  const question = verticalPreset?.onboardingQuestions[1] || {
    id: 'default',
    title: 'What are you interested in?',
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
            STEP 2 OF 3
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
            className="h-full w-2/3 rounded-full transition-all duration-300" 
            style={{ backgroundColor: brandKit.primaryColor }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((project) => {
            const IconComponent = (Icons as any)[project.icon] || Icons.Circle;
            const isSelected = selectedProjects.includes(project.id);
            return (
              <button
                key={project.id}
                onClick={() => onToggle(project.id)}
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
                  {project.label}
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
          You can select multiple {question.selectionType === 'multi' ? 'options' : 'option'}
        </p>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`w-full py-4 rounded-full font-semibold text-lg transition-all ${
            !canProceed
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-white active:scale-95"
          }`}
          style={canProceed ? { backgroundColor: brandKit.primaryColor } : {}}
        >
          Continue
        </button>
      </div>
    </div>
  );
}