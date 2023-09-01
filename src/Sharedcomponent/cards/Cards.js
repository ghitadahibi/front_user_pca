import React, { useState, useEffect,  useRef  } from 'react';
import { Button, Modal,notification } from 'antd';
import { Authenticate } from '../../Auth';
import './Cards.css';
import { store } from '../..';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'


const Cards = () => {
//les usestates
  const [activeCardGroup, setActiveCardGroup] = useState(0);
  const [cardGroups, setCardGroups] = useState([]);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [viewedJobOffer, setViewedJobOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [jobTitle, setJobTitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#ff7f00' }} spin />;
  

  
  
  const state = store.getState();
  let userTokens = state.userTokens;
  console.log('userToken'+userTokens)
  
  //Postuler
  const handleModalSubmit = async (event) => {
    event.preventDefault();
    const job_name = jobTitle;
    const cv = document.getElementById('cv').files[0];
    const formData = new FormData();
    formData.append('job_name', job_name);
    formData.append('cv', cv);
    setShowModal(false);
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:10081/api/example/calculate-similarity', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userTokens[0]}`, // Utiliser le token dans l'en-tête d'autorisation
        },
        body: formData,
      });
  
      setLoading(false);
  
      if (!response.ok) {
        notification.error({
          message: 'Échec',
          description: 'Échec de la soumission vous ne disposez pas su role',
        });
        throw new Error("Une erreur est survenue lors de l'appel à l'API REST");
      }
  
      notification.success({
        message: 'Succès',
        description: 'Le formulaire a été soumis avec succès',
      });
  
      const responseBody = await response.text();
      console.log('Réponse de l\'API REST:', responseBody);
    } catch (error) {
      setLoading(false);
      console.error(error);
      
      // Use the next token if the first one is expired
      userTokens.shift();
      if (userTokens.length > 0) {
        handleModalSubmit(event);
      }
    }
  };
  



//affichage des cards avec joboffer
useEffect(() => {
  const fetchData = async () => {
    try {
       
       const adminTokens=await Authenticate();
       const response = await fetch(`http://localhost:10081/api/example/joboffer`, {
        headers: {
          Authorization: `Bearer ${adminTokens}`, // Use the access token in the fetch request
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
  // Check if the code parameter is present in the URL
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if ( !code) {
    // If the user is not authenticated and the code parameter is not present in the URL, redirect them to the Keycloak login page
    window.location.href = 'http://localhost:8080/realms/srs/protocol/openid-connect/auth?client_id=front-user&response_type=code';
  } else {
    setJobTitle(jobTitle);
    setShowModal(true);
  }
};


// modalsubmit calculate similariryscore


  const handleCloseModal = () => {
    setShowModal(false);
  };



//return
  return (
    
    <div className="carousel">
      {loading && (
      <div>
        <Spin indicator={antIcon} />
        <span>Votre demande est en cours de traitement</span>
      </div>
    )}
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

export default Cards;