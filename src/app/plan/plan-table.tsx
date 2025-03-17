"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { NotebookTextIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { AddRolePopover } from "./addRolePopover";
import { Mitplan } from "@/lib/db/schema";
import { jobData } from "@/lib/jobs";

export type PlanTableProps = {
  plan: Mitplan;
  jobData: typeof jobData;
};

type Mechanic = Mitplan["mechanics"][number];

function createMechanic(name: string): Mechanic {
  // timestamps are relative to the start of the fight. like 00:24
  return {
    name,
    timestamp: 0,
    mits: [],
  };
}

export default function PlanTable({ plan, jobData }: PlanTableProps) {
  const [mechanics, setMechanics] = useState(plan.mechanics);
  const [roles, setRoles] = useState(plan.roles);

  const handleAddRole = (role: {name: string, code: string}, dupeSuffix = 0) => {
    // TODO: handle duplicates
    const key = role.name + (dupeSuffix > 0 ? ` ${dupeSuffix}` : "");
    if (roles[key]) {
      handleAddRole(role, dupeSuffix + 1);
    } else {
      setRoles({
        ...roles,
        [key]: role.code,
      });
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          {Object.entries(roles).map(([displayName, code], key) => (
            <TableHead key={key} className="text-center align-middle">
              <div className="flex min-w-fit flex-col py-4 text-nowrap">
                <span className="font-bold">{displayName}</span>
                <span className="text-xs text-muted-foreground">{code}</span>
              </div>
            </TableHead>
          ))}
          <TableHead>
            <AddRolePopover
              onSelectRole={handleAddRole}
              roles={jobData.selectableRoles.map(({ name, code }) => ({ name, code }))}
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mechanics.map((mech, key) => (
          <TableRow key={key}>
            <TableCell className="">
              <div className="flex min-w-fit flex-col py-4 text-nowrap">
                <div>{mech.name}</div>
                <small className="text-muted-foreground">00:24</small>
              </div>
            </TableCell>

            {Object.values(roles).map((_, key) => (
              <TableCell key={key} className="group border-l-1">
                <div className="flex max-w-48 min-w-28 flex-wrap justify-center gap-1">
                  {/* simulate 2-3 mits per cell */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <NotebookTextIcon className="aspect-square" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <NotebookTextIcon className="aspect-square" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <NotebookTextIcon className="aspect-square" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer opacity-0 outline-[2px] -outline-offset-3 outline-dashed group-hover:opacity-100"
                  >
                    <PlusIcon
                      aria-label="add-action"
                      className="aspect-square"
                    />
                  </Button>
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              onClick={() =>
                setMechanics([...mechanics, createMechanic("New Mechanic")])
              }
            >
              <PlusIcon className="aspect-square" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
