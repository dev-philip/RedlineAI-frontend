import type React from "react";
import type { ReactNode } from "react";

type Tag = "p";
interface IProps {
  children: ReactNode;
  from?: string;
  to?: string;
  angle?: number;
  as?: Tag;
  className?: string;
}

export const GradientParagraph: React.FC<IProps> = ({
  children,
  from = "#6f549d",
  to = "#f293d5",
  angle = 90,
  as: Tag = "p",
  className = "",
}) => {
  const style = {
    backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  } as React.CSSProperties;

  return (
    <Tag
      className={[
        // nice defaults; works even without Tailwind but plays well if present
        "leading-relaxed", // readable line height
        "tracking-normal",
        "", // placeholder to keep array shape stable
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </Tag>
  );
};
