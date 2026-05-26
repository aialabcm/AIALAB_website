"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";

// ──────────────────────────────────────────────────────────────
// Replace this with your real Web3Forms access key
// Get one for free at https://web3forms.com
// ──────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

const projectTypes = [
  "Branding & Identité visuelle",
  "Web Design & Développement",
  "Design Graphique & Digital",
  "Marketing Digital",
  "Solutions Print",
  "Autre",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactCTA() {
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
    <section
      className="relative bg-bg-main py-20 md:py-28 overflow-hidden"
      id="cta-contact"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 blur-[80px] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary/15 blur-[80px] rounded-full"
        />
      </div>

      <div className="max-w-container mx-auto px-6 md:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ─── Left Column: Copy & Trust ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-black-deep tracking-tighter leading-[0.95]"
            >
              Bâtissons ensemble{" "}
              <span className="text-primary accent-italic">
                l&apos;exceptionnel.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-sans text-base md:text-lg text-dark/70 mt-8 max-w-[50ch] leading-relaxed font-medium"
            >
              Plus qu&apos;une agence, nous sommes votre partenaire
              stratégique. Collaborons pour transformer votre vision en un
              héritage numérique qui marque les esprits.
            </motion.p>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 flex flex-col gap-6"
            >
              {/* Quick info */}
              <div className="flex items-center gap-4 sm:gap-8">
                <div>
                  <span className="block text-2xl sm:text-3xl font-heading font-bold text-black-deep tracking-tighter">
                    24h
                  </span>
                  <span className="text-[9px] font-mono text-dark/40 uppercase tracking-widest font-bold mt-1 block">
                    Temps de réponse
                  </span>
                </div>
                <div className="w-px h-10 bg-dark/10" />
                <div>
                  <span className="block text-3xl font-heading font-bold text-black-deep tracking-tighter">
                    98%
                  </span>
                  <span className="text-[9px] font-mono text-dark/40 uppercase tracking-widest font-bold mt-1 block">
                    Satisfaction
                  </span>
                </div>
                <div className="w-px h-10 bg-dark/10" />
                <div>
                  <span className="block text-3xl font-heading font-bold text-black-deep tracking-tighter">
                    500+
                  </span>
                  <span className="text-[9px] font-mono text-dark/40 uppercase tracking-widest font-bold mt-1 block">
                    Projets livrés
                  </span>
                </div>
              </div>

              {/* Avatars + availability */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-bg-main bg-bg-alt overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="Expert"
                        loading="lazy"
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-dark/50 font-bold uppercase tracking-wider">
                    Places disponibles pour 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right Column: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white border border-dark/8 rounded-3xl p-10 md:p-14 shadow-sm flex flex-col items-center justify-center text-center min-h-[480px]"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-black-deep tracking-tight mb-3">
                    Message envoyé !
                  </h3>
                  <p className="text-dark/60 text-sm leading-relaxed max-w-[35ch] mb-8">
                    Merci pour votre confiance. Notre équipe vous recontactera
                    dans les 24 heures.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-primary font-heading font-bold text-xs tracking-widest uppercase hover:underline underline-offset-4"
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
                  className="bg-white border border-dark/8 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-sm"
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
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-main border border-dark/8 rounded-xl text-base sm:text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
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
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-main border border-dark/8 rounded-xl text-base sm:text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                      />
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
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-main border border-dark/8 rounded-xl text-base sm:text-sm text-black-deep font-sans appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 cursor-pointer"
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
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-bg-main border border-dark/8 rounded-xl text-base sm:text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 sm:mt-8 flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 bg-black-deep text-bg-main font-heading font-bold text-xs tracking-widest uppercase rounded-full shadow-premium hover:bg-primary hover:text-black-deep transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
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
      </div>
    </section>
  );
}
