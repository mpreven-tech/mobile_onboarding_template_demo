import { useState, useEffect } from 'react';
import { Save, Folder, Trash2, Plus, Check } from 'lucide-react';
import { BrandKitConfig } from '../types/brandKit';

interface SavedBrandKit {
  name: string;
  config: BrandKitConfig;
  savedAt: string;
}

interface BrandKitManagerProps {
  currentConfig: BrandKitConfig;
  onLoad: (config: BrandKitConfig) => void;
}

export function BrandKitManager({ currentConfig, onLoad }: BrandKitManagerProps) {
  const [savedKits, setSavedKits] = useState<SavedBrandKit[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [selectedKit, setSelectedKit] = useState<string | null>(null);

  // Load saved kits from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('brandKits');
    if (stored) {
      try {
        setSavedKits(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load saved brand kits:', e);
      }
    }
  }, []);

  // Save kits to localStorage whenever they change
  useEffect(() => {
    if (savedKits.length > 0) {
      localStorage.setItem('brandKits', JSON.stringify(savedKits));
    }
  }, [savedKits]);

  const handleSave = () => {
    if (!saveName.trim()) return;

    const newKit: SavedBrandKit = {
      name: saveName.trim(),
      config: currentConfig,
      savedAt: new Date().toISOString(),
    };

    // Check if name already exists
    const existingIndex = savedKits.findIndex(kit => kit.name === newKit.name);
    if (existingIndex >= 0) {
      // Update existing
      const updated = [...savedKits];
      updated[existingIndex] = newKit;
      setSavedKits(updated);
    } else {
      // Add new
      setSavedKits([...savedKits, newKit]);
    }

    setSelectedKit(newKit.name);
    setSaveName('');
    setShowSaveDialog(false);
  };

  const handleLoad = (kit: SavedBrandKit) => {
    onLoad(kit.config);
    setSelectedKit(kit.name);
  };

  const handleDelete = (name: string) => {
    setSavedKits(savedKits.filter(kit => kit.name !== name));
    if (selectedKit === name) {
      setSelectedKit(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Folder className="w-6 h-6 text-blue-600" />
            Saved Brand Kits
          </h3>
          <p className="text-sm text-gray-600 mt-1">Save and manage your brand configurations</p>
        </div>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Current
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Save Brand Kit</h4>
          <div className="flex gap-3">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="Enter a name (e.g., My Coffee Shop)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              autoFocus
            />
            <button
              onClick={handleSave}
              disabled={!saveName.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setSaveName('');
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            If a kit with this name exists, it will be updated.
          </p>
        </div>
      )}

      {/* Saved Kits List */}
      {savedKits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedKits.map((kit) => (
            <div
              key={kit.name}
              className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                selectedKit === kit.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => handleLoad(kit)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    {kit.name}
                    {selectedKit === kit.name && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(kit.savedAt).toLocaleDateString()} at{' '}
                    {new Date(kit.savedAt).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(kit.name);
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {kit.config.logoUrl && (
                    <img
                      src={kit.config.logoUrl}
                      alt=""
                      className="w-10 h-10 object-contain rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {kit.config.brandName}
                    </div>
                    <div className="text-xs text-gray-600">{kit.config.tagline}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded border border-gray-200"
                    style={{ backgroundColor: kit.config.primaryColor }}
                  />
                  <div
                    className="w-8 h-8 rounded border border-gray-200"
                    style={{ backgroundColor: kit.config.secondaryColor }}
                  />
                  <span className="text-xs text-gray-500 ml-2">{kit.config.vertical}</span>
                </div>
              </div>

              {selectedKit === kit.name && (
                <div className="mt-3 text-xs text-blue-600 font-semibold">
                  Currently Loaded
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Folder className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium mb-2">No saved brand kits yet</p>
          <p className="text-sm">Click "Save Current" to save your first brand kit</p>
        </div>
      )}
    </div>
  );
}
