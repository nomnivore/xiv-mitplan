import { Button, ButtonProps } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import * as React from "react";

interface AddRolePopoverProps extends ButtonProps {
  onSelectRole: (role: string) => void;
  roles: string[];
}

export const AddRolePopover = React.forwardRef<
  HTMLButtonElement,
  AddRolePopoverProps
>(({ onSelectRole, roles, className, variant, size, ...props }, ref) => {
  const [selectedRole, setSelectedRole] = React.useState<string | undefined>();
  const [open, setOpen] = React.useState(false);
  const handleAddButton = () => {
    if (selectedRole) {
      onSelectRole(selectedRole);
      setSelectedRole(undefined);
    }

    setOpen(false);
  };
  // TODO: make this a form
  // can try out the new tanstack-form

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          {...props}
          variant={variant || "ghost"}
          size={size || "icon"}
          ref={ref}
          className={cn("cursor-pointer", className)}
        >
          <PlusIcon className="aspect-square" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role, key) => (
              <SelectItem key={key} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={handleAddButton}
        >
          Add
        </Button>
      </PopoverContent>
    </Popover>
  );
});
