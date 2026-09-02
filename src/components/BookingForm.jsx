import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function BookingForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ submitting: false, message: '', error: false });

  // Variables Vite (remplace par process.env.REACT_APP_* si tu es sous CRA)
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
            message: 'Demande envoyée avec succès! On vous revient dans les plus brefs délais.',
            error: false,
          });
          formRef.current.reset();
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setStatus({
            submitting: false,
            message: 'Erreur lors de l’envoi. Veuillez réessayer ou nous contacter sur Facebook.',
            error: true,
          });
        }
      );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Booking - MOTJAW</h2>
      <p style={styles.subtitle}>Remplis les détails ci-dessous pour vérifier nos disponibilités et obtenir un devis.</p>

      <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>
          <div style={styles.field}>
            <label style={styles.label}>Nom ou Organisation *</label>
            <input type="text" name="contact_name" required style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Courriel *</label>
            <input type="email" name="contact_email" required style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Téléphone</label>
            <input type="tel" name="contact_phone" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Type d’événement</label>
            <select name="event_type" style={styles.input}>
              <option value="Festival / Plein air">Festival / Plein air</option>
              <option value="Salle de spectacle / Bar">Salle de spectacle / Bar</option>
              <option value="Événement corporatif">Événement corporatif</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Date souhaitée *</label>
            <input type="date" name="event_date" required style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Ville / Région *</label>
            <input type="text" name="event_location" required placeholder="ex: Shawinigan, Québec, etc." style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Capacité approximative</label>
            <input type="number" name="venue_capacity" placeholder="ex: 500" style={styles.input} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Technique sur place</label>
            <select name="tech_provided" style={styles.input}>
              <option value="Son et lumières complets fournis">Son et lumières complets fournis</option>
              <option value="Sonorisation seulement">Sonorisation seulement</option>
              <option value="Éclairage seulement">Éclairage seulement</option>
              <option value="Groupe autonome requis">Le groupe doit être autonome</option>
            </select>
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Précisions (horaires, formule, besoins techniques)</label>
          <textarea name="message" rows="4" style={styles.textarea} placeholder="Partagez-nous les détails pertinents sur votre événement..." />
        </div>

        <button type="submit" disabled={status.submitting} style={styles.submitBtn}>
          {status.submitting ? 'Envoi en cours...' : 'Envoyer la demande'}
        </button>

        {status.message && (
          <div style={{ ...styles.alert, color: status.error ? '#ff4d4f' : '#52c41a' }}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '680px',
    margin: '30px auto',
    padding: '30px',
    backgroundColor: '#161616',
    borderRadius: '8px',
    color: '#f0f0f0',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
  },
  heading: {
    margin: '0 0 8px 0',
    fontSize: '26px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#fff',
    borderBottom: '2px solid #e50914',
    paddingBottom: '8px',
  },
  subtitle: {
    margin: '0 0 24px 0',
    fontSize: '14px',
    color: '#a0a0a0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ccc',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  textarea: {
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '14px',
    resize: 'vertical',
    outline: 'none',
  },
  submitBtn: {
    padding: '14px',
    backgroundColor: '#e50914',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '10px',
  },
  alert: {
    padding: '10px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '14px',
  },
};