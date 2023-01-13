import {useRouter} from "next/router";
import Navbar from "../../components/Navbar";


export default function Book() {
  const router = useRouter()
  const { title, book: rawBook } = router.query
  const book = JSON.parse(rawBook as string)

  return (
    <div>
      <Navbar />
      <div className="mx-32 mt-24">
        <p className="font-mono text-3xl font-bold mb-2">{title}</p>
        <p className="font-mono text-sm">By {book.authors.join(', ')}</p>
      </div>
    </div>
  )
}