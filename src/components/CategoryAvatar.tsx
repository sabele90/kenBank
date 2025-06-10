import Avatar from "@chakra-ui/react/dist/components/avatar";
import type { ComponentProps, ReactElement } from "react";
import { categories } from "../constants/categories";

type CategoryAvatarProps = {
  concept: string;
  size?: ComponentProps<typeof Avatar>["size"];
};

const CategoryAvatar = ({ concept, size = "md" }: CategoryAvatarProps) => {
  const matchedCategory =
    categories.find((cat) =>
      cat.keywords.some((kw) =>
        concept.toLowerCase().includes(kw.toLowerCase())
      )
    ) ?? categories.find((cat) => cat.name === "Other");

  return (
    <Avatar
    size={size}
    icon={matchedCategory?.icon as ReactElement}
    bg={`${matchedCategory?.color || "gray"}.500`} // Usa "gray" como fallback
    color="white"
    borderRadius="md"
  />
  );
};

export default CategoryAvatar;
