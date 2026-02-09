import { useState, useEffect } from 'react';
import { X, Upload, Palette, Type, Tag, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { BrandKitConfig, VERTICAL_PRESETS } from '../types/brandKit';

interface BrandKitEditorProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: BrandKitConfig;
  onSave: (config: BrandKitConfig) => void;
}

export function BrandKitEditor({ isOpen, onClose, currentConfig, onSave }: BrandKitEditorProps) {
  const [config, setConfig] = useState<BrandKitConfig>(currentConfig);
  const [activeTab, setActiveTab] = useState<'basics' | 'vertical' | 'questions'>('basics');

  useEffect(() => {
    setConfig(currentConfig);
  }, [currentConfig]);

  if (!isOpen) return null;

  const handleVerticalChange = (verticalKey: string) => {
    const preset = VERTICAL_PRESETS[verticalKey];
    if (preset) {
      setConfig({
        ...config,
        vertical: verticalKey,
        primaryColor: preset.defaultPrimaryColor,
        secondaryColor: preset.defaultSecondaryColor,
        tagline: preset.defaultTagline,
      });
    }
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  // Group verticals by category
  const verticalsByCategory: Record<string, { key: string; name: string }[]> = {};
  Object.entries(VERTICAL_PRESETS).forEach(([key, preset]) => {
    if (!verticalsByCategory[preset.category]) {
      verticalsByCategory[preset.category] = [];
    }
    verticalsByCategory[preset.category].push({ key, name: preset.name });
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Brand Kit Editor</h2>
            <p className="text-sm text-gray-600 mt-1">Customize your mobile onboarding experience</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('basics')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'basics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Brand Basics
            </button>
            <button
              onClick={() => setActiveTab('vertical')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'vertical'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Industry Vertical
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'questions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Onboarding Questions
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Brand Basics Tab */}
          {activeTab === 'basics' && (
            <div className="space-y-6">
              {/* Brand Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Type className="w-4 h-4" />
                  Brand Name
                </label>
                <input
                  type="text"
                  value={config.brandName}
                  onChange={(e) => setConfig({ ...config, brandName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., The Home Depot"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., DO-ER"
                />
              </div>

              {/* Logo URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <ImageIcon className="w-4 h-4" />
                  Logo URL
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={config.logoUrl}
                    onChange={(e) => setConfig({ ...config, logoUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="https://example.com/logo.png"
                  />
                  {config.logoUrl && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={config.logoUrl}
                        alt="Logo preview"
                        className="w-16 h-16 object-contain rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="text-sm text-gray-600">Logo preview</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Palette className="w-4 h-4" />
                    Primary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                      placeholder="#f97316"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Palette className="w-4 h-4" />
                    Secondary Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="w-16 h-12 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.secondaryColor}
                      onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-3">Preview</p>
                <div className="bg-white rounded-lg p-6 space-y-3">
                  {config.logoUrl && (
                    <img
                      src={config.logoUrl}
                      alt="Brand logo"
                      className="w-20 h-20 object-contain mx-auto"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <h3 className="text-2xl font-bold text-center text-gray-900">{config.brandName || 'Your Brand'}</h3>
                  <p className="text-center text-gray-600">{config.tagline || 'Your Tagline'}</p>
                  <button
                    style={{ backgroundColor: config.primaryColor }}
                    className="w-full py-3 rounded-lg text-white font-semibold"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Industry Vertical Tab */}
          {activeTab === 'vertical' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Your Industry</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Choose the industry that best matches your business. This will pre-configure onboarding questions and imagery.
                </p>
              </div>

              {Object.entries(verticalsByCategory).map(([category, verticals]) => (
                <div key={category}>
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {verticals.map(({ key, name }) => (
                      <button
                        key={key}
                        onClick={() => handleVerticalChange(key)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          config.vertical === key
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{name}</div>
                        {config.vertical === key && (
                          <div className="text-xs text-blue-600 mt-1">Selected</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Onboarding Questions Tab */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Onboarding Questions</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Preview the questions that will be asked during onboarding. These are based on your selected industry vertical.
                </p>
              </div>

              {config.vertical && VERTICAL_PRESETS[config.vertical] && (
                <div className="space-y-4">
                  {VERTICAL_PRESETS[config.vertical].onboardingQuestions.map((question, idx) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          style={{ backgroundColor: config.primaryColor }}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{question.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{question.subtitle}</p>
                          <div className="mt-2 text-xs text-gray-500">
                            Selection Type: <span className="font-semibold">{question.selectionType === 'multi' ? 'Multiple' : 'Single'} Select</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {question.options.slice(0, 6).map((option) => (
                          <div
                            key={option.id}
                            className="px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-700"
                          >
                            {option.label}
                          </div>
                        ))}
                        {question.options.length > 6 && (
                          <div className="px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-500 italic">
                            +{question.options.length - 6} more...
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!config.vertical && (
                <div className="text-center py-12 text-gray-500">
                  <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select an industry vertical to preview onboarding questions</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 font-semibold hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{ backgroundColor: config.primaryColor }}
            className="px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Save & Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
