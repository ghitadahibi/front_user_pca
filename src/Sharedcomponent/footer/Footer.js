import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer clearfix">
      <div className="footer_col">
        <h6 className="footer_title">NOUS CONNAÎTRE</h6>
        <ul style={{ display: 'block' }}>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/fr/espace-communication/actualités">
              Actualités
            </a>
          </li>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/FR/nous-connaître/le-groupe/vision">
              Le Groupe
            </a>
          </li>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/fr/Pages/Finance.aspx">
              Finance
            </a>
          </li>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/fr/développement-durable">
              Développement Durable
            </a>
          </li>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/FR/filiales-fondations/fondations/fondation-banque-populaire">
              Filiales et fondations
            </a>
          </li>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/fr/media-centre">
              Media center
            </a>
          </li>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/fr/carrières">
              Carrières
            </a>
          </li>
        </ul>
      </div>
      <div className="footer_col">
        <h6 className="footer_title">Particuliers</h6>
        <ul style={{ display: 'block' }}>
          <li className="footer_item footer_item--title">
            <a href="#"></a>
          </li>
          <li className="footer_item">
            <a href="https://particulier.groupebcp.com/fr/Pages/jeune.aspx">
              Jeunes
            </a>
          </li>
          <li className="footer_item">
            <a href="https://particulier.groupebcp.com/fr/Pages/Jeunes-Actifs-Seg.aspx">
              Jeunes actifs
            </a>
          </li>
          <li className="footer_item">
            <a href="https://particulier.groupebcp.com/fr/Pages/Fonctionnaires.aspx">
              Fonctionnaires
            </a>
          </li>
          <li className="footer_item">
            <a href="https://particulier.groupebcp.com/fr/Pages/professions-liberales.aspx">
              Professions libérales
            </a>
          </li>
          <li className="footer_item">
            <a href="#">Banque privée</a>
          </li>
        </ul>
      </div>
      <div className="footer_col">
        <h6 className="footer_title">Entreprises</h6>
        <ul style={{ display: 'block' }}>
          <li className="footer_item footer_item--title">
            <a href="#"></a>
          </li>
          <li className="footer_item">
            <a href="https://entreprise.groupebcp.com/fr/Pages/Auto-Entrepreneur.aspx">
              Auto-entrepreneurs
            </a>
          </li>
          <li className="footer_item">
            <a href="https://entreprise.groupebcp.com/fr/Pages/Tres-petite-entreprise.aspx">
              TPE
            </a>
          </li>
          <li className="footer_item">
            <a href="https://entreprise.groupebcp.com/fr/Pages/petite-moyenne-entreprise.aspx">
              PME
            </a>
          </li>
          <li className="footer_item">
            <a href="https://entreprise.groupebcp.com/fr/Pages/grande-entreprise.aspx">
              Grandes Entreprises
            </a>
          </li>
        </ul>
      </div>
      <div className="footer_col">
        <h6 className="footer_title">Marocains du Monde</h6>
        <ul style={{ display: 'block' }}>
          <li className="footer_item">
            <a href="https://mdm.groupebcp.com/fr/Pages/Natifs.aspx">
              Natifs
            </a>
          </li>
          <li className="footer_item">
            <a href="https://mdm.groupebcp.com/fr/Pages/Residents.aspx">
              Résidents
            </a>
          </li>
          <li className="footer_item">
            <a href="https://mdm.groupebcp.com/fr/Pages/Investisseurs.aspx">
              Investisseurs
            </a>
          </li>
          <li className="footer_item">
            <a href="https://mdm.groupebcp.com/fr/Pages/Entrepreneurs.aspx">
              Entrepreneurs
            </a>
          </li>
        </ul>
      </div>
      <div className="footer_col">
        <h6 className="footer_title">Contactez-nous</h6>
        <ul style={{ display: 'block' }}>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/fr/nous-contacter">
              Nous contacter
            </a>
          </li>
          <li className="footer_item">
            <a href="https://www.groupebcp.com/fr/faq">
              FAQ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;