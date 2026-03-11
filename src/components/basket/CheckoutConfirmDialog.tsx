import { AlertDialog, Button, Flex } from "@radix-ui/themes";

type CheckoutConfirmDialogProps = {
  totalAmount: number;
  onConfirm: () => void;
};

const CheckoutConfirmDialog = ({ totalAmount, onConfirm }: CheckoutConfirmDialogProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="solid">Commander</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="400px">
        <AlertDialog.Title>Confirmer la commande</AlertDialog.Title>
        <AlertDialog.Description>
          Voulez-vous confirmer votre commande d'un montant de {totalAmount} € ?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">Annuler</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" onClick={onConfirm}>Confirmer</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CheckoutConfirmDialog;