import { fetchCustomers } from "@/app/lib/data"
import Form from "@/app/ui/contacts/add-customer-form"

export default async function Page() {
  const customers = await fetchCustomers()
  return (
    <main>
      <Form customers={customers} />
    </main>
  )
}
