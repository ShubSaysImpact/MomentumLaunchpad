import { PageHeader } from "@/components/shared/page-header";
import { MonetisationBoard } from "@/components/monetisation/monetisation-board";

export default function MonetisationPage() {
  return (
    <>
      <PageHeader
        title="Monetisation"
        description="Map out your revenue strategies and financial goals."
      />
      <MonetisationBoard />
    </>
  );
}
