import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { jobData } from "@/lib/jobs";
import PlanTable from "./plan-table";


// sample data
const sample_mechanics = [
  {name: "Cyclonic Break 1", timestamp: 0, mits: []},
  {name: "Utopian Sky", timestamp: 240, mits: []},
  {name: "Cyclonic Break 2", timestamp: 480, mits: []},
  {name: "Burnished Glory 1", timestamp: 720, mits: []},
  {name: "Fall of Faith (1/2)", timestamp: 960, mits: []},
  {name: "Fall of Faith (3/4)", timestamp: 1200, mits: []},
  {name: "Burnished Glory 2", timestamp: 1440, mits: []},
];

export default function Plan() {

  const sample_roles = jobData.roles
    .filter((role) => role.transient)
    .map((role) => ({name: role.name, code: role.code}))
    .concat(jobData.jobs.map((job) => ({name: job.name, code: job.code})))
    .reduce((acc, role) => {
      acc[role.name] = role.code;
      return acc;
    }, {} as Record<string, string>);

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
      <PlanTable plan={{
        id: "sample",
        userId: -1,
        name: "Sample Plan",
        description: "This is a sample plan",
        fightId: "sample",
        roles: sample_roles,
        mechanics: sample_mechanics,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      }} jobData={jobData} />
    </>
  );
}
