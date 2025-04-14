"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { industries } from "@/data/industries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const OnboardingForm = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const {
    loading: updateLoading = false,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      const payload = {
        industry: formattedIndustry,
        subIndustry: values.subIndustry,
        experience: values.experience,
        bio: values.bio ?? "", // ensure it's always a string
        skills: values.skills ?? [], // ensure it's always a string[]
      };

      await updateUserFn(payload);
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading, router]);

  return (
    <div className="flex justify-center items-center bg-background ">
      <Card className="w-full max-w-lg mx-3">
        <CardHeader>
          <CardTitle className="text-4xl font-bold gradient-title">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("industry", value);
                    const foundIndustry = industries.find(
                      (ind) => ind.id === value
                    );
                    if (foundIndustry) {
                      setSelectedIndustry(foundIndustry);
                    } else {
                      setSelectedIndustry(null);
                    }
                    setValue("subIndustry", "");
                  }}
                >
                  <SelectTrigger id="industry" className="w-full">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Industries</SelectLabel>
                      {industries.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id}>
                          {ind.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-red-500">
                    {errors.industry.message}
                  </p>
                )}
              </div>

              {watch("industry") && (
                <div className="space-y-3">
                  <Label htmlFor="subIndustry">Specilization</Label>
                  <Select
                    onValueChange={(value) => setValue("subIndustry", value)}
                  >
                    <SelectTrigger id="subIndustry" className="w-full">
                      <SelectValue placeholder="Select an Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Specializations</SelectLabel>
                        {selectedIndustry?.subIndustries.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.subIndustry && (
                    <p className="text-sm text-red-500">
                      {errors.subIndustry.message}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-3">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  type="Number"
                  placeholder="Enter years of Experience"
                  min={0}
                  max={50}
                  {...register("experience")}
                />
                {errors.experience && (
                  <p className="text-sm text-red-500">
                    {errors.experience.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  {...register("skills")}
                  type="text"
                  placeholder="e.g. python, java, Project Management etc..."
                />
                <p className="text-sm text-muted-foreground">
                  Separate multiple skills with commas
                </p>
                {errors.skills && (
                  <p className="text-sm text-red-500">
                    {errors.skills.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  {...register("bio")}
                  className="h-25"
                  placeholder="Tell us about your professional background..."
                />
                {errors.bio && (
                  <p className="text-sm text-red-500">{errors.bio.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                size={"lg"}
                disabled={Boolean(updateLoading)}
              >
                {updateLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <Loader size={4} className="animate-spin" />
                    <span>Loading</span>
                  </div>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
