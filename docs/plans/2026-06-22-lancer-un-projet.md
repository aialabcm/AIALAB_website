# Plan d'Implémentation : Page Lancer un Projet

**Objectif :** Créer la nouvelle page d'onboarding "/lancer-un-projet" comprenant le formulaire de contact complet, les coordonnées de contact rapides, une carte géographique stylisée et une FAQ sur le lancement de projets, tout en mettant à jour la navigation globale (Header, Hero, AboutHero et WorkCTA) pour rediriger vers cette route.

**Architecture :** Le projet utilise Next.js App Router. Nous allons créer un nouveau dossier `src/app/lancer-un-projet` contenant `page.tsx` comme composant client pour gérer le formulaire et la FAQ afin d'assurer l'interactivité. La navigation globale sera modifiée pour remplacer les ancres `#cta-contact` par des liens vers la route `/lancer-un-projet`.

**Technologies clés :** Next.js (App Router), React, Framer Motion, Tailwind CSS, Lucide-react.

---

### Tâche 1 : Création de la route `/lancer-un-projet`

**Fichiers ciblés :**
- Créer : `src/app/lancer-un-projet/page.tsx`

- [x] **Étape 1 : Écrire le test en échec**
*(Puisqu'aucun framework de test n'est configuré, l'échec initial est simulé par le fait que la compilation TypeScript ou l'accès à la page renverrait une erreur 404 ou une erreur d'import si la route n'existe pas. Nous utiliserons la vérification de type TypeScript comme validateur.)*
Exécuter : `npx tsc --noEmit`
Attente : ÉCHEC (si d'autres composants tentent d'importer une route inexistante ou si la route n'est pas encore déclarée lors du build).

- [ ] **Étape 2 : Lancer la vérification de type (Vérifier l'échec initial)**
Exécuter : `npx tsc --noEmit`

- [ ] **Étape 3 : Implémentation Minimale**
Créer le fichier `src/app/lancer-un-projet/page.tsx` avec le code complet ci-dessous :

```tsx
"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  CheckCircle, 
  Loader2, 
  Phone, 
  MapPin, 
  MessageSquare, 
  ChevronDown 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE"; // Identique à ContactCTA.tsx

const projectTypes = [
  "Branding Élite",
  "Digital Experience",
  "Motion Design",
  "Contenu Stratégique",
  "Architecture Web",
  "IA Générative",
];

const faqs = [
  {
    question: "Comment se déroule notre premier échange ?",
    answer: "Nous organisons un premier appel de cadrage gratuit de 30 minutes. C'est l'occasion de faire connaissance, de comprendre les grands contours de votre projet, vos objectifs et de valider notre synergie créative et technique.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Le règlement s'effectue généralement par virement bancaire. Nous divisons les paiements en trois étapes : 30% d'acompte au démarrage, 40% après validation de la phase de design de l'interface, et 30% à la livraison et mise en ligne finale du projet.",
  },
  {
    question: "Intégrez-vous l'intelligence artificielle dans vos livrables ?",
    answer: "Absolument. Nous utilisons des outils d'IA générative avancés pour optimiser nos phases de recherche, enrichir le copywriting et concevoir des ressources visuelles uniques et sur mesure, tout en assurant une finition manuelle d'élite.",
  },
  {
    question: "Quel est le délai typique de démarrage après signature ?",
    answer: "Une fois le contrat signé et l'acompte de 30% reçu, nous démarrons généralement sous 7 à 10 jours ouvrés. Cela nous laisse le temps de préparer l'environnement technique de développement et de planifier les ateliers d'immersion.",
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function LancerProjetPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
          subject: `Lancer un projet — ${formData.projectType}`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
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
      <main className="min-h-screen bg-bg-main pt-32 pb-24 selection:bg-primary/20 selection:text-primary">
        
        {/* En-tête de page */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-16 mb-16">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-primary/80 block mb-3">
              Co-création d'élite
            </span>
            <h1 className="font-heading font-black text-black-deep tracking-tighter leading-[0.95] uppercase text-4xl sm:text-6xl md:text-7xl">
              Lancer un <span className="text-primary accent-italic">projet.</span>
            </h1>
            <p className="font-sans text-dark/70 text-sm sm:text-base leading-relaxed mt-6 max-w-[55ch]">
              Prêt à concevoir l'exceptionnel ? Remplissez le formulaire d'onboarding ci-dessous ou contactez nos experts via nos canaux directs.
            </p>
          </div>
        </section>

        {/* Section Formulaire & Coordonnées (Deux Colonnes) */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Colonne Gauche : Formulaire */}
          <div className="col-span-1 lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-black/[0.05] rounded-3xl p-8 md:p-12 shadow-premium flex flex-col items-center justify-center text-center min-h-[480px]"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-black-deep tracking-tight mb-3">
                    Demande de projet reçue !
                  </h3>
                  <p className="font-sans text-dark/60 text-sm leading-relaxed max-w-[38ch] mb-8">
                    Merci pour votre confiance. Nos équipes vont étudier vos besoins et vous recontacter sous 24 heures ouvrées.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-primary font-heading font-bold text-xs tracking-widest uppercase hover:underline underline-offset-4 cursor-pointer"
                  >
                    Envoyer une autre demande
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white border border-black/[0.05] rounded-3xl p-6 sm:p-8 md:p-12 shadow-premium"
                >
                  <div className="mb-8">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-black-deep tracking-tight">
                      Parlez-nous de votre vision
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Nom complet */}
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2">
                        Nom complet
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-[#FAFAFA] border border-black/[0.08] rounded-xl text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                        placeholder="Jean Dupont"
                      />
                    </div>

                    {/* Ligne Email & Téléphone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2">
                          Adresse email
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 bg-[#FAFAFA] border border-black/[0.08] rounded-xl text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                          placeholder="jean.dupont@exemple.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2">
                          Numéro de téléphone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 bg-[#FAFAFA] border border-black/[0.08] rounded-xl text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                          placeholder="+237 690 00 00 00"
                        />
                      </div>
                    </div>

                    {/* Type de projet */}
                    <div>
                      <label htmlFor="projectType" className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2">
                        Service souhaité
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-[#FAFAFA] border border-black/[0.08] rounded-xl text-sm text-black-deep font-sans appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2332565C' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 18px center",
                        }}
                      >
                        <option value="" disabled>Sélectionnez un service</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-[11px] font-heading font-bold tracking-wider uppercase text-dark/50 mb-2">
                        Description du projet
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Détaillez vos objectifs stratégiques, délais souhaités et contraintes éventuelles..."
                        className="w-full px-5 py-3.5 bg-[#FAFAFA] border border-black/[0.08] rounded-xl text-sm text-black-deep font-sans placeholder:text-dark/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  {/* Bouton de validation */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full mt-8 flex items-center justify-center gap-3 px-8 py-4 bg-black-deep text-white font-heading font-bold text-xs tracking-widest uppercase rounded-full shadow-premium hover:bg-primary hover:text-black-deep transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px] cursor-pointer"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi du projet...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Lancer le projet
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 text-center text-sm text-red-500 font-medium"
                      >
                        Une erreur s'est produite. Merci de réessayer ou de nous écrire à <a href="mailto:contact@aialab.com" className="underline font-bold">contact@aialab.com</a>.
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <p className="mt-6 text-center text-[10px] font-mono text-dark/30 uppercase tracking-widest">
                    Données confidentielles et sécurisées
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Colonne Droite : Coordonnées Directes */}
          <div className="col-span-1 lg:col-span-5 space-y-6">
            
            {/* Carte Téléphone */}
            <div className="bg-white border border-black/[0.05] rounded-3xl p-8 shadow-premium group hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-black-deep">Appelez-nous</h4>
                  <p className="font-sans text-dark/40 text-[11px] uppercase tracking-wider font-semibold">Réponse immédiate</p>
                </div>
              </div>
              <p className="font-sans text-dark/70 text-sm leading-relaxed mb-6">
                Pour discuter directement de vos besoins avec un de nos chargés de compte.
              </p>
              <a
                href="tel:+237690123456"
                className="inline-flex items-center justify-center font-mono font-bold text-sm text-black-deep bg-[#FAFAFA] border border-black/[0.05] hover:bg-primary/10 hover:border-primary/30 px-6 py-3 rounded-xl transition-all duration-300 w-full text-center"
              >
                +237 690 123 456
              </a>
            </div>

            {/* Carte Adresse */}
            <div className="bg-white border border-black/[0.05] rounded-3xl p-8 shadow-premium group hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-black-deep">Passez au Lab</h4>
                  <p className="font-sans text-dark/40 text-[11px] uppercase tracking-wider font-semibold">Siège Physique</p>
                </div>
              </div>
              <p className="font-sans text-dark/70 text-sm leading-relaxed mb-6">
                Vallée Nlongkak, Yaoundé / Douala, Cameroun. Venez boire un café et discuter.
              </p>
              <a
                href="https://maps.google.com/?q=Vallee+Nlongkak,+Yaounde,+Cameroun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-heading font-bold text-xs tracking-wider uppercase text-black-deep bg-[#FAFAFA] border border-black/[0.05] hover:bg-primary/10 hover:border-primary/30 px-6 py-3 rounded-xl transition-all duration-300 w-full text-center"
              >
                Ouvrir sur Maps
              </a>
            </div>

            {/* Carte Chat Direct */}
            <div className="bg-white border border-black/[0.05] rounded-3xl p-8 shadow-premium group hover:border-primary/20 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-black-deep">Chat Direct</h4>
                  <p className="font-sans text-dark/40 text-[11px] uppercase tracking-wider font-semibold">WhatsApp Business</p>
                </div>
              </div>
              <p className="font-sans text-dark/70 text-sm leading-relaxed mb-6">
                Échangez en temps réel avec notre équipe technique sur WhatsApp.
              </p>
              <a
                href="https://wa.me/237690123456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-heading font-bold text-xs tracking-wider uppercase text-black-deep bg-[#FAFAFA] border border-black/[0.05] hover:bg-primary/10 hover:border-primary/30 px-6 py-3 rounded-xl transition-all duration-300 w-full text-center"
              >
                Discuter en ligne
              </a>
            </div>

          </div>
        </section>

        {/* Section Carte Géographique Stylisée */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-16 mb-24">
          <div className="w-full h-[450px] rounded-3xl overflow-hidden border border-black/[0.08] shadow-premium relative bg-neutral-100">
            <iframe
              src="https://maps.google.com/maps?q=Vallee%20Nlongkak,%20Yaounde,%20Cameroun&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full grayscale invert opacity-90 contrast-125 rounded-3xl border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AIA LAB Localisation Map"
            />
          </div>
        </section>

        {/* Section FAQ (Questions Fréquentes) */}
        <section className="max-w-[960px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-primary/80 block mb-3">
              FAQ Onboarding
            </span>
            <h2 className="font-heading font-black text-black-deep tracking-tighter uppercase text-3xl sm:text-5xl">
              Questions <span className="text-primary accent-italic">Fréquentes.</span>
            </h2>
          </div>

          <div className="border-t border-black/[0.06] divide-y divide-black/[0.06]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="transition-all duration-300">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between py-6 text-left focus:outline-none group cursor-pointer"
                  >
                    <span className={`font-heading font-bold text-sm sm:text-base tracking-tight transition-colors duration-300 ${isOpen ? "text-primary" : "text-black-deep/80 group-hover:text-black-deep"}`}>
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isOpen ? "bg-primary/10 text-primary" : "bg-black/[0.03] text-black-deep/30 group-hover:bg-black/[0.06]"}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-dark/70 text-xs sm:text-sm leading-relaxed pb-6 pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Étape 4 : Lancer le test de type (Il doit réussir)**
Exécuter : `npx tsc --noEmit`
Attente : PASS (aucune erreur de compilation).

- [ ] **Étape 5 : Commit**
Exécuter : `git add src/app/lancer-un-projet/page.tsx && git commit -m "feat: creation de la route /lancer-un-projet"`

---

### Tâche 2 : Mise à jour de la navigation du Header

**Fichiers ciblés :**
- Modifier : `src/components/Header.tsx`

- [x] **Étape 1 : Écrire le test en échec**
Vérifier que les redirections ne pointent pas encore vers la page `/lancer-un-projet`. 
Attente : Les redirections pointent toujours vers `#cta-contact`.

- [ ] **Étape 2 : Lancer le test**
Vérifier visuellement ou par recherche textuelle que `#cta-contact` est utilisé dans les liens "Lancer le projet" du Header.

- [ ] **Étape 3 : Implémentation Minimale**
Modifier `src/components/Header.tsx` pour remplacer toutes les redirections de boutons "Lancer le projet/Démarrer un projet" qui allaient vers `#cta-contact` par `/lancer-un-projet`.

1. Remplacer à la ligne 352 :
```diff
-                        href="#cta-contact" 
+                        href="/lancer-un-projet" 
```

2. Remplacer à la ligne 400 :
```diff
-              href="#cta-contact"
+              href="/lancer-un-projet"
```

3. Remplacer à la ligne 629 :
```diff
-                            href="#cta-contact"
+                            href="/lancer-un-projet"
```

4. Remplacer à la ligne 682 :
```diff
-                  href="#cta-contact"
+                  href="/lancer-un-projet"
```

- [ ] **Étape 4 : Lancer le test**
Exécuter : `npx tsc --noEmit`
Attente : PASS. Les liens dans le Header pointent désormais vers `/lancer-un-projet`.

- [ ] **Étape 5 : Commit**
Exécuter : `git add src/components/Header.tsx && git commit -m "refactor: redirection des boutons de projet du Header vers /lancer-un-projet"`

---

### Tâche 3 : Mise à jour des boutons HeroSection, AboutHero et WorkCTA

**Fichiers ciblés :**
- Modifier : `src/components/HeroSection.tsx`
- Modifier : `src/app/about/components/AboutHero.tsx`
- Modifier : `src/app/work/components/WorkCTA.tsx`

- [x] **Étape 1 : Écrire le test en échec**
Les boutons de lancement dans les sections Hero de la page d'accueil, d'About, et les sections CTA du portfolio pointent toujours vers l'ancre locale.
Attente : Les fichiers contiennent toujours `href="#cta-contact"` pour ces CTAs.

- [ ] **Étape 2 : Lancer le test**
Vérifier l'état actuel des liens dans les fichiers.

- [ ] **Étape 3 : Implémentation Minimale**
Modifier les fichiers pour rediriger vers la nouvelle page.

1. Dans `src/components/HeroSection.tsx`, à la ligne 89 :
```diff
-            <a
-              href="#cta-contact"
-              className="bg-primary text-black-deep py-4 px-8 sm:px-10 rounded-full font-sans font-extrabold text-sm tracking-wider transition-all duration-300 hover:bg-white hover:text-black-deep hover:scale-105 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-center min-h-[48px]"
-            >
+            <Link
+              href="/lancer-un-projet"
+              className="bg-primary text-black-deep py-4 px-8 sm:px-10 rounded-full font-sans font-extrabold text-sm tracking-wider transition-all duration-300 hover:bg-white hover:text-black-deep hover:scale-105 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-center min-h-[48px] flex items-center justify-center"
+            >
```
*(Note : Il faudra également importer `Link` depuis `"next/link"` en haut de `src/components/HeroSection.tsx`.)*
Ajouter en haut de `src/components/HeroSection.tsx` :
```diff
  import { motion } from "framer-motion";
  import { ArrowRight } from "lucide-react";
+ import Link from "next/link";
  import TypewriterLine from "@/components/TypewriterLine";
```

2. Dans `src/app/about/components/AboutHero.tsx`, à la ligne 83 :
```diff
-              <a
-                href="#cta-contact"
-                className="group cursor-pointer bg-primary text-black-deep py-3.5 px-8 rounded-full font-sans font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-black-deep hover:text-white hover:scale-105 active:scale-[0.98] shadow-md hover:shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[48px] flex items-center justify-center gap-2.5"
-              >
+              <Link
+                href="/lancer-un-projet"
+                className="group cursor-pointer bg-primary text-black-deep py-3.5 px-8 rounded-full font-sans font-extrabold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-black-deep hover:text-white hover:scale-105 active:scale-[0.98] shadow-md hover:shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[48px] flex items-center justify-center gap-2.5"
+              >
```
*(Note : `Link` est déjà importé en haut de `src/app/about/components/AboutHero.tsx`.)*

3. Dans `src/app/work/components/WorkCTA.tsx` :
* À la ligne 235 :
```diff
-              <a
-                href="#cta-contact"
-                className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 min-w-[44px] min-h-[44px]"
-              >
+              <Link
+                href="/lancer-un-projet"
+                className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 min-w-[44px] min-h-[44px]"
+              >
```
* À la ligne 274 :
```diff
-              <a href="#cta-contact" className="inline-block px-5 sm:px-6 py-3 bg-primary text-black-deep hover:bg-black-deep hover:text-white font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-full transition-colors duration-300 min-h-[44px] leading-[44px]">
-                Prendre rendez-vous
-              </a>
+              <Link href="/lancer-un-projet" className="inline-flex items-center justify-center px-5 sm:px-6 py-3 bg-primary text-black-deep hover:bg-black-deep hover:text-white font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-full transition-colors duration-300 min-h-[44px] leading-[44px]">
+                Prendre rendez-vous
+              </Link>
```
*(Note : Il faudra également importer `Link` depuis `"next/link"` en haut de `src/app/work/components/WorkCTA.tsx`.)*
Ajouter en haut de `src/app/work/components/WorkCTA.tsx` :
```diff
  import { motion, AnimatePresence } from "framer-motion";
  import { ArrowUpRight, X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
  import { useState, useRef, useEffect } from "react";
  import Image from "next/image";
+ import Link from "next/link";
```

- [ ] **Étape 4 : Lancer le test**
Exécuter : `npx tsc --noEmit && npm run build`
Attente : PASS (le projet compile correctement avec les imports Next.js Link et sans erreurs typographiques).

- [ ] **Étape 5 : Commit**
Exécuter : `git add src/components/HeroSection.tsx src/app/about/components/AboutHero.tsx src/app/work/components/WorkCTA.tsx && git commit -m "refactor: redirection des boutons CTA Hero et Portfolio vers /lancer-un-projet"`
