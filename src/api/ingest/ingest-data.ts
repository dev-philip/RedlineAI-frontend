import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IPayload {
  files: File[];
  user_id: string | null;
}

export const ingest_data = async (
  payload: IPayload,
  onProgress?: (progress: number) => void
) => {
  const formData = new FormData();
  payload.files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("doc_type", "Lease");
  formData.append("tenant", "acme");
  formData.append("tags", "lease,office");
  formData.append("is_logged_in", payload.user_id ? "true" : "false");

  if (payload.user_id) formData.append("user_id", payload.user_id || "");

  const response = await axiosInstance.post(endpoints.uploadFiles, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      if (event.total && onProgress) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      }
    },
  });

  console.log("Ingest response:", response.data);
};
