"use client";

import * as React from "react";
import { Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  function themeDropdownItem(themeName: string, text: string) {
    return (
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => setTheme(themeName)}
      >
        <span>{text}</span>
        {theme === themeName && <Check className="ml-auto" />}
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeDropdownItem("light", "Light")}
        {themeDropdownItem("dark", "Dark")}
        {themeDropdownItem("system", "System")}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
