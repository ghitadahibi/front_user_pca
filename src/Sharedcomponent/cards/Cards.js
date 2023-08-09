import React, { useState, useEffect,  useRef  } from 'react';
import { Button, Modal,notification } from 'antd';

import './Cards.css';

function Carousel() {
  const [activeCardGroup, setActiveCardGroup] = useState(0);
  const [cardGroups, setCardGroups] = useState([]);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [viewedJobOffer, setViewedJobOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [jobTitle, setJobTitle] = useState(null);
  const [accessTokens, setAccessTokens] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async () => {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', 'front-user');
      params.append('client_secret', 'J5RDSc7Doy3MEnOqCxZylP9TsLgBoYQ8');
  
      const response = await fetch('http://localhost:8080/realms/srs/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de l'authentification avec Keycloak: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Erreur lors de l\'authentification avec Keycloak:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await authenticate(); // Get the access token from the authenticate function
        setAccessTokens(prevAccessTokens => [...prevAccessTokens, token]);
        const response = await fetch(`http://localhost:10081/api/example/joboffer`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the access token in the fetch request
          },
        });
  
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des données: ${response.statusText}`);
        }
  
        const data = await response.json();
        const transformedData = data.map((jobOffer) => ({
          jobTitle: jobOffer.jobOfferName,
          jobDescription: jobOffer.content,
        }));
        const cardGroups = [];
        for (let i = 0; i < transformedData.length; i += 3) {
          cardGroups.push(transformedData.slice(i, i + 3));
        }
        setCardGroups(cardGroups);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (accessTokens.length > 0) {
      console.log(accessTokens[0]);
    }
  }, [accessTokens]);
  
  
  // render job description

  const renderJobDescription = (card) => {
    const maxLines = 4;
    const isExpanded = expandedCards.has(card.jobTitle);
    const descriptionLines = card.jobDescription.split('\n');
    const content = isExpanded ? card.jobDescription : descriptionLines.slice(0, maxLines).join('\n');
    return (
      <div>
        <p>{content}</p>
        {descriptionLines.length > maxLines && (
          <a className="voir" href="#" onClick={() => handleViewClick(card)}>
            {isExpanded ? 'Voir moins' : 'Voir offre complet'}
          </a>
        )}
      </div>
    );
  };
// viewjoboffer
  const handleViewClick = (card) => {
    setViewedJobOffer(card);
  };

  
//prevclick
  const handlePrevClick = () => {
    setActiveCardGroup((prevActiveCardGroup) =>
      prevActiveCardGroup === 0 ? cardGroups.length - 1 : prevActiveCardGroup - 1
    );
  };
//nextclick
  const handleNextClick = () => {
    setActiveCardGroup((prevActiveCardGroup) =>
      prevActiveCardGroup === cardGroups.length - 1 ? 0 : prevActiveCardGroup + 1
    );
  };

//applyclick
  const handleApplyClick = (jobTitle) => {
    setJobTitle(jobTitle);
    setShowModal(true);
  };


// modalsubmit calculate similariryscore
const handleModalSubmit = async (event) => {
  event.preventDefault();

  // Récupérer les valeurs du formulaire
  const job_name = jobTitle;
  const cv = document.getElementById('cv').files[0];

  // Créer un objet FormData pour envoyer les données de formulaire et les fichiers
  const formData = new FormData();
  formData.append('job_name', job_name);
  formData.append('cv', cv);
   // Close modal
   setShowModal(false);

   // Display success message
   notification.success({
     message: 'Succès',
     description: 'Le formulaire a été soumis avec succès',
   });

  try {
    const response = await fetch('http://localhost:10081/api/example/calculate-similarity', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Une erreur est survenue lors de l'appel à l'API REST");
    }

    const responseBody = await response.text();
    console.log('Réponse de l\'API REST:', responseBody);

   
  } catch (error) {
    console.error(error);
  }
};

  const handleCloseModal = () => {
    setShowModal(false);
  };



//return
  return (
    <div className="carousel">
     
      <div className="carousel-container">
        {cardGroups[activeCardGroup]?.map((card, index) => (
          <div key={index} className="carousel-card">
            <h2>{card.jobTitle}</h2>
            {renderJobDescription(card)}
            <button className="apply-btn" onClick={() => handleApplyClick(card.jobTitle)}>
              Postuler maintenant
            </button>
          </div>
        ))}
      </div>
      <div className="carousel-buttons">
        <button className="carousel-prev-btn" onClick={handlePrevClick}>
          &#8249;
        </button>
        <button className="carousel-next-btn" onClick={handleNextClick}>
          &#8250;
        </button>
      </div>
      <Modal
  title="Postuler"
  visible={showModal}
  onCancel={handleCloseModal}
  footer={[
    <Button key="cancel" className='annuler' onClick={handleCloseModal}>
      Annuler
    </Button>,
    <Button key="postuler" className='orange' onClick={handleModalSubmit}  >
      Postuler
    </Button>,
  ]}
>
        <form >
          <div className="form-group">
            <label htmlFor="firstName">Prénom:</label>
            <input type="text" id="firstName" name="firstName" required placeholder="Prénom" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom:</label>
            <input type="text" id="lastName" name="lastName" required placeholder="Nom" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" required placeholder="E-mail" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="cv">Choisir un CV:</label>
            <input type="file" id="cv" accept=".pdf,.doc,.docx" required className="form-input" />
          </div>

        </form>
      </Modal>
      {viewedJobOffer && (
        <Modal
          title={viewedJobOffer.jobTitle}
          visible={true}
          onCancel={() => setViewedJobOffer(null)}
          footer={null}
        >
          <p>{viewedJobOffer.jobDescription}</p>
        </Modal>
      )}
    </div>
  );
}

export default Carousel;