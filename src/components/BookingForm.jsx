import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import logoMotjaw from '../assets/motjaw-logo.png';
import '../styles/BookingForm.css';

export default function BookingForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ submitting: false, message: '', error: false });

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, message: '', error: false });

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus({
            submitting: false,
            message: 'Demande envoyée avec succès! On vous revient rapidement.',
            error: false,
          });
          formRef.current.reset();
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatus({
            submitting: false,
            message: 'Erreur lors de l’envoi. Veuillez réessayer ou nous contacter sur nos réseaux.',
            error: true,
          });
        }
      );
  };

  return (
    <div className="booking-page-wrapper">
      <div className="booking-card">
        
        {/* Header avec Logo MOTJAW */}
        <div className="booking-header">
          <img src={logoMotjaw} alt="MOTJAW - Linkin Park Tribute" className="band-logo" />
          <h1 className="booking-title">RÉSERVATION - MOTJAW</h1>
        </div>

        {/* Formulaire */}
        <form ref={formRef} onSubmit={handleSubmit} className="booking-form">
          
          {/* Ligne 1 : Nom, Courriel, Téléphone */}
          <div className="form-grid-3">
            <div className="form-field">
              <label>Nom Complet *</label>
              <input type="text" name="contact_name" required placeholder="ex: Jean Tremblay" />
            </div>

            <div className="form-field">
              <label>Courriel de Contact *</label>
              <input type="email" name="contact_email" required placeholder="contact@festival.com" />
            </div>

            <div className="form-field">
              <label>Téléphone</label>
              <input type="tel" name="contact_phone" placeholder="(418) 555-0123" />
            </div>
          </div>

          {/* Ligne 2 : Type d'événement, Date, Capacité */}
          <div className="form-grid-3">
            <div className="form-field">
              <label>Type d'Événement</label>
              <select name="event_type">
                <option value="Festival">Festival</option>
                <option value="Salle/Bar">Salle / Bar</option>
                <option value="Corporatif">Corporatif / Privé</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="form-field">
              <label>Date Souhaitée *</label>
              <input type="date" name="event_date" required />
            </div>

            <div className="form-field">
              <label>Capacité de la Salle / Site</label>
              <input type="number" name="venue_capacity" placeholder="ex: 500" />
            </div>
          </div>

          {/* Ligne 3 : Emplacement et Son/Lumières */}
          <div className="form-grid-3">
            <div className="form-field" style={{ gridColumn: 'span 2' }}>
              <label>Ville / Emplacement *</label>
              <input type="text" name="event_location" required placeholder="ex: Québec, Montréal, Shawinigan..." />
            </div>

            <div className="form-field">
              <label>Son & Éclairage fournis?</label>
              <select name="tech_provided">
                <option value="Oui">Oui (sur place)</option>
                <option value="Partiel">Partiel (préciser en note)</option>
                <option value="Non">Non (groupe autonome requis)</option>
              </select>
            </div>
          </div>

          {/* Ligne 4 : Précisions */}
          <div className="form-field">
            <label>Détails Additionnels</label>
            <textarea
              name="message"
              rows="3"
              placeholder="Précisez l'horaire souhaité, formules, détails de la scène..."
            />
          </div>

          {/* Bouton d'envoi */}
          <button type="submit" disabled={status.submitting} className="submit-button">
            {status.submitting ? 'Transmission en cours...' : 'Envoyer la demande de booking'}
          </button>

          {/* Message de confirmation / erreur */}
          {status.message && (
            <div className={`status-msg ${status.error ? 'error' : 'success'}`}>
              {status.message}
            </div>
          )}
        </form>

        {/* Footer */}
            <div className="booking-footer">
            © {new Date().getFullYear()} MOTJAW <span>|</span> Hommage à <span>Linkin Park</span>
            </div>

      </div>
    </div>
  );
}