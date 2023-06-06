import Navbar from "@/components/Navbar"
import Card from "@/components/Card"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
        <Navbar />
        <section className="bg-black py-10 justify-items-center grid grid-cols-3 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
        <Footer />
    </main>
  )
}
