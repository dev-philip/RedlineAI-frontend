import type React from "react";
import { motion } from "motion/react";
import classNames from "classnames";

import EyeIcon from "@/assets/images/svg/eye.svg";
import FolderAddIcon from "@/assets/images/svg/folder-add.svg";
import FolderOpenIcon from "@/assets/images/svg/folder-open.svg";
import SearchIcon from "@/assets/images/svg/search-normal.svg";

import { Interaction } from "@/components/interaction";
import { useState } from "react";

const history = [
  "Judging Creative Onchain Hackathon",
  "Valora vs Traditional Banks",
];

const previous = ["Bacteriology overview"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const buttonGroupVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200 },
  },
};

export const SideBar: React.FC = () => {
  const [activePrevious] = useState<number>(0);

  return (
    <motion.div
      className="flex flex-col flex-start h-full gap-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <EyeIcon />
      </motion.div>

      <motion.div
        className="bg-[#F9F9F9] w-full p-8 rounded-[12px] flex flex-col gap-4 overflow-hidden"
        variants={buttonGroupVariants}
      >
        <motion.div variants={itemVariants}>
          <Interaction>
            <div className="flex flex-row items-center gap-3">
              <FolderAddIcon />
              <span className="text-[#000000B2] text-small">New Chat</span>
            </div>
          </Interaction>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Interaction>
            <div className="flex flex-row items-center gap-3">
              <SearchIcon />
              <span className="text-[#000000B2] text-small">Search</span>
            </div>
          </Interaction>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Interaction>
            <div className="flex flex-row items-center gap-3">
              <FolderOpenIcon />
              <span className="text-[#000000B2] text-small">Library</span>
            </div>
          </Interaction>
        </motion.div>
      </motion.div>

      <div className="">
        <p className="text-[#000000CC] text-base mb-2">Last Reviews</p>

        <div className="bg-surface-light dark:bg-surface-dark rounded-[12px] p-4">
          <p className="mb-2 text-text-light/40 dark:text-text-dark/10 text-base">
            Yesterday
          </p>

          <div>
            {history.map((option, index) => (
              <div
                key={`history-${index}`}
                className={classNames(
                  "transition-all duration-200 cursor-pointer w-full px-4 py-3 rounded-[12px]",
                  "hover:bg-surface-1-light hover:dark:bg-surface-1-dark",
                  {
                    "bg-surface-1-light dark:bg-surface-1-dark":
                      activePrevious === index,
                  }
                )}
              >
                <p className="truncate text-text-light/70 dark:text-text-dark/40 text-sm">
                  {option}
                </p>
              </div>
            ))}
          </div>

          <p className="mb-2 text-text-light/40 dark:text-text-dark/10 text-base">
            Previous 30 days
          </p>
          <div>
            {previous.map((option, index) => (
              <div
                key={`previous-${index}`}
                className={classNames(
                  "transition-all duration-200 cursor-pointer w-full px-4 py-3 rounded-[12px]",
                  "hover:bg-surface-1-light hover:dark:bg-surface-1-dark",
                  {
                    "bg-surface-1-light dark:bg-surface-1-dark":
                      activePrevious === index + history.length,
                  }
                )}
              >
                <p className="truncate text-text-light/70 dark:text-text-dark/40 text-sm">
                  {option}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
