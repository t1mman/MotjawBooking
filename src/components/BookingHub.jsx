import { useState } from 'react';
import QuoteRequestForm from './QuoteRequestForm';
import LogisticsForm from './LogisticsForm';
import logoMotjaw from '../assets/motjaw-logo.png';
import '../styles/BookingForm.css';

export default function BookingHub() {
  const [activeTab, setActiveTab] = useState('quote'); // 'quote' | 'logistics'

  return (
    <div className="booking-page-wrapper">
      <div className="booking-card">
        {/* Header commun */}
        <div className="booking-header">
          <img src={logoMotjaw} alt="MOTJAW - Linkin Park Tribute" className="band-logo" />
          <h1 className="booking-title">PORTAIL SPECTACLE - MOTJAW</h1>
        </div>

        {/* Onglets de navigation */}
        <div className="tab-container">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'quote' ? 'active' : ''}`}
            onClick={() => setActiveTab('quote')}
          >
            1. Demande de Soumission
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'logistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('logistics')}
          >
            2. Logistique & Horaires Jour J
          </button>
        </div>

        {/* Affichage du formulaire sélectionné */}
        {activeTab === 'quote' ? <QuoteRequestForm /> : <LogisticsForm />}

        {/* Pied de page */}
        <div className="booking-footer">
          © {new Date().getFullYear()} MOTJAW <span>|</span> Hommage à <span>Linkin Park</span>
        </div>
      </div>
    </div>
  );
}