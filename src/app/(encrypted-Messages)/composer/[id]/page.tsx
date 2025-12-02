import CommonComposer from "@/app/common/CommonComposer";
import { MessagesTable } from "@/db/schema";
import { db } from "@/index";
import { Decryption } from "@/lib/encryption";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Terminal } from "lucide-react";

const DecryptedComposer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  try {
    const row = await db
      .select()
      .from(MessagesTable)
      .where(eq(MessagesTable.link, id));
    const Message = row[0].message;
    if (!Message) {
      notFound();
    }

    const DecryptedMessage = Decryption(Message);

    return (
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
            Decrypt{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-[#00f3ff]">
              Message
            </span>
          </h2>
        </div>
        <CommonComposer>{DecryptedMessage}</CommonComposer>
      </div>
    );
  } catch (err) {
    console.log(err);
    return <div></div>;
  }
};

export default DecryptedComposer;
