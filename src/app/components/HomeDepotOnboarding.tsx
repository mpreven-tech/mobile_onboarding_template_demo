import { useState } from "react";
import { WelcomeScreen } from "./onboarding/WelcomeScreen";
import { CreateAccountScreen } from "./onboarding/CreateAccountScreen";
import { PersonalInfoScreen } from "./onboarding/PersonalInfoScreen";
import { HomeTypeScreen } from "./onboarding/HomeTypeScreen";
import { ProjectScreen } from "./onboarding/ProjectScreen";
import { SavingsScreen } from "./onboarding/SavingsScreen";
import { CompletionScreen } from "./onboarding/CompletionScreen";
import { HomeScreen } from "./onboarding/HomeScreen";
import { BrandKitConfig } from "../types/brandKit";

export type OnboardingData = {
  firstName: string;
  username: string;
  password: string;
  birthday: string;
  zipcode: string;
  homeType: string | null;
  projects: string[];
  savingsCategories: string[];
};

interface HomeDepotOnboardingProps {
  brandKit: BrandKitConfig;
}

export function HomeDepotOnboarding({ brandKit }: HomeDepotOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    firstName: "",
    username: "",
    password: "",
    birthday: "",
    zipcode: "",
    homeType: null,
    projects: [],
    savingsCategories: [],
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const screens = [
    <WelcomeScreen key="welcome" onNext={nextStep} onBack={prevStep} brandKit={brandKit} />,
    <CreateAccountScreen
      key="create-account"
      onNext={nextStep}
      onBack={prevStep}
      firstName={data.firstName}
      username={data.username}
      password={data.password}
      onUpdate={(updates) => updateData(updates)}
      brandKit={brandKit}
    />,
    <PersonalInfoScreen
      key="personal-info"
      onNext={nextStep}
      onBack={prevStep}
      birthday={data.birthday}
      zipcode={data.zipcode}
      onUpdate={(updates) => updateData(updates)}
      brandKit={brandKit}
    />,
    <HomeTypeScreen
      key="home-type"
      onNext={nextStep}
      onBack={prevStep}
      selectedType={data.homeType}
      onSelect={(homeType) => updateData({ homeType })}
      brandKit={brandKit}
    />,
    <ProjectScreen
      key="project"
      onNext={nextStep}
      onBack={prevStep}
      selectedProjects={data.projects}
      onToggle={(project) => {
        const projects = data.projects.includes(project)
          ? data.projects.filter((p) => p !== project)
          : [...data.projects, project];
        updateData({ projects });
      }}
      brandKit={brandKit}
    />,
    <SavingsScreen
      key="savings"
      onNext={nextStep}
      onBack={prevStep}
      selectedCategories={data.savingsCategories}
      onToggle={(category) => {
        const categories = data.savingsCategories.includes(category)
          ? data.savingsCategories.filter((c) => c !== category)
          : [...data.savingsCategories, category];
        updateData({ savingsCategories: categories });
      }}
      brandKit={brandKit}
    />,
    <CompletionScreen key="completion" data={data} onNext={nextStep} onBack={prevStep} brandKit={brandKit} />,
    <HomeScreen key="home" data={data} brandKit={brandKit} />,
  ];

  return (
    <div className="w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-[44px] bg-white z-10">
        <div className="flex items-center justify-between px-6 pt-2">
          <span className="text-[15px] font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-[17px] h-[11px] border border-black rounded-[2px] relative">
              <div className="absolute right-[-2px] top-[3px] w-[1px] h-[5px] bg-black rounded-r" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-[44px] h-full">{screens[currentStep]}</div>
    </div>
  );
}