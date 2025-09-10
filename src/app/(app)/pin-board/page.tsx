import { PageHeader } from "@/components/shared/page-header";
import { PinBoard } from "@/components/pin-board/pin-board";

export default function PinBoardPage() {
  return (
    <>
      <PageHeader
        title="Pin Board"
        description="A space to capture and organize your content ideas, thoughts, and inspiration."
      />
      <PinBoard />
    </>
  );
}
