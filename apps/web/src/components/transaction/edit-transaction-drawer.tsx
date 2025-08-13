import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import useEditTransactionDrawer from "@/hooks/use-edit-transaction-drawer"
import TransactionForm from "./transaction-form"

const EditTransactionDrawer = () => {
  const { open, transactionId, onCloseDrawer } = useEditTransactionDrawer()
  return (
    <Drawer
      open={open}
      onOpenChange={onCloseDrawer}
      direction="right">
      <DrawerContent className="max-w-md overflow-hidden overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="font-semibold text-xl">
            Edit Transaction
          </DrawerTitle>
          <DrawerDescription>
            Edit a transaction to track your finances
          </DrawerDescription>
        </DrawerHeader>
        <TransactionForm
          isEdit
          transactionId={transactionId}
          onCloseDrawer={onCloseDrawer}
        />
      </DrawerContent>
    </Drawer>
  )
}

export default EditTransactionDrawer
