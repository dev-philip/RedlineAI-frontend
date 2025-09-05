import SearchIcon from "@/assets/images/svg/search-normal.svg";
import { ChatLayout } from "../components";
import { Dropdown } from "@/components/ui/dropdown";
import { RiskLevel } from "@/utils/enums";
import { Clause } from "../components/clause";
import { useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "motion/react";
import { Interaction } from "@/components/interaction";

const clauses = [
  {
    id: 1,
    title: "Uptime Guarantee",
    description:
      "Provider guarantees 99.5% uptime excluding scheduled maintenance…",
    label: "Service Performance",
    risk_level: RiskLevel.High,
  },
  {
    id: 2,
    title: "Data Retention",
    description: "Retention period exceeds company policy…",
    label: "Compliance",
    risk_level: RiskLevel.Medium,
  },
  {
    id: 3,
    title: "Termination",
    description:
      "Either party may terminate this agreement with 30 days' notice…",
    label: "Legal",
    risk_level: RiskLevel.Low,
  },
];

export const ExtractedClausesPage = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    return () => {
      setSelected((prev) => (prev === id ? null : id));
    };
  };

  return (
    <ChatLayout>
      {/* Parent flex container now animated with layout */}
      <motion.div
        className={classNames("w-full flex flex-row gap-20", {
          "pr-8 md:pr-100": selected === null,
          "pr-4 md:pr-20": selected !== null,
        })}
        layout
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {/* Left panel */}
        <motion.div className="flex-1" layout>
          <div className="flex flex-row gap-12 w-full">
            <div className="w-full flex flex-row items-center gap-4 justify-between">
              <h2 className="text-[#000000B2] font-semibold text-[24px] leading-normal">
                {selected === null ? "Extracted Clauses" : "Suggested Fixes"}
              </h2>

              {/* Animate filter/search bar */}
              <AnimatePresence mode="wait">
                {selected === null && (
                  <motion.div
                    key="filters"
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-row items-center gap-4"
                  >
                    <div className="flex flex-row items-center gap-6">
                      <div className="rounded-[33px] bg-transparent border-[#00000033] border-[1px] text-[#111111B2] flex flex-row items-center gap-[8px] py-[10px] px-[14px] min-w-[304px]">
                        <SearchIcon className="" />

                        <input
                          placeholder="Search by risk or clause type"
                          type="text"
                          className="outline-none bg-none text-[12px] leading-[16px] font-medium"
                        />
                      </div>
                    </div>

                    <Dropdown
                      placeholder="All Clause"
                      selected="All Clause"
                      setSelected={() => {}}
                      options={[
                        "All Clause",
                        "Confidentiality",
                        "Indemnity",
                        "Termination",
                      ]}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Clause list */}
          <div className="mt-10">
            {clauses.map((clause) => (
              <motion.div key={clause.id} className="mb-4" layout>
                <Clause
                  {...clause}
                  onClick={handleSelect(clause.id)}
                  isSelected={clause.id == selected}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right detail panel */}
        <AnimatePresence mode="popLayout">
          {selected !== null && (
            <motion.div
              key="details"
              className="flex-1 flex flex-col gap-8"
              layout
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="w-fit ml-auto text-[#1A73E8] px-[26px] py-[11px] text-center text-white rounded-[50px] bg-[#1A73E8]">
                Summary
              </div>

              <div className="rounded-[20px] border-[3px] border-[#F9F9F9] space-y-[28px] py-[32px] px-[40px]">
                <div className="space-y-[12px]">
                  <p className="text-[20px]">Problem</p>

                  <div className="bg-[#F9F9F9] p-[16px] rounded-[16px]">
                    Provider guarantees 99.5% uptime excluding scheduled
                    maintenance… Provider guarantees 99.5% uptime excluding
                    scheduled maintenance… Provider guarantees 99.5% uptime
                    excluding scheduled maintenance…
                  </div>
                </div>

                <div className="space-y-[12px]">
                  <p className="text-[20px]">Suggested Fix</p>

                  <div className="bg-[#F9F9F9] p-[16px] rounded-[16px]">
                    Increase credits to 25% for outages &gt; 12 hours.
                  </div>
                </div>

                <div className="space-y-[12px]">
                  <p className="text-[20px]">Alternative Option:</p>

                  <div className="bg-[#F9F9F9] p-[16px] rounded-[16px]">
                    10% credit + termination option for outages &gt; 24 hours.
                  </div>
                </div>

                <div className="flex flex-row flex-wrap gap-4 items-center">
                  <Interaction>
                    <div className="bg-[#188038] text-white py-[11px] px-[26px] rounded-[50px]">
                      Accept
                    </div>
                  </Interaction>

                  <Interaction>
                    <div className="bg-[#D92727] text-white py-[11px] px-[26px] rounded-[50px]">
                      Reject
                    </div>
                  </Interaction>

                  <Interaction>
                    <div className="bg-[#F9F9F9] text-black py-[11px] px-[26px] rounded-[50px]">
                      Edit
                    </div>
                  </Interaction>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ChatLayout>
  );
};
