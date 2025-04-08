"use employee";
import { useDeleteEmployee } from "@/core/services/employees/hooks";
import { Button, Modal, Text } from "@istic-ui/react";

interface ExcludeEmployeeModalProps {
  isOpen: boolean;
  id?: number;
  onClose: () => void;
}
export const ExcludeEmployeeModal = ({
  isOpen,
  id,
  onClose,
}: ExcludeEmployeeModalProps) => {
  const removeEmployeeMutation = useDeleteEmployee();

  function handleRemove() {
    if (!id) return;
    removeEmployeeMutation.mutateAsync(id);
    onClose();
  }

  return (
    <Modal
      contentWidth={400}
      title="Excluir Usuário"
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <div className="flex flex-col w-full gap-6">
        <div>
          <Text size="sm">
            Você tem certeza que gostaria de excluir esse employee? Todos os
            dados serão perdidos
          </Text>
        </div>
        <div className="w-full gap-2 flex flex-row ">
          <Button
            variant="outline"
            size="xs"
            label="Cancelar"
            grow
            onClick={() => onClose()}
          />
          <Button
            isLoading={removeEmployeeMutation.isLoading}
            size="xs"
            label="Excluir Usuário"
            grow
            onClick={() => handleRemove()}
          />
        </div>
      </div>
    </Modal>
  );
};
