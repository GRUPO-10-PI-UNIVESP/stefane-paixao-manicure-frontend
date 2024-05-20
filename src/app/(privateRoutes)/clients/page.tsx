import { PageContainer } from "@/components/common/PageContainer";
import { useGetAllClients } from "@/core/services/clients/hooks";
import { ActionIcon, Button, Table } from "@stick-ui/lib";
import React from "react";

const Clients = () => {
  const clients = useGetAllClients();

  return (
    <PageContainer
      title={"Clientes"}
      subtitle={"Gerencie todos os seus clientes"}
      actionButton={
        <Button
          size="sm"
          iconProps={{ iconName: "add", iconPosition: "left" }}
          label="Novo Cliente"
        />
      }
    >
      {clients?.data?.map((i) => i.nomeCliente)}
    </PageContainer>
  );
};

export default Clients;
