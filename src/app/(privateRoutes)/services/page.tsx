"use client";
import { PageContainer } from "@/components/common/PageContainer";
import { useGetAllServices } from "@/core/services/services/hooks";
import { Button } from "@stick-ui/lib";
import React from "react";

const Services = () => {
  const services = useGetAllServices();
  return (
    <PageContainer
      title={"Serviços"}
      subtitle={"Gerencie todos os seus serviços"}
      actionButton={
        <Button
          size="sm"
          iconProps={{ iconName: "add", iconPosition: "left" }}
          label="Novo Serviço"
        />
      }
    >
      {services?.data?.map((i) => i.nomeServico)}
    </PageContainer>
  );
};

export default Services;
