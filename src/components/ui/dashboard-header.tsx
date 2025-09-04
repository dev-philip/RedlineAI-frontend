import { useRef, useState } from "react";
import { motion } from "motion/react";
import { CircleAvatar } from "./circle-avatar";
import { Popover } from "./popover";
import defaultAvatar from "@/assets/images/png/default_avatar.png";
import SearchIcon from "@/assets/images/svg/search-normal.svg";
import { useAuthStore } from "@/store/auth";
import { ProfileMenu } from "./profile-menu";
import { Interaction } from "../interaction";
import { FullLogo } from "./full-logo";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Animation variants
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const DashboardHeader = () => {
  const avatarRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();

  const { logOut } = useAuth();

  return (
    <>
      <motion.div
        className="bg-surface-light dark:bg-surface-dark w-full"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-[73px]">
          <motion.div className=" w-full flex justify-between items-center h-full">
            {/* Logo/Brand */}
            <div className="w-full max-w-[275px]">
              <motion.div variants={itemVariants}>
                <FullLogo />
              </motion.div>
            </div>

            <div className="flex-1 px-4 lg:px-8 flex flex-row items-center gap-8 justify-between">
              {/** Title? TODO: Clarify what this is from designer or timi */}
              <motion.div className="" variants={itemVariants}>
                <p className="text-text-light/70 dark:text-text-dark/70 text-sm text-center">
                  SLA (Service Level Agreement) with AWS
                </p>
              </motion.div>

              {/** Actions */}
              <motion.div
                className="flex flex-row items-center gap-10"
                variants={itemVariants}
              >
                {/** TODO: Wrap with Icon Button */}

                <div className="rounded-[33px] bg-[#EBEBEB] text-[#111111B2] flex flex-row items-center gap-[8px] py-[10px] px-[14px] min-w-[304px]">
                  <SearchIcon className="" />

                  <input
                    placeholder="Search your dashboard"
                    type="text"
                    className="outline-none bg-none text-[12px] leading-[16px] font-medium"
                  />
                </div>

                <Interaction
                  ref={avatarRef}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="w-fit h-fit bg-transparent outline-none border-none"
                  title="Profile"
                  type="button"
                  disabled={!user}
                >
                  <div className="flex flex-row items-center gap-4">
                    <CircleAvatar src={defaultAvatar} size={40} />

                    <div className="flex flex-col items-start font-normal">
                      <p className="font-semibold">John Doe</p>
                      <p className="text-[#344054]">Welcome back</p>
                    </div>
                  </div>
                </Interaction>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Popover Menu */}
      <Popover
        anchorEl={avatarRef.current}
        isOpen={isMenuOpen && Boolean(user)}
        onClose={() => setIsMenuOpen(false)}
      >
        <ProfileMenu user={user!} onLogout={logOut} />
      </Popover>
    </>
  );
};
