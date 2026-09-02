# Contexte du Projet : Portail de Booking MOTJAW

## Stack & Hébergement
- **Frontend** : React (Vite)
- **Hébergement** : GitHub Pages via GitHub Actions (`deploy.yml`)
- **Envoi courriels** : EmailJS (`emailjs/browser`) avec 2 templates (Admin + Client confirmation)
- **Repo** : `t1mman/MotjawBooking`

## Structure de l'application
- `src/components/BookingHub.jsx` : Hub principal avec navigation par onglets.
- `src/components/QuoteRequestForm.jsx` : Formulaire de soumission 1 (tarification, besoins techniques son/lumières, band d'ouverture, promo, per diem/hôtel).
  - Génère un identifiant unique de booking : `MJ-YYYY-XXXX`.
  - Masque de saisie dynamique pour téléphone : `(XXX) XXX-XXXX`.
  - Injection automatique d'un payload JSON caché (`json_payload`) pour l'export vers système de facturation.
- `src/components/LogisticsForm.jsx` : Formulaire 2 (horaires load-in, soundcheck, fin, contacts d'urgence sur place).
- `src/styles/BookingForm.css` : Thème industriel / nu-metal (vert néon, violet, sombre).

## Variables d'environnement requises
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID` (Gabarit interne MOTJAW)
- `VITE_EMAILJS_CLIENT_TEMPLATE_ID` (Accusé de réception client)
- `VITE_EMAILJS_PUBLIC_KEY`
*(Toutes configurées en local dans `.env` et dans GitHub Actions Secrets)*