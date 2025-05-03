import { Heading, Text } from "@istic-ui/react";
import { ReactNode } from "react";

export const PageContainer = ({
  title,
  subtitle,
  children,
  actionButton,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  actionButton?: ReactNode;
}) => {
  return (
    <div>
      <header className="flex justify-between items-center mb-4">
        <div>
          <Heading level="h3" weight="bold" color="text-brand-500">
            {title}
          </Heading>
          <Text>{subtitle}</Text>
        </div>
        {actionButton}
      </header>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};
