import { useAuthStore } from "@/store/auth";
import { useIngestStore } from "@/store/ingest";
import { useCallback, useState } from "react";

export const useUploadFiles = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { user } = useAuthStore();
  const { uploadFiles } = useIngestStore();

  const handleUploadFiles = useCallback(
    async (files: FileList | null) => {
      try {
        setUploading(true);
        setUploadProgress(0);

        if (!files || files.length === 0) return;
        const fileArray = Array.from(files);

        await uploadFiles(fileArray, user?.id || null, setUploadProgress);
      } finally {
        setUploading(false);
      }
    },
    [user, uploadFiles]
  );

  return { uploadProgress, uploading, handleUploadFiles };
};
