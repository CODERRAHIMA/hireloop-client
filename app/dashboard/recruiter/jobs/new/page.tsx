"use client";

import React, { useState, FormEvent } from "react";
import { ArrowRight, Calendar, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type JobForm = {
  jobTitle: string;
  companyName: string;
  jobCategory: string;
  jobType: string;
  remoteWork: boolean;
  jobLocation: string;
  applicationDeadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  keyResponsibilities: string;
  qualifications: string;
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "Customer Support",
  "Human Resources",
  "Finance",
  "Other",
] as const;
const FREQUENCIES = ["per hour", "per month", "per year"] as const;

const initialForm: JobForm = {
  jobTitle: "",
  companyName: "",
  jobCategory: "",
  jobType: "Full-time",
  remoteWork: false,
  jobLocation: "",
  applicationDeadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  keyResponsibilities: "",
  qualifications: "",
};

export default function NewJobPage() {
  const [form, setForm] = useState<JobForm>(initialForm);

  const setField = <K extends keyof JobForm>(key: K, value: JobForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setJobType = (type: string) => {
    setField("jobType", type);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("New Job Data:", form);
    alert(
      "Job posted!\n\nCollected data:\n" + JSON.stringify(form, null, 2)
    );
  };

  return (
    <div className="dark min-h-screen bg-background">
      <div className="mx-auto max-w-[1024px] w-full px-6 py-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-xs text-muted-foreground">
                Manage Jobs › Create New Listing
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Post a New Job
              </h1>
              <p className="text-sm text-muted-foreground">
                Fill in the position specifications to attract qualified talent
                across our network.
              </p>
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <section
            className={cn(
              "rounded-xl border border-input bg-card p-6",
              "dark:border-border dark:bg-card"
            )}
          >
            <div className="flex items-center gap-1.5 mb-6">
              <span className="text-muted-foreground">•</span>
              <span className="font-medium text-foreground">
                1. Basic Information
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-1 md:col-span-2">
                <Label className="mb-2 block">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="e.g. Frontend Developer"
                  value={form.jobTitle}
                  onChange={(e) => setField("jobTitle", e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block flex items-center gap-1.5">
                  <Building2 className="size-4 text-muted-foreground" />
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="e.g. HirePulse Network"
                  value={form.companyName}
                  onChange={(e) => setField("companyName", e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">
                  Job Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={form.jobCategory}
                  onChange={(e) => setField("jobCategory", e.target.value)}
                >
                  <option value="">Select a category</option>
                  {JOB_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  role="button"
                  aria-pressed={form.jobType === type}
                  onClick={() => setJobType(type)}
                  className={cn(
                    "flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-medium transition-colors",
                    form.jobType === type
                      ? "bg-brand-accent text-brand-accent-foreground border-transparent"
                      : "bg-input border-input text-muted-foreground hover:bg-input/50 hover:text-foreground"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

          {/* Section 2: Location, Compensation & Timeline */}
          <section
            className={cn(
              "rounded-xl border border-input bg-card p-6",
              "dark:border-border dark:bg-card"
            )}
          >
            <div className="flex items-center gap-1.5 mb-6">
              <span className="text-muted-foreground">•</span>
              <span className="font-medium text-foreground">
                2. Location, Compensation & Timeline
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium text-foreground">
                  Remote Work Allowed (IsRemote)
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
              <Switch
                checked={form.remoteWork}
                onCheckedChange={(checked) =>
                  setField("remoteWork", checked)
                }
                className="w-12"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label className="mb-2 block">
                  Job Location (Location) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                  />
                  <Input
                    className="pl-9"
                    placeholder="e.g. New York, USA"
                    value={form.jobLocation}
                    onChange={(e) => setField("jobLocation", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">
                  Application Deadline (deadline) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
                  />
                  <Input
                    className="pl-9"
                    type="text"
                    placeholder="MM/DD/YYYY"
                    value={form.applicationDeadline}
                    onChange={(e) => setField("applicationDeadline", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label className="mb-2 block">Min Salary / Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    €
                  </span>
                  <Input
                    className="pl-7"
                    placeholder="25"
                    value={form.minSalary}
                    onChange={(e) => setField("minSalary", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Max Salary / Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    €
                  </span>
                  <Input
                    className="pl-7"
                    placeholder="40"
                    value={form.maxSalary}
                    onChange={(e) => setField("maxSalary", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Frequency</Label>
                <Select
                  value={form.frequency}
                  onChange={(e) => setField("frequency", e.target.value)}
                >
                  {FREQUENCIES.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </section>

          {/* Section 3: Responsibilities & Requirements */}
          <section
            className={cn(
              "rounded-xl border border-input bg-card p-6",
              "dark:border-border dark:bg-card"
            )}
          >
            <div className="flex items-center gap-1.5 mb-6">
              <span className="text-muted-foreground">•</span>
              <span className="font-medium text-foreground">
                3. Responsibilities & Requirements
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">
                  Key Responsibilities <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder="Describe the key responsibilities..."
                  value={form.keyResponsibilities}
                  onChange={(e) =>
                    setField("keyResponsibilities", e.target.value)
                  }
                />
              </div>

              <div>
                <Label className="mb-2 block">
                  Qualifications & Requirements <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder="List qualifications and requirements..."
                  value={form.qualifications}
                  onChange={(e) => setField("qualifications", e.target.value)}
                />
              </div>
            </div>
          </section>
          <section>
            <Button
              type="submit"
              variant="brandAccent"
              size="lg"
              className="w-fit lg:w-auto"
            >
              Publish Job <ArrowRight className="ml-2 size-4" />
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}
