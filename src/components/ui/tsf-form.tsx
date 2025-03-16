"use client";
// based on @tanstack/react-form
// TODO: replace with shadcn/ui's official implementation when available

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({className, ...props }, ref) => {

  const field = useFieldContext();
  const hasError = field.state.meta.errors.length > 0;
  return (
    <Label
      ref={ref}
      htmlFor={field.name}
      className={cn(hasError && "text-destructive", className)}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>
(({className, ...props }, ref) => {
  const field = useFieldContext();
  const errors = field.state.meta.errors;

  if (errors.length === 0) return null;

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {errors[0]}
    </p>
  )
})
FormMessage.displayName = "FormMessage";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>
(({className, ...props }, ref) => {
  const field = useFieldContext();
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription";

// extends ./ui/button
const FormSubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const form = useFormContext();
    return (
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {isSubmitting => (
          <Button
            ref={ref}
            type="submit"
            {...props}
            disabled={isSubmitting}
          />
        )}
      </form.Subscribe>
    )
  }
)
FormSubmitButton.displayName = "FormSubmitButton";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Label: FormLabel,
    Message: FormMessage,
    Description: FormDescription,
  },
  formComponents: {
    SubmitButton: FormSubmitButton,
  },
});