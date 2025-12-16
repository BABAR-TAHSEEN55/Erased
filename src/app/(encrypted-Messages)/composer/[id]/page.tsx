import CommonComposer from "@/app/common/CommonComposer";
import { MessagesTable } from "@/db/schema";
import { db } from "@/index";
import { Decryption } from "@/lib/encryption";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Terminal, AlertTriangle } from "lucide-react";

const DecryptedComposer = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const now = new Date();
  const NotFoundRecord = false;

  try {
    // Fetch the message
    const row = await db
      .select()
      .from(MessagesTable)
      .where(eq(MessagesTable.link, id));

    console.log(`Database query result:`, {
      foundRecords: row.length,
      record: row[0] || "No record found",
    });

    if (row.length === 0 || !row[0].message) {
      console.log(" Message not found in database");
      // notFound();
      // NotFoundRecord = true;
      return <ExpiredMessage />;
    }

    const messageRecord = row[0];
    const Message = messageRecord.message;
    // Check expiration
    if (messageRecord.expiresAt && messageRecord.expiresAt <= now) {
      await deleteMessage(id);
      return <ExpiredMessage />;
    } else if (messageRecord.expiresAt) {
      console.log(
        `Time remaining: ${messageRecord.expiresAt.getTime() - now.getTime()} `,
      );
    } else {
      console.log("EXPIRATION CHECK: Message never expires");
    }

    // Check view limit
    const currentViews = messageRecord.currentViews || 0;
    const maxViews = messageRecord.maxViews;

    // console.log(" VIEW LIMIT CHECK:", {
    //   currentViews,
    //   maxViews,
    //   isUnlimited: maxViews === -1,
    //   hasExceededLimit: maxViews !== -1 && currentViews >= maxViews!,
    // });

    if (maxViews !== -1 && currentViews >= maxViews!) {
      console.log(" VIEW LIMIT EXCEEDED: Deleting message...");
      await deleteMessage(id);
      return <ViewLimitExceeded />;
    }
    if (NotFoundRecord) {
    }

    // Decrypt the message

    const DecryptedMessage = Decryption(Message);

    // Update view count
    const newViewCount = currentViews + 1;
    console.log(` Updating view count: ${currentViews} → ${newViewCount}`);

    await db
      .update(MessagesTable)
      .set({ currentViews: newViewCount })
      .where(eq(MessagesTable.link, id));

    console.log(" View count updated successfully");

    // Check if this was the last view
    const isLastView = maxViews !== -1 && newViewCount >= maxViews!;
    if (isLastView) {
      console.log(" BURN AFTER READING: This was the last view, deleting...");
      await deleteMessage(id);
    }

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

        <CommonComposer>
          <div className="p-6">
            <div className="font-mono text-white whitespace-pre-wrap break-words">
              {DecryptedMessage}
            </div>

            {isLastView && (
              <div className="mt-8 flex items-center gap-2 text-xs text-amber-500/80 font-mono bg-amber-500/10 px-3 py-2 rounded border border-amber-500/20">
                <AlertTriangle size={12} />
                This message will be permanently deleted after this view.
              </div>
              // <ExpiredMessage />
            )}
          </div>
        </CommonComposer>
      </div>
    );
  } catch (err) {
    console.log(" Error in DecryptedComposer:", err);
    notFound();
  }
};

// Helper function to delete a message
const deleteMessage = async (link: string) => {
  try {
    const result = await db
      .delete(MessagesTable)
      .where(eq(MessagesTable.link, link));
    console.log(" Message deleted successfully:", result);
  } catch (err) {
    console.log(` Error while deleting message: ${err}`);
    throw err;
  }
};

// Component for expired messages
const ExpiredMessage = () => (
  <div className="max-w-5xl mx-auto mt-8 md:mt-15 px-6 relative z-10">
    <div className="mb-10 text-center">
      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded bg-white/5 border border-white/10">
        <Terminal size={14} className="text-red-500" />
        <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
          Message Expired
        </span>
      </div>
    </div>
    <CommonComposer>
      <div className="text-center p-12">
        <div className="text-red-500 text-xl mb-4"> Message Expired</div>
        <div className="text-white/60">
          This message has expired and been permanently deleted.
        </div>
      </div>
    </CommonComposer>
  </div>
);

// Component for view limit exceeded
const ViewLimitExceeded = () => (
  <div className="max-w-5xl mx-auto mt-8 md:mt-15 px-6 relative z-10">
    <div className="mb-10 text-center">
      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded bg-white/5 border border-white/10">
        <Terminal size={14} className="text-red-500" />
        <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
          View Limit Exceeded
        </span>
      </div>
    </div>
    <CommonComposer>
      <div className="text-center p-12">
        <div className="text-red-500 text-xl mb-4">👁️ View Limit Exceeded</div>
        <div className="text-white/60">
          This message has exceeded its view limit and been permanently deleted.
        </div>
      </div>
    </CommonComposer>
  </div>
);

export default DecryptedComposer;
