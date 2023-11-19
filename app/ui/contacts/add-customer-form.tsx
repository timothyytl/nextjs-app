"use client"

import { CustomerField } from "@/app/lib/definitions"
import Link from "next/link"
import {
  EnvelopeIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import { Button } from "@/app/ui/button"
import { addCustomer } from "@/app/lib/actions"
import { useFormState } from "react-dom"
import { useState } from "react"
import { useEdgeStore } from "@/app/lib/edgestore"

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(addCustomer, initialState)
  const [file, setFile] = useState<File>()
  const { edgestore } = useEdgeStore()

  return (
    <form action={dispatch} className="w-2/3 m-auto mt-4">
      <div className="rounded-md bg-gray-50 p-6 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Enter customer name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter customer email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Customer Number */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter customer phone number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="number"
                placeholder="Phone Number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Customer Image */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Upload customer image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative flex">
              <input
                id="image"
                name="image"
                type="file"
                onChange={(e) => {
                  setFile(e.target.files?.[0])
                }}
                className="w-full py-2"
              />

              <button
                className="flex h-10 items-center rounded-lg bg-[#7855FF] px-4 text-sm font-medium text-white transition-colors hover:bg-[#8A6EFF] aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                onClick={async () => {
                  if (file) {
                    const res = await edgestore.publicFiles.upload({
                      file,
                    })
                    // add codes to save data to database
                  }
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Customer</Button>
      </div>
    </form>
  )
}
