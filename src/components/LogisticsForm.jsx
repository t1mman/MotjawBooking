import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function LogisticsForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ submitting: false, message: '', error: false });

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, message: '', error: false });

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      .then(
        () => {
          setStatus({
            submitting: false,
            message: 'Horaires et logistique confirmés avec succès !',
            error: false,
          });
          formRef.current.reset();
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatus({
            submitting: false,
            message: 'Erreur lors de la transmission. Veuillez vérifier le code ou nous joindre.',
            error: true,
          });
        }
      );
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="booking-form">
      <h3 className="section-title">Liaison au dossier</h3>
      <div className="form-field">
        <label>Numéro de Booking / Dossier (ex: MJ-2026-XXXX) *</label>
        <input type="text" name="booking_id" required placeholder="MJ-2026-XXXX" />
      </div>

      <h3 className="section-title">Déroulement & Horaires de la journée</h3>
      <div className="form-grid-2">
        <div className="form-field">
          <label>Heure d'arrivée / Load-in *</label>
          <input type="time" name="time_loadin" required />
        </div>
        <div className="form-field">
          <label>Heure de la balance sonore (Soundcheck) *</label>
          <input type="time" name="time_soundcheck" required />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-field">
          <label>Heure de début du spectacle souhaitée *</label>
          <input type="time" name="time_show" required />
        </div>
        <div className="form-field">
          <label>Heure maximale de fin / Couvre-feu sonore *</label>
          <input type="time" name="time_curfew" required />
        </div>
      </div>

      <h3 className="section-title">Contacts sur place le Jour J</h3>
      <div className="form-grid-2">
        <div className="form-field">
          <label>Responsable de l'accueil / Téléphone</label>
          <input type="text" name="onsite_contact" placeholder="ex: Marc (514) 555-0199" />
        </div>
        <div className="form-field">
          <label>Responsable technique / Téléphone</label>
          <input type="text" name="onsite_tech" placeholder="ex: Dave (418) 555-0144" />
        </div>
      </div>

      <button type="submit" disabled={status.submitting} className="submit-button">
        {status.submitting ? 'Validation...' : 'Confirmer la feuille de route logistique'}
      </button>

      {status.message && (
        <div className={`status-msg ${status.error ? 'error' : 'success'}`}>
          {status.message}
        </div>
      )}
    </form>
  );
}