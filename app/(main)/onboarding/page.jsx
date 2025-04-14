import { userOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";

export default async function OnboardingPage() {
  // Check if user is already onboarded
  const { isOnboarded } = await userOnBoardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries}/>
    </main>
  );
}