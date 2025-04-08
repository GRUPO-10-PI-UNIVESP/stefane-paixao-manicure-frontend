"use client";
import React from "react";
import { Button, Text } from "@istic-ui/react";
import { PageContainer } from "@/components/_common/PageContainer";

const Dashboard = () => {
  return (
    <>
      <PageContainer
        actionButton={
          <Button
            size="sm"
            iconProps={{ iconName: "add", iconPosition: "left" }}
            label="Novo Funcionário"
          />
        }
        title={"Dashboard"}
        subtitle={
          "Gerencie seus clientes, serviços e atendimentos de forma rápida e fácil."
        }
      >
        <div className="w-full h-[90dvh] flex items-center justify-center"></div>
      </PageContainer>
    </>
  );
};

export default Dashboard;
