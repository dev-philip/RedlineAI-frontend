import { Interaction } from "@/components/interaction";
import { RiskLevel } from "@/utils/enums";
import classNames from "classnames";
import type React from "react";

interface ClauseProps {
  title: string;
  description: string;
  label: string;
  risk_level: RiskLevel;
  isSelected?: boolean;
  onClick?: () => void;
}

export const Clause: React.FC<ClauseProps> = (props) => {
  const {
    title,
    description,
    label,
    risk_level,
    isSelected = false,
    onClick,
  } = props;

  return (
    <Interaction
      className="w-full"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      <div
        className={classNames(
          "group transition-all w-full rounded-[16px] py-[25px] px-[24px] flex flex-col items-start",
          {
            "bg-[#1A73E8]": isSelected,
            "bg-[#F9F9F9] hover:bg-[#1A73E8]": !isSelected,
          }
        )}
      >
        <div className="w-full flex flex-row justify-between gap-8 items-center">
          <p
            className={classNames("group-hover:text-white", {
              "text-[#000000]": !isSelected,
              "text-white": isSelected,
            })}
          >
            {title}
          </p>

          <div className="flex flex-row gap-4 items-center">
            <div
              className={classNames(
                "transition-all rounded-[16px] py-[4px] px-[8px] text-[14px] group-hover:bg-[#EEEEEE] group-hover:text-[#00000080]",
                {
                  "text-[#00000080] bg-[#EEEEEE]": isSelected,
                  "text-[#000000B2] bg-[#B0B0B026]": !isSelected,
                }
              )}
            >
              {label}
            </div>

            <div
              className={classNames(
                "rounded-[16px] py-[4px] px-[8px] text-[14px]",
                {
                  "bg-[#D9272733] group-hover:bg-[#FFBFBF] text-[#D92727]":
                    risk_level === RiskLevel.High && !isSelected,

                  "bg-[#FFBFBF] text-[#D92727]":
                    risk_level === RiskLevel.High && isSelected,

                  "bg-[#F9AB0033] text-[#F9AB00]":
                    risk_level === RiskLevel.Medium,
                  "bg-[#18803833] text-[#188038]": risk_level === RiskLevel.Low,
                }
              )}
            >
              {risk_level} Risk
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p
            className={classNames(
              "text-[16px] opacity-[0.5] group-hover:text-white text-start",
              {
                "text-white": isSelected,
                "text-[#000000]": !isSelected,
              }
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </Interaction>
  );
};
