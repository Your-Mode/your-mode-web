import { Dialog, DialogContent, DialogFooter } from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import styled from "@emotion/styled";

interface TankYouModalProps {
  thankYouModalOpen: boolean;
  setThankYouModalOpen: (open: boolean) => void;
}

const ThankYouModal = ({ thankYouModalOpen, setThankYouModalOpen }: TankYouModalProps) => {
  return (
    <ThankYouDialog open={thankYouModalOpen} onOpenChange={setThankYouModalOpen}>
      <DialogContent className="sm:max-w-[400px] text-center">
        <div>
          <h4 className="text-center">감사합니다! 🎉</h4>
          <p className="text-center">
            소중한 후기를 작성해주셔서 감사합니다.
            <br />더 나은 서비스를 제공하는데 큰 도움이 됩니다.
          </p>
        </div>
        <DialogFooter className="justify-center">
          <Button onClick={() => setThankYouModalOpen(false)}>확인</Button>
        </DialogFooter>
      </DialogContent>
    </ThankYouDialog>
  );
};

export default ThankYouModal;

const ThankYouDialog = styled(Dialog)`
  .dialog-content {
    text-align: center;
  }
`;
