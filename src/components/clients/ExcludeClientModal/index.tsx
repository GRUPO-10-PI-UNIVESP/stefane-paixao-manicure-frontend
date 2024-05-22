"use client";
import { useDeleteClient } from "@/core/services/clients/hooks";
import { Button, Modal, Text } from "@stick-ui/lib";

interface ExcludeClientModalProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}
export const ExcludeClientModal = ({
  isOpen,
  id,
  onClose,
}: ExcludeClientModalProps) => {
  const removeClientMutation = useDeleteClient();

  function handleRemove() {
    removeClientMutation.mutateAsync(id);
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
            Você tem certeza que gostaria de excluir esse cliente? Todos os
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
