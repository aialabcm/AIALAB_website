import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black-deep text-white overflow-hidden" id="footer">
      
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2500&auto=format&fit=crop" 
          alt="Creative Team" 
          fill
          sizes="100vw"
          className="object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/90 to-black-deep/60" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-20 relative z-10 py-24 lg:py-32">
        
        {/* Top Header Section */}
        <div className="text-center mb-24 md:mb-32">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-7xl tracking-tighter leading-none mb-8">
            Votre lab créatif, <br/> pour vos <span className="text-primary accent-italic">idées d'élite™</span>
          </h2>
          <Link href="/lancer-un-projet" className="inline-block px-8 sm:px-10 py-4 bg-primary text-black-deep font-heading font-bold text-xs tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-xl min-h-[48px] leading-[48px] text-center">
            Réserver un appel
          </Link>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 pt-20 border-t border-white/10">
          
          {/* Services */}
          <div className="space-y-8">
            <h4 className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase text-white/40">Expertises</h4>
            <ul className="space-y-4">
              {[
                { label: "Brand Strategy & Identity", href: "/#expertises" },
                { label: "Visual Content & Design", href: "/#expertises" },
                { label: "Print & Tangible Solutions", href: "/#expertises" },
                { label: "Web Development & Tech", href: "/#expertises" },
                { label: "Digital Growth & Marketing", href: "/#expertises" }
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="font-sans text-[13px] font-medium text-white/70 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div className="space-y-8">
            <h4 className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase text-white/40">Portfolio</h4>
            <ul className="space-y-4">
              {[
                { label: "Tous nos projets", href: "/work" },
                { label: "Showreel vidéo", href: "/work?showreel=true" },
                { label: "Études de cas", href: "/work#etudes-de-cas" }
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="font-sans text-[13px] font-medium text-white/70 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Le Lab */}
          <div className="space-y-8">
            <h4 className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase text-white/40">Le Lab</h4>
            <ul className="space-y-4">
              {[
                { label: "Notre Processus", href: "/#processus" },
                { label: "Témoignages", href: "/#temoignages" },
                { label: "FAQ", href: "/#faq" },
                { label: "À propos", href: "/about" }
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="font-sans text-[13px] font-medium text-white/70 hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="font-heading font-bold text-[10px] tracking-[0.2em] uppercase text-white/40">Contact</h4>
            <ul className="space-y-4">
              <li className="text-[13px] font-medium text-white/70 leading-relaxed">
                Douala / Yaoundé <br/>
                Vallée Nlongkak
              </li>
              <li className="text-[13px] font-medium text-white/70">
                <a href="mailto:contact@aialab.com" className="hover:text-primary transition-colors">
                  contact@aialab.com
                </a>
              </li>
              <li>
                <Link href="/lancer-un-projet" className="inline-flex items-center gap-2 font-heading font-bold text-[10px] tracking-widest uppercase text-primary">
                  Lancer un projet <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 sm:mt-24 pt-8 sm:pt-10 border-t border-white/10 flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center">
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <span className="font-heading font-black text-2xl tracking-tighter">AIA LAB</span>
            <span className="font-sans text-[10px] text-white/30 truncate">
              © {new Date().getFullYear()} AIA LAB. All rights reserved. Au-delà du possible.
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              {[
                { label: "Politique de confidentialité", href: "/en-cours?page=Politique de Confidentialité" },
                { label: "Conditions d'utilisation", href: "/en-cours?page=Conditions d'Utilisation" },
                { label: "Mentions légales", href: "/en-cours?page=Mentions Légales" },
                { label: "DMCA", href: "/en-cours?page=DMCA" }
              ].map(item => (
                <Link key={item.label} href={item.href} className="font-sans text-[10px] text-white/40 hover:text-white transition-colors whitespace-nowrap">
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              {[
                { name: "Linkedin", href: "https://linkedin.com", svg: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/> },
                { name: "Facebook", href: "https://facebook.com", svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
                { name: "Instagram", href: "https://instagram.com", svg: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                { name: "Youtube", href: "https://youtube.com", svg: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></> },
                { name: "Twitter", href: "https://x.com", svg: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/> }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black-deep hover:border-white transition-all">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-3.5 h-3.5"
                  >
                    {social.svg}
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

