"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2, Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

const projectTypes = [
  "Branding & Identité visuelle",
  "Web Design & Développement",
  "Design Graphique & Digital",
  "Marketing Digital",
  "Solutions Print",
  "Autre",
];

type FormStatus = "idle" | "loading" | "success" | "error";

const ease = [0.16, 1, 0.3, 1] as const;

export default function LancerProjetClient() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nouveau projet — ${formData.projectType}`,
          from_name: formData.name,
          email: formData.email,
          project_type: formData.projectType,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", projectType: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main 
        className="min-h-screen bg-bg-main pb-0 selection:bg-primary/20 selection:text-primary"
        style={{ paddingTop: "clamp(88px, 6vw + 40px, 150px)" }}
      >
        {/* ─── Main Contact Section ─── */}
        <section className="max-w-[1440px] mx-auto px-4 xs:px-6 md:px-12 pb-16 sm:pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">

            {/* ─── Left Column: Contact Info ─── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <h1 className="font-heading font-black text-black-deep tracking-tighter leading-[0.95] text-[2.25rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[80px]">
                Lancer un{" "}
                <span className="text-primary accent-italic block xs:inline">projet.</span>
              </h1>

              <p className="font-sans text-dark/60 text-[13px] xs:text-sm sm:text-base leading-relaxed mt-4 sm:mt-6 max-w-[48ch]">
                Prêt à concevoir l&apos;exceptionnel ? Remplissez le formulaire
                ou contactez-nous directement via nos canaux ci-dessous.
              </p>

              {/* Contact Details — stacked, editorial style */}
              <div className="mt-8 xs:mt-12 sm:mt-16 space-y-6 sm:space-y-8">

                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-dark/35 mb-1.5">
                      Email
                    </span>
                    <a
                      href="mailto:contact@aialab.com"
                      className="font-heading font-bold text-lg sm:text-xl text-black-deep hover:text-primary transition-colors duration-300"
                    >
                      contact@aialab.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-dark/35 mb-1.5">
                      Téléphone
                    </span>
                    <a
                      href="tel:+237690123456"
                      className="font-heading font-bold text-lg sm:text-xl text-black-deep hover:text-primary transition-colors duration-300"
                    >
                      +237 690 123 456
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-dark/35 mb-1.5">
                      Adresse
                    </span>
                    <p className="font-sans text-sm sm:text-base text-black-deep leading-relaxed">
                      Vallée Nlongkak, Yaoundé<br />
                      Douala, Cameroun
                    </p>
                  </div>
                </div>

                {/* Follow Us */}
                <div>
                  <span className="block text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-dark/35 mb-3">
                    Suivez-nous
                  </span>
                  <div className="flex items-center gap-3">
                    {[
                      { label: "LinkedIn", href: "https://linkedin.com", icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                      )},
                      { label: "Instagram", href: "https://instagram.com", icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>
                      )},
                      { label: "Dribbble", href: "https://dribbble.com", icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2m0 2a7.95 7.95 0 015.26 1.98c-.53.82-1.58 2.11-3.27 3.2A28.07 28.07 0 0010.28 4.2 7.93 7.93 0 0112 4M8.67 5.05c.82 1.13 2.15 3.22 3.68 5.7-3.6.94-7.05.92-7.55.91A8.03 8.03 0 018.67 5.05M4 12.05v-.25c.47.01 4.6.11 8.57-.99.24.47.47.95.68 1.42-4.47 1.29-7.03 4.88-7.33 5.37A7.97 7.97 0 014 12.05m3.72 7.35c.23-.42 2.25-3.65 7.12-5.32.03-.01.06-.02.08-.03a34.09 34.09 0 011.74 6.27A7.96 7.96 0 0112 20a7.97 7.97 0 01-4.28-1.6M18.22 19a36.13 36.13 0 00-1.6-5.85c1.91-.3 3.6.2 3.91.31A8.03 8.03 0 0118.22 19M17 9.66c1.6-1.15 2.57-2.4 3.06-3.2A7.97 7.97 0 0119.95 11c-.4-.07-2.27-.42-4.36-.1.19-.45.38-.91.54-1.36.11-.27.21-.54.3-.8l.57-.08z"/></svg>
                      )},
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black-deep/[0.06] flex items-center justify-center text-black-deep/60 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ─── Right Column: Contact Form (same as ContactCTA) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white border border-dark/8 rounded-2xl sm:rounded-3xl p-6 xs:p-8 sm:p-10 md:p-14 shadow-sm flex flex-col items-center justify-center text-center min-h-[320px] sm:min-h-[400px] md:min-h-[480px]"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 sm:mb-6">
                      <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />
                    </div>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-black-deep tracking-tight mb-2 sm:mb-3">
                      Message envoyé !
                    </h3>
                    <p className="text-dark/60 text-sm leading-relaxed max-w-[35ch] mb-8">
                      Merci pour votre confiance. Notre équipe vous recontactera
                      dans les 24 heures.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-primary font-heading font-bold text-xs tracking-widest uppercase hover:underline underline-offset-4 cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    onSubmit={handleSubmit}
                    className="bg-white border border-dark/8 rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-8 md:p-12 shadow-sm"
                  >
                    <div className="mb-8">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-primary/60 block mb-2">
                        Formulaire de contact
                      </span>
                      <h3 className="font-heading font-bold text-xl md:text-2xl text-black-deep tracking-tight">
                        Parlez-nous de votre projet
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {/* Name & Email in a responsive grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2"
                          >
                            Nom complet
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3.5 xs:px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-main border border-dark/8 rounded-xl text-[15px] sm:text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 min-h-[48px]"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2"
                          >
                            Adresse email
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3.5 xs:px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-main border border-dark/8 rounded-xl text-[15px] sm:text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 min-h-[48px]"
                          />
                        </div>
                      </div>

                      {/* Project Type */}
                      <div>
                        <label
                          htmlFor="contact-project"
                          className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2"
                        >
                          Type de projet
                        </label>
                        <select
                          id="contact-project"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-3.5 xs:px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-main border border-dark/8 rounded-xl text-[15px] sm:text-sm text-black-deep font-sans appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 cursor-pointer min-h-[48px]"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2332565C' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 16px center",
                          }}
                        >
                          <option value="" disabled>
                            Sélectionnez un type
                          </option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2"
                        >
                          Votre message
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Décrivez brièvement votre projet, vos objectifs et vos délais..."
                          className="w-full px-3.5 xs:px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-main border border-dark/8 rounded-xl text-[15px] sm:text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-5 sm:mt-8 flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4 bg-black-deep text-bg-main font-heading font-bold text-[11px] sm:text-xs tracking-widest uppercase rounded-full shadow-premium hover:bg-primary hover:text-black-deep transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px] active:scale-[0.97]"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Envoyer le message
                        </>
                      )}
                    </motion.button>

                    {/* Error Feedback */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-4 text-center text-sm text-red-500 font-medium"
                        >
                          Une erreur est survenue. Réessayez ou contactez-nous
                          directement à{" "}
                          <a
                            href="mailto:contact@aialab.com"
                            className="underline"
                          >
                            contact@aialab.com
                          </a>
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Bottom note */}
                    <p className="mt-6 text-center text-[10px] font-mono text-dark/30 uppercase tracking-widest">
                      Vos données restent confidentielles
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
