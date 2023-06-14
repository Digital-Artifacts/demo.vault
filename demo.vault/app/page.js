'use client';

import Navbar from "@/components/Navbar"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import { useAccount } from "wagmi"
import { useEffect } from "react";
import demos from '../mock/demos';
const axios = require('axios');

export default function Home() {
  const { address } = useAccount();


  // useEffect(() => {
  //   const url = `https://livepeer.studio/api/webhook/${process.env.NEXT_PUBLIC_API_KEY}`;
  //   const data = {};
    
  //   axios(url, data, {
  //     method: 'GET',
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': '*',
  //       'Access-Control-Allow-Credentials': true,
  //       'Content-Type': 'application/json',
  //     },
  //     withCredentials: true,
  //     credentials: 'same-origin',
  //     auth: {
  //       'Authorization' : `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
  //     }
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // })

  console.log(demos)

  return (
    <main>
        <Navbar />
        <section className="py-10 justify-items-center grid grid-cols-3 gap-10">
          <Card address={address} demos={demos[0]} />
          <Card address={address} demos={demos[1]} />
          <Card address={address} demos={demos[0]} />
          <Card address={address} demos={demos[1]} />
          <Card address={address} demos={demos[0]} />
          <Card address={address} demos={demos[1]} />
        </section>
        <Footer />
    </main>
  )
}
