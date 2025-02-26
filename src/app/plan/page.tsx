import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { NotebookTextIcon, PlusIcon } from "lucide-react";

// sample data
const sample_mechanics = [
  "Cyclonic Break 1",
  "Utopian Sky",
  "Cyclonic Break 2",
  "Burnished Glory 1",
  "Fall of Faith (1/2)",
  "Fall of Faith (3/4)",
  "Burnished Glory 2",
];

const sample_roles = [
  "WHM",
  "AST",
  "SGE",
  "SCH",
  "Tank 1",
  "Tank 2",
  "Melee 1",
  "Melee 2",
  "Phys Range",
  "Caster",
];

export default function Plan() {
  return (
    <>
      <div>
        <h1>FRU Mit but Good</h1>
        <h2>Futures Rewritten (Ultimate)</h2>
        <Textarea placeholder="Type your mit plan's description and any other information here..... TODO: support markdown formatting" />
        <div className="text-sm ml-auto max-w-fit">
          stars: 0 -- last updated: [[timestamp]] -- author: emet-selch
        </div>
      </div>
      <Separator className="my-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {sample_roles.map((role, key) => (
              <TableHead key={key} className="align-middle text-center">
                {role}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sample_mechanics.map((mech, key) => (
            <TableRow key={key}>
              <TableCell className="">
                <div className="flex flex-col min-w-fit text-nowrap py-4">
                  <div>{mech}</div>
                  <small className="text-muted-foreground">00:24</small>
                </div>
              </TableCell>

              {sample_roles.map((_, key) => (
                <TableCell key={key} className="group border-l-1">
                  <div className="flex gap-1 justify-center flex-wrap">
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
                      className="opacity-0 group-hover:opacity-100 outline-dashed -outline-offset-3 outline-[2px] cursor-pointer"
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
        </TableBody>
      </Table>
    </>
  );
}
