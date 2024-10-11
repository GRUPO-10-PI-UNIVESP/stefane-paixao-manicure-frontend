"use service";
import { useDeleteService } from "@/core/services/services/hooks";
import { Button, Modal, Text } from "@istic-ui/react";

interface ExcludeServiceModalProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}
export const ExcludeServiceModal = ({
  isOpen,
  id,
  onClose,
}: ExcludeServiceModalProps) => {
  const removeServiceMutation = useDeleteService();

  function handleRemove() {
    removeServiceMutation.mutateAsync(id);
    onClose();
  }

  return (
    <Modal
      contentWidth={400}
      title="Excluir Serviço"
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <div className="flex flex-col w-full gap-6">
        <div>
          <Text size="sm">
            Você tem certeza que gostaria de excluir esse serviço? Todos os
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
            label="Excluir Serviço"
            grow
            onClick={() => handleRemove()}
          />
        </div>
      </div>
    </Modal>
  );
};
