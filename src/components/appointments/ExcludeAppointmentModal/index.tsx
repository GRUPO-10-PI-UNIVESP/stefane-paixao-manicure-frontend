"use appointment";
import { useDeleteAppointment } from "@/core/services/appointments/hooks";
import { Button, Modal, Text } from "@stick-ui/lib";

interface ExcludeAppointmentModalProps {
  isOpen: boolean;
  id: number;
  onClose: () => void;
}
export const ExcludeAppointmentModal = ({
  isOpen,
  id,
  onClose,
}: ExcludeAppointmentModalProps) => {
  const removeAppointmentMutation = useDeleteAppointment();

  function handleRemove() {
    removeAppointmentMutation.mutateAsync(id);
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
            label="Excluir Usuário"
            grow
            onClick={() => handleRemove()}
          />
        </div>
      </div>
    </Modal>
  );
};
