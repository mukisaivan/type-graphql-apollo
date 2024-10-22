import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react"
import { gql, useMutation } from "@apollo/client"

const ADD_ITEM = gql`
  mutation AddItem($data: ItemInput!) {
    addItem(data: $data) {
      id
      name
      price
      stock
    }
  }
`

const UPDATE_ITEM = gql`
  mutation UpdateItem($id: String!, $data: ItemInput!) {
    updateItem(id: $id, data: $data) {
      id
      name
      price
      stock
    }
  }
`

type Props = {
  item: any
  onComplete: () => void
}

export default function ItemForm({ item, onComplete }: Props) {
  const [name, setName] = useState(item ? item.name : "")
  const [price, setPrice] = useState(item ? item.price : 0)
  const [stock, setStock] = useState(item ? item.stock : 0)

  const [addItem] = useMutation(ADD_ITEM)
  const [updateItem] = useMutation(UPDATE_ITEM)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (item) {
      await updateItem({
        variables: { id: item.id, data: { name, price, stock } },
      })
    } else {
      await addItem({ variables: { data: { name, price, stock } } })
    }
    onComplete()
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full p-2 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          className="w-full p-2 border"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Stock</label>
        <input
          type="number"
          className="w-full p-2 border"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        {item ? "Update Item" : "Add Item"}
      </button>
    </form>
  )
}
