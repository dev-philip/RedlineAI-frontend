import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "motion/react";
import UploadImg from "@/assets/images/png/upload_icon.png";
import PdfIcon from "@/assets/images/png/pdf_icon.png";
import DocxIcon from "@/assets/images/png/docx_icon.jpg";

interface FileUploaderProps {
  onFileUpload: (files: FileList) => Promise<void>;
  progress?: number;
  uploading?: boolean;
}

const fadeMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

export const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const { uploading = false, progress = 0, onFileUpload } = props;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const processing = useMemo(
    () => uploading && progress > 99,
    [uploading, progress]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = e.target.files;

      setSelectedFile(files[0]);
      await onFileUpload(files);
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return UploadImg;
    if (selectedFile.name.endsWith(".pdf")) return PdfIcon;
    if (
      selectedFile.name.endsWith(".doc") ||
      selectedFile.name.endsWith(".docx")
    )
      return DocxIcon;
    return UploadImg;
  };

  return (
    <div className="mt-8 border-[3px] border-[#F9F9F9] rounded-[20px] max-w-[800px] p-6 mx-auto">
      <label
        htmlFor="file-upload"
        className={classNames(
          "flex flex-col items-center py-[28px] px-[24px] rounded-[16px] gap-6 cursor-pointer transition-all",
          {
            "border-2 border-dashed border-[#FA9874] bg-[#FFFBFA]":
              !!selectedFile,
            "bg-[#F9F9F980]": !selectedFile,
          }
        )}
      >
        {/* File icon with animation */}
        <motion.img
          key={getFileIcon()}
          src={getFileIcon()}
          alt="Upload"
          className="h-[56px] w-[56px] object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />

        <div className="w-full">
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              // --- No file selected
              <motion.div key="no-file" {...fadeMotion}>
                <p className="text-[#475367] text-small text-center">
                  <span className="text-[#1A73E8] font-semibold">
                    Click to upload
                  </span>{" "}
                  or Drag and drop your SLA PDF here
                </p>
                <p className="text-[12px] text-[#98A2B3] text-center">
                  PDF or DOCX (max. 20mb)
                </p>
              </motion.div>
            ) : uploading ? (
              // --- Uploading progress
              <motion.div key="uploading" {...fadeMotion}>
                <p className="text-[#98A2B3] font-semibold text-base text-center">
                  Uploading your file...
                </p>
                <div className="w-full bg-[#FCD2C2] rounded-[13px] h-[6px] mt-2 overflow-hidden">
                  <motion.div
                    className="bg-[#F56630] h-[6px] rounded-[13px]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.4 }}
                  />
                </div>
              </motion.div>
            ) : processing ? (
              // --- Waiting for server response
              <motion.div
                key="processing"
                {...fadeMotion}
                className="flex flex-col items-center"
              >
                <p className="text-[#98A2B3] font-semibold text-base text-center">
                  Processing your file...
                </p>
                <div className="mt-3 h-5 w-5 border-2 border-[#F56630] border-t-transparent rounded-full animate-spin" />
              </motion.div>
            ) : (
              // --- Done (success)
              <motion.div key="done" {...fadeMotion}>
                <p className="text-[#1D2739] font-semibold text-base text-center">
                  Upload complete 🎉
                </p>
                <p className="text-[#98A2B3] text-small text-center font-medium">
                  {selectedFile?.name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </label>

      {/* Hidden input */}
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
