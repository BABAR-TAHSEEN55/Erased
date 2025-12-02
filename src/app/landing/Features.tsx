import React from "react";
import { EyeOff, Share2, Key, Skull, FileJson, Network } from "lucide-react";

// Interfaces
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "cyan" | "purple" | "green";
  codeSnippet?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "cyan" | "purple" | "green";
  codeSnippet: string;
}

// Components
const FeatureCard = ({
  title,
  description,
  icon,
  color,
  codeSnippet,
}: FeatureCardProps) => {
  const colorClasses = {
    cyan: "group-hover:border-neon-cyan group-hover:shadow-[0_0_30px_-5px_rgba(0,243,255,0.2)] text-neon-cyan",
    purple:
      "group-hover:border-neon-purple group-hover:shadow-[0_0_30px_-5px_rgba(176,38,255,0.2)] text-neon-purple",
    green:
      "group-hover:border-neon-green group-hover:shadow-[0_0_30px_-5px_rgba(0,255,65,0.2)] text-neon-green",
  };

  return (
    <div
      className={`group relative p-8 bg-void border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-3 ${colorClasses[color].split(" ").slice(0, 2).join(" ")}`}
    >
      {/* Hover Gradient Overlay */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
          color === "cyan"
            ? "bg-cyan-400"
            : color === "purple"
              ? "bg-fuchsia-500"
              : "bg-lime-400"
        }`}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div
            className={`w-14 h-14 flex items-center justify-center rounded bg-white/5 border border-white/5 ${colorClasses[color].split(" ").slice(2).join(" ")}`}
          >
            {icon}
          </div>
          <div className="font-mono text-[10px] text-white/20 group-hover:text-white/40 transition-colors">
            SYS_ID_01
          </div>
        </div>

        <h3 className="text-xl font-bold font-mono uppercase tracking-tight mb-4 text-white group-hover:text-white transition-colors">
          {title}
        </h3>

        <p className="text-neutral-400 leading-relaxed mb-6 text-sm font-light">
          {description}
        </p>

        {codeSnippet && (
          <div className="mt-auto pt-4 border-t border-dashed border-white/10">
            <code className="text-[10px] text-neutral-500 font-mono block bg-black/50 p-2 rounded border-l-2 border-white/20 group-hover:border-neon-green transition-colors">
              {codeSnippet}
            </code>
          </div>
        )}
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <div className="w-2 h-2 border border-white rounded-full"></div>
      </div>
    </div>
  );
};

const Features = () => {
  const features: Feature[] = [
    {
      title: "Vanish Mode",
      description:
        "Create self-destructing notes. Once read, they are cryptographically burned from the network forever.",
      icon: <EyeOff strokeWidth={1.5} />,
      color: "purple",
      codeSnippet: "burn_after_read: true",
    },
    {
      title: "P2P Wormholes",
      description:
        "Establish direct WebRTC tunnels for large file transfers. No intermediate servers. No file size limits.",
      icon: <Network strokeWidth={1.5} />,
      color: "green" as const,
      codeSnippet: "tunnel_protocol: 'webrtc_v2'",
    },
    {
      title: "Client-Side Encryption",
      description:
        "Your data is encrypted in your browser before it ever touches the network. We can't see your secrets.",
      icon: <Key strokeWidth={1.5} />,
      color: "cyan" as const,
      codeSnippet: "cipher: 'AES-GCM-256'",
    },
    {
      title: "Dead Man's Switch",
      description:
        "Set a timer. If you don't check in, your encrypted vault is automatically published or destroyed.",
      icon: <Skull strokeWidth={1.5} />,
      color: "purple" as const,
      codeSnippet: "check_in_interval: '72h'",
    },
    {
      title: "Ephemeral Links",
      description:
        "Share one-time access links. The key is in the URL hash and never sent to our servers.",
      icon: <Share2 strokeWidth={1.5} />,
      color: "green" as const,
      codeSnippet: "link_entropy: 'high'",
    },
    {
      title: "Steganography",
      description:
        "Hide your encrypted text inside innocent-looking images. Security through obscurity + cryptography.",
      icon: <FileJson strokeWidth={1.5} />,
      color: "cyan" as const,
      codeSnippet: "embed_mode: 'LSB_insert'",
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-void-lighter">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
            <span className="text-neon-green">System</span> Capabilities
          </h2>
          <div className="w-28 h-2 bg-[#b026ff] mb-6"></div>
          <p className="text-neutral-400 text-lg max-w-2xl">
            A suite of tools designed for the paranoid, the privacy-conscious,
            and the digital ghosts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
