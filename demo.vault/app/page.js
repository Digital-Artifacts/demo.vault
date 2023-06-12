'use client';

import Navbar from "@/components/Navbar"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import { useAccount } from "wagmi"

export default function Home() {
  const { address } = useAccount();

  return (
    <main>
        <Navbar />
        <section className="py-10 justify-items-center grid grid-cols-3 gap-10">
          <Card address={address} />
          <Card address={address} />
          <Card address={address} />
          <Card address={address} />
          <Card address={address} />
          <Card address={address} />
        </section>
        <Footer />
    </main>
  )
}
