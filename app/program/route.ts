import { redirect } from "next/navigation";
import { currentProgramConcert } from "@/lib/data";

/**
 * One permanent address for the program (newwestsymphony.org/program), so a
 * single QR code in the hall stays right all season. Evaluated per request.
 */
export const dynamic = "force-dynamic";

export function GET() {
  const concert = currentProgramConcert();
  redirect(concert ? `/concerts/${concert.slug}/program` : "/concerts");
}
