import { useQuery, gql } from "@apollo/client"

const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
      price
      stock
    }
  }
`

type Props = {
  onEdit: (item: any) => void
  onDelete: (item: any) => void
}

export default function ItemList({ onEdit, onDelete }: Props) {
  const { data, loading, error } = useQuery(GET_ITEMS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Item List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Stock</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item: any) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">{item.stock}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
