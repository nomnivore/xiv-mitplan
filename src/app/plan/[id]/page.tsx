import { getMitplanById } from "@/lib/mitplan";
import PlanTable from "../plan-table";
import { Separator } from "@/components/ui/separator";
import { jobData } from "@/lib/jobs";
import { Textarea } from "@/components/ui/textarea";

export default async function MitplanPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const mitplan = await getMitplanById(id);
  if (!mitplan) {
    return <div>Not found</div>;
  }

  return (
    <>
      <div>
        <h1>{mitplan.name}</h1>
        <h2>{mitplan.fightId}</h2>
        <Textarea value={mitplan.description ?? ""} />
        <div className="ml-auto max-w-fit text-sm">
          last updated: {new Date(mitplan.updatedAt).toLocaleString()} -- author: {mitplan.userId}
        </div>
      </div>
      <Separator className="my-4" />
      <PlanTable plan={mitplan} jobData={jobData} />
    </>)
}