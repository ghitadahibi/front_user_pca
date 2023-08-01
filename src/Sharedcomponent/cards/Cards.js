import { useState, useEffect } from 'react';
import './Cards.css';

function Carousel() {
  const [activeCardGroup, setActiveCardGroup] = useState(0);
  const [cardGroups, setCardGroups] = useState([]);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [viewedJobOffer, setViewedJobOffer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:10081/api/example/joboffer');
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
    };
    fetchData();
  }, []);

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
  const handleViewClick = (card) => {
    setViewedJobOffer(card);
  };

  const handleExpandClick = (cardTitle) => {
    setExpandedCards((prevExpandedCards) => {
      const newExpandedCards = new Set(prevExpandedCards);
      if (newExpandedCards.has(cardTitle)) {
        newExpandedCards.delete(cardTitle);
      } else {
        newExpandedCards.add(cardTitle);
      }
      return newExpandedCards;
    });
  };

  const handlePrevClick = () => {
    setActiveCardGroup((prevActiveCardGroup) =>
      prevActiveCardGroup === 0 ? cardGroups.length - 1 : prevActiveCardGroup - 1
    );
  };
  
  const handleNextClick = () => {
    setActiveCardGroup((prevActiveCardGroup) =>
      prevActiveCardGroup === cardGroups.length - 1 ? 0 : prevActiveCardGroup + 1
    );
  };

  const [showModal, setShowModal] = useState(false);

  const handleApplyClick = async () => {
    setShowModal(true);
  }

  const handleModalSubmit = async (event) => {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const job_name = document.getElementById('job_name').value;
    const cv = document.getElementById('cv').files[0];

    // Créer un objet FormData pour envoyer les données de formulaire et les fichiers
    const formData = new FormData();
    formData.append('job_name', job_name);
    formData.append('cv', cv);

    try {
      const response = await fetch('http://localhost:10081/api/example/calculate-similarity', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de l\'appel à l\'API REST');
      }

      const responseBody = await response.text();
      console.log('Réponse de l\'API REST :', responseBody);
    } catch (error) {
      console.error(error);
    }

    setShowModal(false);
  }

  // Bind the handleModalSubmit function to the form submission event
  //document.getElementById('form').addEventListener('submit', handleModalSubmit);

  const handleCloseModal = () => {
    setShowModal(false);
  }


  return (
    <div className="carousel">
      
      <div className="carousel-container">
      {cardGroups[activeCardGroup]?.map((card, index) => (
  <div key={index} className="carousel-card">
    <h2>{card.jobTitle}</h2>
    {renderJobDescription(card)}
    <button className="apply-btn" onClick={handleApplyClick}>Postuler maintenant</button>
  </div>
))}


      </div>
      <div className="carousel-buttons">
        <button
          className="carousel-prev-btn"
          onClick={handlePrevClick}
        >
          &#8249;
        </button>
        <button
          className="carousel-next-btn"
          onClick={handleNextClick}
        >
          &#8250;
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>

            <form onSubmit={handleModalSubmit}>
              <label htmlFor="firstName">Prénom:</label>
              <input type="text" id="firstName" name="firstName" required />
              <label htmlFor="lastName">Nom:</label>
              <input type="text" id="lastName" name="lastName" required />
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="job_name">job_name:</label>
              <input type="text" id="job_name" name="job_name" required />
              <label htmlFor="cv">CV:</label>
              <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" required />
              <button type="submit">Envoyer</button>
            </form>
            <p>*veuillez remplir les champs correctement</p>
          </div>
        </div>
      )}
       {viewedJobOffer && (
      <div className="glass-container">
        <h2>{viewedJobOffer.jobTitle}</h2>
        <p>{viewedJobOffer.jobDescription}</p>
        <button className="fermer" onClick={() => setViewedJobOffer(null)}>Fermer</button>
      </div>
    )}
    </div>
    
  );
}

export default Carousel;