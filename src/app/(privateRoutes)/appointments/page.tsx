import { PageContainer } from "@/components/common/PageContainer";
import { Button, Table } from "@stick-ui/lib";
import React from "react";

const Appointments = () => {
  const appointments = [];

  return (
    <PageContainer
      title={"Atendimentos"}
      subtitle={"Gerencie todos os seus atendimentos"}
      actionButton={
        <Button
          size="sm"
          iconProps={{ iconName: "add", iconPosition: "left" }}
          label="Novo Atendimento"
        />
      }
    >
      <div className="bg-white p-4">
        {appointments?.map((day) => (
          <div key={day.date} className="mb-8">
            <h3 className="text-lg font-semibold text-brand500 mb-2">
              {day.date}
            </h3>
            <Table
              columns={[]}
              data={[]}
              emptyValues={{
                title: "Não há atendimentos marcados",
                subTitle:
                  "Clique no botão acima para agendar um novo atendimento",
              }}
            />
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Appointments;
