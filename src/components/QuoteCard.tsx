"use client";

import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io();

export default function QuoteCard() {
  const [quote, setQuote] = useState("Carpe Diem - Aprovecha el día.");

  const [mensajes, setMensajes] = useState<string[]>([
    "Carpe Diem - Aprovecha el día.",
    "Just do it - Hazlo, sin pensarlo demasiado.",
    "No esperes el momento perfecto, haz que sea perfecto.",
    "El momento es ahora.",
    "Hazlo con miedo, pero hazlo.",
    "Cada día cuenta.",
    "Sueña en grande, actúa en grande.",
    "Be free",
    "No te compares con nadie, cada quien tiene su propio camino.",
    "La vida es corta, haz que cada día cuente."
  ])

  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("mensaje", (msg: string) => {
      setMensajes((prevMensajes) => [...(prevMensajes || []), msg]);
      setQuote(msg);
    });    

    if (localStorage.getItem("quotes")) {
      console.log(localStorage.getItem("quotes"))
      const storedQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");      
      setMensajes(storedQuotes);
    }

    return () => {
      socket.off("mensaje");
    };
  }, []);

  useEffect(() => {    
      localStorage.setItem("quotes", JSON.stringify([...mensajes]));
  }, [mensajes]);

  const handleOnChange = (e: any) => {
    setMessage(e.target.value)    
  };

  const sendMessage = () => {
    socket.emit("mensaje", message);
    setQuote(message); 
    setMessage("");
  }

  const getRandomQuote = () => {
    const random = Math.floor(Math.random() * mensajes.length);
    setQuote(mensajes[random]);
  };

  return (
    <div className="absolute w-[100vw] z-[1] min-h-screen bg-[url('https://epicart.com/cdn/shop/files/ACR-17448-1212.jpg?v=1686103098&width=1946')] bg-cover bg-center">
        <div className="absolute min-h-screen inset-0 bg-purple-950 mix-blend-multiply z-[-1] bg-cover bg-center"  />

        <div className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center px-4">

            <div className="bg-black/10 p-8 rounded-xl shadow-2xl text-center w-full h-[30vh] max-w-md mb-10">
                <h1 className="text-3xl font-bold mb-6 text-white"></h1>
                <p className="text-xl italic mb-8 text-white"></p>
            </div>

            <div className="bg-black/60 p-8 rounded-xl shadow-2xl text-center w-full max-w-md mb-10">
                <h1 className="text-3xl font-bold mb-6 text-white">Carpe Diem ✨</h1>
                <p className="text-xl italic mb-8 text-white">"{quote}"</p>
                <button
                onClick={getRandomQuote}
                className="h-[10vh] w-full rounded-lg bg-purple-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
                >
                Just Do It
                </button>
            </div>

            

            <footer className="w-full max-w-md p-4 bg-white rounded-lg shadow text-center">
                <hr className="my-4 border-gray-300" />
                <span className="block text-sm text-gray-500">© 2025 <a href="https://flowbite.com" target="_blank" className="hover:underline">SPARK™</a>. All Rights Reserved.</span>
                <span className="block text-sm text-gray-500">By Fernando Guerra</span>
            </footer>
        </div>
    </div>
  );
}
