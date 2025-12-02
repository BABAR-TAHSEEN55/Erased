"use client";

import CommonComposer from "@/app/common/CommonComposer";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { AlertTriangle, Cpu, Lock, Terminal } from "lucide-react";
import { useState } from "react";
type EncryptionType = "AES-256-GCM" | "ChaCha20-Poly1305" | "Rabbit-Legacy";
type ViewLimit = "1 (Burn)" | "5 Views" | "10 Views" | "Unlimited";
type Expiration = "1 Hour" | "24 Hours" | "7 Days" | "Never";
const InitialSettings = {
  encrytipn: "AES-256-GCM",
  views: "1 (Burn)",
  expiration: "1 Hour",
};
type dataType = {
  input: string;
  GENERATE_URL: string;
};

const MessageComposer = () => {
  const [message, setMessage] = useState("");
  const [Step, setStep] = useState<
    "input" | "configure" | "processing" | "result"
  >("input");
  const [setttings, setSettings] = useState(InitialSettings);
  const [data, setData] = useState<{ GENERATE_URL: string }>();

  const SendInput = async () => {
    await axios.post("/api/message", { input: message }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  return (
    <div className="">
      <div className="max-w-5xl mx-auto mt-8 md:mt-15 px-6 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded bg-white/5 border border-white/10">
            <Terminal size={14} className="text-neon-green" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
              Secure Payload Composer
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Encrypt{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-[#00f3ff]">
              Message
            </span>
          </h2>
        </div>

        <CommonComposer
          status={
            Step === "input"
              ? "Awaiting Input"
              : Step === "processing"
                ? "Encrypting..."
                : "Secure Link Ready"
          }
          statusColor={
            Step === "input"
              ? "yellow"
              : Step === "processing"
                ? "blue"
                : "green"
          }
        >
          {Step === "input" && (
            <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
              <textarea
                // ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your top-secret payload here..."
                className="flex-1 bg-transparent border-none outline-none text-white/90 font-mono text-sm md:text-base resize-none placeholder:text-white/20 h-64 focus:ring-0"
                spellCheck={false}
              />
              <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-6">
                <span className="text-xs md:text-lg font-mono text-white/30 flex items-center gap-2">
                  <Cpu
                    size={14}
                    className="md:size-[35px] hover:text-emerald-400"
                  />
                  {message.length} CHARS
                </span>
                <Button
                  onClick={async () => {
                    await SendInput();
                    setStep("result");
                  }}
                  disabled={!message.trim()}
                  variant="secondary"
                >
                  Configure Encryption
                </Button>
              </div>
            </div>
          )}
          {Step === "result" && (
            <div className="flex flex-col items-center justify-center h-full gap-8 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center border border-neon-green/50 shadow-[0_0_30px_rgba(0,255,65,0.3)]">
                <Lock className="w-10 h-10 text-neon-green" />
              </div>

              <div className="text-center">
                <h3 className="text-2xl text-white font-bold uppercase tracking-tight mb-2">
                  Payload Secured
                </h3>
                <p className="text-white/50 text-sm max-w-sm mx-auto">
                  This link allows access to your encrypted message. It will
                  destroy itself after{" "}
                  {/*{settings.views === "1 (Burn)" ? "1 view" : settings.views}.*/}
                </p>
              </div>

              <div className="w-full max-w-lg relative">
                <input
                  readOnly
                  value={`http://localhost:3000/composer/${data?.GENERATE_URL}`}
                  className="w-full bg-black border border-white/20 text-neon-green font-mono text-sm py-4 px-6 rounded focus:outline-none focus:border-neon-green transition-colors"
                />
                {/*<button
                    onClick={handleCopy}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    {copied ? (
                      <Check size={18} className="text-neon-green" />
                    ) : (
                      <Copy size={18} className="text-white/70" />
                    )}
                  </button>*/}
              </div>

              <div className="flex gap-4">
                <Button variant="secondary">Encrypt Another</Button>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-amber-500/80 font-mono bg-amber-500/10 px-3 py-2 rounded border border-amber-500/20">
                <AlertTriangle size={12} />
                WARNING: WE CANNOT RECOVER THIS MESSAGE IF THE LINK IS LOST.
              </div>
            </div>
          )}
        </CommonComposer>
      </div>
    </div>
  );
};

export default MessageComposer;
