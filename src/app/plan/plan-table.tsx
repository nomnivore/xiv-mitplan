"use client"
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { NotebookTextIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { AddRolePopover } from "./addRolePopover";

// TODO: distinguish "useable roles" (what can be added) and "initial state" (whats in the database)
export default function PlanTable(initialState: {roles: string[], mechanics: string[]}) {
  const [mechanics, setMechanics] = useState(initialState.mechanics);
  const [roles, setRoles] = useState(initialState.roles);

  const handleAddRole = (role: string) => {
    setRoles([...roles, role]);
  };
  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {roles.map((role, key) => (
              <TableHead key={key} className="text-center align-middle">
                {role}
              </TableHead>
            ))}
            <TableHead>
              <AddRolePopover onSelectRole={handleAddRole} roles={initialState.roles} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mechanics.map((mech, key) => (
            <TableRow key={key}>
              <TableCell className="">
                <div className="flex min-w-fit flex-col py-4 text-nowrap">
                  <div>{mech}</div>
                  <small className="text-muted-foreground">00:24</small>
                </div>
              </TableCell>

              {roles.map((_, key) => (
                <TableCell key={key} className="group border-l-1">
                  <div className="flex flex-wrap justify-center gap-1 min-w-28 max-w-48">
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
              <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => setMechanics([...mechanics, "New Mechanic"])}>
                <PlusIcon className="aspect-square" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
}