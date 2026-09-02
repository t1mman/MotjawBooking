# MOTJAW — Portail de Booking Spectacle ⚡

Portail web responsive et moderne conçu pour la gestion des demandes de soumission et le suivi logistique du groupe hommage à Linkin Park, **MOTJAW**.

L'application permet aux diffuseurs, festivals et tenanciers de soumettre leurs besoins techniques et logistiques complets afin d'obtenir un chiffrage rapide et précis.

---

## 🎸 Fonctionnalités

* **Flux de réservation en 2 étapes (Booking Hub) :**
  * **Formulaire 1 — Soumission & Devis :** Collecte des paramètres à incidence financière (sonorisation FOH/subs, éclairage scénique DMX, première partie, conception visuelle, billetterie, repas/hébergement).
  * **Formulaire 2 — Logistique Jour J :** Précision des horaires stricts (load-in, balance sonore, début, couvre-feu) et contacts d'urgence sur place.
* **Génération automatique de Booking ID :** Identifiant unique au format `MJ-YYYY-XXXX` généré à chaque soumission pour lier les étapes 1 et 2.
* **Double notification par courriel (EmailJS) :**
  * Récapitulatif technique et contractuel complet transmis à l'équipe de MOTJAW.
  * Accusé de réception automatisé envoyé à l'organisateur avec son numéro de dossier.
* **Export Payload JSON structuré :** Injection d'un objet JSON propre dans chaque soumission pour faciliter l'intégration future avec des outils de facturation ou des webhooks.
* **Masque de saisie dynamique :** Formatage en temps réel du champ téléphonique nord-américain `(XXX) XXX-XXXX`.
* **Identité visuelle Nu-Metal :** Interface dark mode néon (mauve ultraviolet & vert toxique) optimisée pour mobile et ordinateur de bureau.

---

## 🛠️ Stack Technique

* **Framework :** React
* **Build Tool :** Vite
* **Envoi de courriels :** @emailjs/browser
* **Déploiement & CI/CD :** GitHub Pages via GitHub Actions

---

## 🚀 Installation & Développement Local

### Prérequis

* Node.js (version 18 ou supérieure recommandée)
* Git

### 1. Cloner le projet

git clone https://github.com/t1mman/MotjawBooking.git
cd MotjawBooking

### 2. Installer les dépendances

npm install

### 3. Configurer les variables d'environnement

Crée un fichier `.env` à la racine du projet et ajoute tes identifiants EmailJS :

VITE_EMAILJS_SERVICE_ID=ton_service_id
VITE_EMAILJS_TEMPLATE_ID=template_admin_id
VITE_EMAILJS_CLIENT_TEMPLATE_ID=template_client_id
VITE_EMAILJS_PUBLIC_KEY=ta_cle_publique

### 4. Démarrer le serveur de développement

npm run dev

---

## 📦 Déploiement en Production (GitHub Pages)

Le projet utilise un workflow automatisé via **GitHub Actions** (`.github/workflows/deploy.yml`). À chaque `push` sur la branche `main`, le site est automatiquement compilé et mis en ligne.

### Secrets GitHub requis

Assure-toi d'ajouter ces 4 secrets dans **Settings > Secrets and variables > Actions** de ton dépôt :

| Nom du secret | Description |
| :--- | :--- |
| `VITE_EMAILJS_SERVICE_ID` | Identifiant du service EmailJS |
| `VITE_EMAILJS_TEMPLATE_ID` | Gabarit de notification interne (Admin) |
| `VITE_EMAILJS_CLIENT_TEMPLATE_ID` | Gabarit d'accusé de réception (Client) |
| `VITE_EMAILJS_PUBLIC_KEY` | Clé API publique EmailJS |

---

## 📂 Structure du Projet

MotjawBooking/
├── .github/workflows/deploy.yml   # Configuration CI/CD GitHub Actions
├── src/
│   ├── assets/                    # Logo et éléments graphiques
│   ├── components/
│   │   ├── BookingHub.jsx         # Hub principal avec navigation par onglets
│   │   ├── QuoteRequestForm.jsx   # Étape 1 : Formulaire de soumission & chiffrage
│   │   └── LogisticsForm.jsx      # Étape 2 : Formulaire logistique & horaires
│   ├── styles/
│   │   └── BookingForm.css        # Styles et animations du thème
│   ├── App.jsx                    # Point d'entrée des composants
│   └── main.jsx                   # Racine React
├── vite.config.js                 # Configuration Vite (base path GitHub Pages)
└── package.json

---

## ⚖️ Licence

© 2026 MOTJAW. Tous droits réservés.