//A standard div which manages the body theme on render

import { useEffect } from "react";

//Note: all theming classes start with "bg_"
interface Props {
  children?: JSX.Element | JSX.Element[] | string | null;
  className?: string;
  theme?: string;
}

const BodyThemeManager = ({ children, className, theme }: Props) => {
  let t: string;
  useEffect(() => {});
  if (theme) {
    t = theme.toLowerCase();
    t = t.replace(/\s/g, ""); //removes spaces
    t = "bg_" + t;
  } else {
    t = "bg_";
  }
  //removes previous theme and adds new one
  const classes = document.body.className
    .split(" ")
    .filter((c) => !c.startsWith("bg_"));
  classes.push(t);
  document.body.className = classes.join(" ").trim();

  return <div className={className}>{children}</div>;
};

export default BodyThemeManager;
