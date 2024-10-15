"use branch";
import { useDeleteBranch } from "@/core/services/branches/hooks";
import { Button, Modal, Text } from "@istic-ui/react";

interface ExcludeBranchModalProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}
export const ExcludeBranchModal = ({
  isOpen,
  id,
  onClose,
}: ExcludeBranchModalProps) => {
  const removeBranchMutation = useDeleteBranch();

  function handleRemove() {
    removeBranchMutation.mutateAsync(id);
    onClose();
  }

  return (
    <Modal
      contentWidth={400}
      title="Excluir Filial"
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <div className="flex flex-col w-full gap-6">
        <div>
          <Text size="sm">
            Você tem certeza que gostaria de excluir essa filial? Todos os dados
            serão perdidos
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
            isLoading={removeBranchMutation.isLoading}
            size="xs"
            label="Excluir Filial"
            grow
            onClick={() => handleRemove()}
          />
        </div>
      </div>
    </Modal>
  );
};
