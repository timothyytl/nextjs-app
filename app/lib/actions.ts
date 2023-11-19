"use server"

import { z } from "zod"
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { signIn } from "@/auth"

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than MYR 0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
})

const CustomerSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please enter a name.",
  }),
  email: z.string({
    invalid_type_error: "Please enter a name.",
  }),
  number: z.number({
    invalid_type_error: "Please enter a phone number.",
  }),
})

// Create invoice
const CreateInvoice = FormSchema.omit({ id: true, date: true })
export type State = {
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
  message?: string | null
}

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    }
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100
  const date = new Date().toISOString().split("T")[0]

  // Insert data into the database
  try {
    await sql`
       INSERT INTO invoices (customer_id, amount, status, date)
       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
     `
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/invoices")
  redirect("/dashboard/invoices")
}

// Update Invoice
const UpdateInvoice = FormSchema.omit({ id: true, date: true })

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    }
  }

  const { customerId, amount, status } = validatedFields.data
  const amountInCents = amount * 100

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." }
  }

  revalidatePath("/dashboard/invoices")
  redirect("/dashboard/invoices")
}

// Delete invoice
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`
    revalidatePath("/dashboard/invoices")
    return { message: "Deleted Invoice." }
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Invoice",
    }
  }
}

// Authentication
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData))
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin"
    }
    throw error
  }
}

// Add New Customer
const NewCustomer = CustomerSchema.omit({ id: true, date: true })
export type Data = {
  errors?: {
    customerId?: string[]
    email?: string[]
    number?: number[]
  }
  message?: string | null
}

export async function addCustomer(prevState: State, formData: FormData) {
  const validatedCustomerFields = NewCustomer.safeParse({
    customerId: formData.get("customerId"),
    email: formData.get("email"),
    number: formData.get("number"),
  })

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedCustomerFields.success) {
    return {
      errors: validatedCustomerFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Add Customer.",
    }
  }

  // Prepare data for insertion into the database
  const { customerId, email, number } = validatedCustomerFields.data

  // Insert data into the database
  try {
    await sql`
       INSERT INTO customers (customer_id, email, number)
       VALUES (${customerId}, ${email}, ${number})
     `
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Add Customer.",
    }
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/contacts")
  redirect("/dashboard/contacts")
}
