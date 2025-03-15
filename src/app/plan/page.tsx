import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { jobData } from "@/lib/jobs";
import PlanTable from "./plan-table";


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

export default function Plan() {
  const sample_roles = jobData.roles
    .filter((role) => role.transient)
    .map((role) => role.name)
    .concat(jobData.jobs.map((job) => job.name));
  return (
    <>
      <div>
        <h1>FRU Mit but Good</h1>
        <h2>Futures Rewritten (Ultimate)</h2>
        <Textarea placeholder="Type your mit plan's description and any other information here..... TODO: support markdown formatting" />
        <div className="ml-auto max-w-fit text-sm">
          stars: 0 -- last updated: [[timestamp]] -- author: emet-selch
        </div>
      </div>
      <Separator className="my-4" />
      <PlanTable roles={sample_roles} mechanics={sample_mechanics} />
    </>
  );
}
