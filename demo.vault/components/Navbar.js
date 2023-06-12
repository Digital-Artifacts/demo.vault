import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="flex justify-evenly items-center bg-white m-8">
            <h1 className="font-bold text-xl">DemoVault</h1>
            <Link className="font-bold text-xl" href='/'>
                Home
            </Link>
            <Link className="font-bold text-xl" href='/upload'>
                Upload
            </Link>
            <ConnectButton />
        </nav>
    )
}