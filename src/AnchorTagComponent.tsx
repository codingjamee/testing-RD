import { memo } from "react";

const AnchorTagComponent = memo(function AnchorTagComponent({
  name,
  href,
  targetBlank,
}: {
  name: string;
  href: string;
  targetBlank?: boolean;
}) {
  return (
    <a
      href={href}
      target={targetBlank ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      {name}
    </a>
  );
});

export default AnchorTagComponent;
