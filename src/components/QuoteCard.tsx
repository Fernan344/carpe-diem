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

            {/*<div className="bg-black/60 p-8 rounded-xl shadow-2xl text-center w-full max-w-md mb-10">
                <h1 className="text-3xl font-bold mb-6 text-white">Crea un mensaje ✨</h1>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    className="h-[10vh] peer w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    value={message}
                    onChange={handleOnChange}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Escribe tu mensaje...
                  </label>
                </div>
                <button
                  onClick={sendMessage}
                  className="mt-[6vh] h-[10vh] w-full rounded-lg bg-sky-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
                >
                  Send
                </button>
            </div>*/}

            <footer className="w-full max-w-md p-4 bg-white rounded-lg shadow text-center">
                <hr className="my-4 border-gray-300" />
                <span className="block text-sm text-gray-500">© 2025 <a href="https://flowbite.com" target="_blank" className="hover:underline">SPARK™</a>. All Rights Reserved.</span>
                <span className="block text-sm text-gray-500">By Fernando Guerra</span>
            </footer>
        </div>
    </div>
  );
}
