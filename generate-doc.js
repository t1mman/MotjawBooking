import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import fs from "fs";

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          text: "MOTJAW — Portail de Booking Spectacle",
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Documentation technique, architecture et suivi de projet.",
              italics: true,
            }),
          ],
        }),
        new Paragraph({ text: "" }),

        new Paragraph({
          text: "1. Présentation Générale",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          text: "Portail web responsive conçu avec React et Vite pour gérer les demandes de soumission et la logistique du groupe hommage à Linkin Park, MOTJAW.",
        }),
        new Paragraph({ text: "" }),

        new Paragraph({
          text: "2. Architecture & Composants",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• BookingHub.jsx : ", bold: true }),
            new TextRun("Conteneur principal avec navigation par onglets."),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• QuoteRequestForm.jsx : ", bold: true }),
            new TextRun("Formulaire 1 de soumission chiffrable (contact, ville, date, sono, lumières, band d'ouverture, promo, billetterie, repas, hôtel)."),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• LogisticsForm.jsx : ", bold: true }),
            new TextRun("Formulaire 2 de logistique Jour J (horaires load-in, soundcheck, spectacle, couvre-feu et contacts sur place)."),
          ],
        }),
        new Paragraph({ text: "" }),

        new Paragraph({
          text: "3. Fonctionnalités Clés",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• Booking ID Unique : ", bold: true }),
            new TextRun("Génération automatique du code MJ-YYYY-XXXX reliant la soumission à la feuille de route."),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• Double expédition EmailJS : ", bold: true }),
            new TextRun("Envoi séquentiel vers l'équipe MOTJAW (admin) et accusé de réception automatisé pour le client."),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• Export Payload JSON : ", bold: true }),
            new TextRun("Sérialisation d'un objet JSON complet injecté dans le courriel pour automatiser la facturation future."),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "• Masque téléphonique : ", bold: true }),
            new TextRun("Formatage automatique en direct au standard nord-américain (XXX) XXX-XXXX."),
          ],
        }),
        new Paragraph({ text: "" }),

        new Paragraph({
          text: "4. Déploiement & Environnement",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          text: "Déploiement continu via GitHub Actions sur GitHub Pages (branche main). Secrets requis dans le dépôt : VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_CLIENT_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY.",
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Documentation_MOTJAW_Booking.docx", buffer);
  console.log("Fichier 'Documentation_MOTJAW_Booking.docx' généré avec succès !");
});