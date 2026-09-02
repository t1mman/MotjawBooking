import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function QuoteRequestForm() {
  const formRef = useRef(null);
  const [generatedId, setGeneratedId] = useState('');
  const [hasOpeningBand, setHasOpeningBand] = useState('non');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState({ submitting: false, message: '', error: false });

    // Récupération des deux gabarits
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ADMIN_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const TEMPLATE_CLIENT_ID = import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Fonction pour formater en (XXX) XXX-XXXX au fil de la frappe
    const handlePhoneChange = (e) => {
        // 1. Ne garder que les chiffres
        const rawDigits = e.target.value.replace(/\D/g, '');

        // 2. Limiter à 10 chiffres (indicatif régional + numéro)
        const digits = rawDigits.slice(0, 10);

        // 3. Appliquer le masque progressivement
        let formatted = '';
        if (digits.length === 0) {
        formatted = '';
        } else if (digits.length <= 3) {
        formatted = `(${digits}`;
        } else if (digits.length <= 6) {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        } else {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
        }

        setPhone(formatted);
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, message: '', error: false });

    const bookingId = createBookingId();
    setGeneratedId(bookingId);

    const formElement = formRef.current;

    // Injection du Booking ID dans le formulaire
    let idInput = formElement.querySelector('input[name="booking_id"]');
    if (!idInput) {
        idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.name = 'booking_id';
        formElement.appendChild(idInput);
    }
    idInput.value = bookingId;

    try {
        // Envoi simultané des deux courriels
        await Promise.all([
        // Courriel 1: Équipe MOTJAW
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ADMIN_ID, formElement, { publicKey: PUBLIC_KEY }),
        // Courriel 2: Accusé de réception client
        emailjs.sendForm(SERVICE_ID, TEMPLATE_CLIENT_ID, formElement, { publicKey: PUBLIC_KEY })
        ]);

        setStatus({
            submitting: false,
            message: `Demande reçue! Votre numéro de dossier est : ${bookingId}. Un courriel de confirmation vous a été envoyé.`,
            error: false,
        });
        formRef.current.reset();
        setPhone(''); // <-- Réinitialise l'affichage du téléphone
        setHasOpeningBand('non');
    } catch (error) {
        console.error('EmailJS Error:', error);
        setStatus({
        submitting: false,
        message: 'Erreur lors de la transmission. Veuillez vérifier vos informations ou nous contacter directement.',
        error: true,
        });
    }
    };

    const createBookingId = () => {
        const year = new Date().getFullYear();
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `MJ-${year}-${randomCode}`;
    };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="booking-form">
      {/* SECTION 1: CONTACT & LIEU */}
      <h3 className="section-title">1. Informations de base (Requis)</h3>
      <div className="form-grid-3">
        <div className="form-field">
          <label>Nom ou Organisation *</label>
          <input type="text" name="contact_name" required placeholder="ex: Festival d'été" />
        </div>
        <div className="form-field">
          <label>Courriel de Contact *</label>
          <input type="email" name="contact_email" required placeholder="contact@festival.com" />
        </div>
        <div className="form-field">
        <label>Téléphone *</label>
        <input
            type="tel"
            name="contact_phone"
            required
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(418) 555-0123"
            maxLength={14} // Bloque la saisie à "(XXX) XXX-XXXX" (14 caractères max)
        />
        </div>

      </div>

      <div className="form-grid-3">
        <div className="form-field">
          <label>Date visée *</label>
          <input type="date" name="event_date" required />
        </div>
        <div className="form-field">
          <label>Ville / Région *</label>
          <input type="text" name="event_location" required placeholder="ex: Shawinigan, Québec..." />
        </div>
        <div className="form-field">
          <label>Formule souhaitée *</label>
          <select name="set_formula" required>
            <option value="1 set de 75-90 min (Best Of)">1 set de 75-90 min (Best Of)</option>
            <option value="2 sets de 45-50 min">2 sets de 45-50 min</option>
            <option value="2 Super sets de 60+ min">2 Super sets de 60+ min</option>
            <option value="Format Festival (à déterminer)">Format Festival (créneau précis)</option>
            <option value="Format Concert 120+ min">Format Concert 120+ min</option>
          </select>
        </div>
      </div>

      {/* SECTION 2: TECHNIQUE SCÉNIQUE */}
      <h3 className="section-title">2. Régie & Équipement Scénique</h3>
      <div className="form-grid-3">
        <div className="form-field">
          <label>Sonorisation (PA / Subs)</label>
          <select name="tech_sound">
            <option value="Fournie sur place par le diffuseur">Fournie sur place</option>
            <option value="Requise (MOTJAW doit fournir le système)">Requise (par le band)</option>
          </select>
        </div>
        <div className="form-field">
          <label>Éclairage de scène</label>
          <select name="tech_lights">
            <option value="Fourni sur place">Fourni sur place</option>
            <option value="Requis (MOTJAW fournit le kit DMX)">Requis (par le band)</option>
          </select>
        </div>
        <div className="form-field">
          <label>Technicien Son FOH</label>
          <select name="tech_engineer">
            <option value="Fourni par la salle / événement">Fourni par la salle</option>
            <option value="Requis (technicien MOTJAW)">Requis (via le groupe)</option>
          </select>
        </div>
      </div>

      {/* SECTION 3: PREMIÈRE PARTIE */}
      <h3 className="section-title">3. Groupe d'ouverture</h3>
      <div className="form-grid-2">
        <div className="form-field">
          <label>Première partie prévue ?</label>
          <select
            name="opening_band_needed"
            value={hasOpeningBand}
            onChange={(e) => setHasOpeningBand(e.target.value)}
          >
            <option value="non">Non / Pas de première partie</option>
            <option value="oui">Oui</option>
          </select>
        </div>
        {hasOpeningBand === 'oui' && (
          <div className="form-field">
            <label>Gestion du groupe d'ouverture</label>
            <select name="opening_band_management">
              <option value="Fourni par l'organisateur">Fourni par l'organisation</option>
              <option value="Requis (MOTJAW amène un groupe invité)">Requis (amener un groupe invité)</option>
            </select>
          </div>
        )}
      </div>

      {/* SECTION 4: PROMO, VISUELS & BILLETTERIE */}
      <h3 className="section-title">4. Promotion, Visuels & Vente</h3>
      <div className="promo-disclaimer">
            <strong>Note :</strong> La promotion locale, l'affichage physique et la mobilisation régionale demeurent sous la responsabilité du tenancier de l'événement.
        </div>
      <div className="form-grid-2">
        <div className="form-field">
          <label>Événement Facebook</label>
          <select name="promo_fb">
            <option value="Géré par l'organisation">Géré par l'organisation</option>
            <option value="Création requise par MOTJAW">Création requise par MOTJAW</option>
          </select>
        </div>
        <div className="form-field">
          <label>Conception des Visuels / Affiches</label>
          <select name="promo_art">
            <option value="Fournis par l'organisation">Fournis par l'organisation</option>
            <option value="Requis (conception par MOTJAW)">Requis (conçus par MOTJAW)</option>
          </select>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-field">
          <label>Génération de Codes QR promo</label>
          <select name="promo_qr">
            <option value="Géré par l'organisation">Géré par l'organisation</option>
            <option value="Requis via MOTJAW">Requis via MOTJAW</option>
          </select>
        </div>
        <div className="form-field">
          <label>Gestion de la Billetterie</label>
          <select name="promo_tickets">
            <option value="Gérée par la salle / événement">Gérée par la salle / événement</option>
            <option value="Configuration requise via MOTJAW">Configuration requise via MOTJAW</option>
          </select>
        </div>
      </div>

      {/* SECTION 5: HOSPITALITÉ & FRAIS DE DÉPLACEMENT */}
      <h3 className="section-title">5. Hospitalité</h3>
      <div className="form-grid-2">
        <div className="form-field">
          <label>Repas chauds ou per diem</label>
          <select name="hospitality_meals">
            <option value="Fournis pour l'équipe">Fournis pour l'équipe</option>
            <option value="Non prévus (à chiffrer)">Non prévus (à chiffrer)</option>
          </select>
        </div>
        <div className="form-field">
          <label>Hébergement (si éloigné)</label>
          <select name="hospitality_hotel">
            <option value="Non requis">Non requis</option>
            <option value="Fourni par l'organisation">Fourni par l'organisation</option>
            <option value="Requis à chiffrer">Requis (à inclure au contrat)</option>
          </select>
        </div>
      </div>

      {/* NOTES ADDITIONNELLES */}
      <div className="form-field">
        <label>Notes & Spécifications supplémentaires</label>
        <textarea name="message" rows="3" placeholder="Contraintes de scène, dimensions, budget envisagé..." />
      </div>

      <button type="submit" disabled={status.submitting} className="submit-button">
        {status.submitting ? 'Calcul et transmission en cours...' : 'Envoyer la demande de soumission'}
      </button>

      {status.message && (
        <div className={`status-msg ${status.error ? 'error' : 'success'}`}>
          {status.message}
        </div>
      )}
    </form>
  );
}