"use client";
import CommonComposer from "@/app/common/CommonComposer";
import MessageConfirmationModal from "@/app/landing/Confirmation";

import { NewDecryption } from "@/lib/encryptionClient";
import axios from "axios";
import { Terminal, AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ExpectedResponse = {
  encrypted: string;
  iv: string;
  isLastView: boolean;
};

const DecryptedComposer = () => {
  const { id } = useParams<{ id: string }>();
  const [urlFragment, setUrlFragment] = useState<string>("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [messageData, setMessageData] = useState<ExpectedResponse | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fragment = window.location.hash.slice(1);
      setUrlFragment(fragment);
    }
  }, []);

  useEffect(() => {
    if (urlFragment && id) {
      // Show modal when both URL fragment and ID are available
      setShowModal(true);
    }
  }, [id, urlFragment]);

  const handleViewMessage = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get<ExpectedResponse>(`/api/message/${id}`);
      setMessageData(response.data);

      const { encrypted, iv } = response.data;

      // Decrypt message
      const decrypted = await NewDecryption(encrypted, iv, urlFragment);
      setDecryptedMessage(decrypted);
      setShowModal(false);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to decrypt message",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Navigate back or close
    window.history.back();
  };

  if (!urlFragment && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/60">Loading encryption key...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-8 md:mt-15 px-6 relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded bg-white/5 border border-white/10">
            <Terminal size={14} className="text-neon-red" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
              Decryption Error
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Access{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2626] to-[#ff6666]">
              Denied
            </span>
          </h2>
        </div>
        <CommonComposer>
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertTriangle className="w-16 h-16 text-neon-red mb-4" />
            <p className="text-white/70 mb-4">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
            >
              Go Back
            </button>
          </div>
        </CommonComposer>
      </div>
    );
  }

  return (
    <>
      <MessageConfirmationModal
        isOpen={showModal}
        onConfirm={handleViewMessage}
        onCancel={handleCancel}
        isProcessing={isLoading}
      />

      {decryptedMessage && (
        <div className="max-w-5xl mx-auto mt-8 md:mt-15 px-6 relative z-10">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded bg-white/5 border border-white/10">
              <Terminal size={14} className="text-neon-green" />
              <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                Secure Payload Decrypted
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Secret{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-[#00f3ff]">
                Message
              </span>
            </h2>
          </div>

          <CommonComposer>
            <div className="p-6">
              <div className="font-mono text-white whitespace-pre-wrap break-words">
                {decryptedMessage}
              </div>

              {messageData?.isLastView && (
                <div className="mt-8 flex items-center gap-2 text-xs text-amber-500/80 font-mono bg-amber-500/10 px-3 py-2 rounded border border-amber-500/20">
                  <AlertTriangle size={12} />
                  This message has been permanently deleted after viewing.
                </div>
              )}
            </div>
          </CommonComposer>
        </div>
      )}
    </>
  );
};

export default DecryptedComposer;
