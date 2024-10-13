import { SquareCheckBig } from "lucide-react"

const Success = () => {
  return (
    <div className="grid place-items-center">
        <SquareCheckBig className="mt-4 text-green-700" size={40} />
        <h1 className="text-3xl font-bold my-4">Achievment Unlocked :  <p className="w-full text-center"> Feedback Master! </p></h1>
        <div className="flex justify-center items-center p-4">
            <img className="object-cover" src="./meme.webp" alt="office meme handshake" />
        </div>
    </div>
  )
}

export default Success