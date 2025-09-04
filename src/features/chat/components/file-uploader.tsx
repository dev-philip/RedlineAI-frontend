import { useState } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "motion/react";
import UploadImg from "@/assets/images/png/upload_icon.png";
import PdfIcon from "@/assets/images/png/pdf_icon.png";
import DocxIcon from "@/assets/images/png/docx_icon.jpg";

export const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // simulate upload progress
      let uploaded = 0;
      const interval = setInterval(() => {
        uploaded += 10;
        setProgress(uploaded);
        if (uploaded >= 100) clearInterval(interval);
      }, 300);
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
              <motion.div
                key="no-file"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[#475367] text-small leading-[1.45] text-center">
                  <span className="text-[#1A73E8] font-semibold">
                    Click to upload
                  </span>{" "}
                  or Drag and drop your SLA PDF here
                </p>
                <p className="text-[12px] text-[#98A2B3] leading-[1.45] text-center">
                  PDF or DOCX (max. 20mb)
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[#98A2B3] font-semibold text-base leading-[1.45] text-center">
                  Uploading your file...
                </p>

                {/* Animated Progress bar */}
                <div className="w-full bg-[#FCD2C2] rounded-[13px] h-[6px] mt-2 overflow-hidden">
                  <motion.div
                    className="bg-[#F56630] h-[6px] rounded-[13px]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.4 }}
                  />
                </div>

                <motion.div
                  className="flex flex-col items-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-[#1D2739] leading-[1.45] text-small font-semibold text-center">
                    PDF or DOCX (max. 20mb)
                  </p>

                  <p className="text-[#98A2B3] text-small leading-[1.45] text-center font-medium">
                    {selectedFile.name}
                  </p>
                </motion.div>
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
