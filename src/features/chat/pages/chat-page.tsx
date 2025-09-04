import { GradientParagraph } from "@/components/ui/gradient-paragraph";
import { ChatLayout } from "../components";
import { FileUploader } from "../components/file-uploader";

export const ChatPage = () => {
  return (
    <ChatLayout>
      <div className="flex flex-row gap-12 h-full w-full">
        <div className="mx-auto w-full pt-20">
          <GradientParagraph className="text-[40px] font-semibold text-center leading-normal">
            Welcome to Redline AI
          </GradientParagraph>

          <FileUploader />
        </div>
      </div>
    </ChatLayout>
  );
};
