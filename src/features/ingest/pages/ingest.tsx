import { GradientParagraph } from "@/components/ui/gradient-paragraph";
import { IngestLayout } from "../components";
import { FileUploader } from "../components/file-uploader";
import { useUploadFiles } from "../hooks";

export const IngestPage = () => {
  const { handleUploadFiles, uploadProgress, uploading } = useUploadFiles();

  return (
    <IngestLayout>
      <div className="flex flex-row gap-12 h-full w-full">
        <div className="mx-auto w-full pt-20">
          <GradientParagraph className="text-[40px] font-semibold text-center leading-normal">
            Welcome to Redline AI
          </GradientParagraph>

          <FileUploader
            onFileUpload={handleUploadFiles}
            uploading={uploading}
            progress={uploadProgress}
          />
        </div>
      </div>
    </IngestLayout>
  );
};
