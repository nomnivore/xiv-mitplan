"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppForm } from "@/components/ui/tsf-form";
import { SelectLabel } from "@radix-ui/react-select";
import { type User } from "@/lib/db/schema";
import { z } from "zod";
import { createMitplan } from "@/lib/mitplan";
import { redirect } from "next/navigation";

const newPlanFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string(),
  fightId: z.enum(["fru", "top", "dsr", "m1s", "m2s", "m3s", "m4s"], {
    message: "Please select a fight from the list above",
  }),
});

export function NewPlanForm({ user }: { user: User }) {
  const form = useAppForm({
    defaultValues: {
      name: "",
      description: "",
      fightId: "", // shortcode/id for a fight
    },
    validators: {
      onSubmit: newPlanFormSchema,
    },
    onSubmit: ({ value }) => {
      const formData = {
        userId: user.id,
        ...value,
      };
      createMitplan(formData).then((id) => {
        if (id) {
          redirect(`/plan/${id}`);
        }
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <h2 className="text-xl">Plan Information</h2>
      <form.AppField
        name="name"
        children={(field) => (
          <div className="space-y-2">
            <field.Label>Name</field.Label>
            <Input
              placeholder="100 ways to not wipe"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            <field.Message />
          </div>
        )}
      />
      <form.AppField
        name="description"
        children={(field) => (
          <div className="space-y-2">
            <field.Label>Description</field.Label>
            <Textarea
              placeholder="How to not wipe in my next fight"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="max-h-48 min-h-24"
            />
            <field.Message />
          </div>
        )}
      />
      <h2 className="text-xl">Fight Information</h2>
      <form.AppField
        name="fightId"
        children={(field) => (
          <div className="space-y-2">
            <field.Label>Fight</field.Label>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a fight" />
              </SelectTrigger>
              <SelectContent>
                {/* TODO: populate a list of fights from actual data */}
                <SelectGroup>
                  <SelectLabel className="font-bold">Ultimates</SelectLabel>
                  <SelectItem value="fru">Futures Rewritten</SelectItem>
                  <SelectItem value="top">The Omega Project</SelectItem>
                  <SelectItem value="dsr">Dragonsong Reprise</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel className="font-bold">Savage</SelectLabel>
                  <SelectItem value="m1s">AAC Light-heavyweight M1</SelectItem>
                  <SelectItem value="m2s">AAC Light-heavyweight M2</SelectItem>
                  <SelectItem value="m3s">AAC Light-heavyweight M3</SelectItem>
                  <SelectItem value="m4s">AAC Light-heavyweight M4</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <field.Message />
          </div>
        )}
      />
      <form.AppForm>
        <form.SubmitButton className="cursor-pointer">
          Create Plan
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
