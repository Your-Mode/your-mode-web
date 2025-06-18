import Link from "next/link";
import { Button } from "@/src/shared/components/ui/button";
import { ArrowRight } from "lucide-react";

const NewContentButton = () => {
  return (
    <div className="mt-8 text-center">
      <Link href="/content-application">
        <Button>
          새로운 맞춤형 컨텐츠 신청하기
          <ArrowRight size={16} />
        </Button>
      </Link>
    </div>
  );
};

export default NewContentButton;
