import { useState } from "react"
import ItemList from "../components/ItemList"
import ItemForm from "../components/ItemForm"
import { gql, useMutation } from "@apollo/client"

const DELETE_ITEM = gql`
  mutation DeleteItem($id: String!) {
    deleteItem(id: $id)
  }
`

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [deleteItem] = useMutation(DELETE_ITEM)

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setIsFormVisible(true)
  }

  const handleDelete = async (id: string) => {
    await deleteItem({ variables: { id } })
  }

  const handleFormComplete = () => {
    setSelectedItem(null)
    setIsFormVisible(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CRUD Application</h1>
      {isFormVisible ? (
        <ItemForm item={selectedItem} onComplete={handleFormComplete} />
      ) : (
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-500 text-white px-4 py-2 mb-4"
        >
          Add New Item
        </button>
      )}
      <ItemList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
