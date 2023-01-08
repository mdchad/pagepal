import {useRouter} from "next/router";
import Navbar from "../../components/Navbar";


export default function Book() {
  const router = useRouter()
  const { title } = router.query
  console.log(title)

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 mx-20 mt-24">
        <p className="font-mono text-3xl font-bold">{title}</p>
      </div>
    </div>
  )
}