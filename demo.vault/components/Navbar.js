import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Navbar() {
    return (
        <nav className="flex justify-end bg-white m-8">
            <ConnectButton />
        </nav>
    )
}