import { useState } from 'react';
import './Cards.css';

function Carousel() {
  const [activeCardGroup, setActiveCardGroup] = useState(0);
  const cardGroups = [
    [
      {
        jobTitle: 'Développeur Web Full Stack',
        jobDescription:
          'Nous recherchons un développeur Web Full Stack pour rejoindre notre équipe et travailler sur des projets passionnants.',
      },
      {
        jobTitle: 'Designer UX/UI',
        jobDescription:
          'Nous recherchons un designer UX/UI pour rejoindre notre équipe et travailler sur la conception d\'interfaces utilisateur intuitives et élégantes.',
      },
      {
        jobTitle: 'Spécialiste Marketing Digital',
        jobDescription:
          'Nous recherchons un spécialiste du marketing numérique pour rejoindre notre équipe et mettre en œuvre des campagnes de marketing créatives et efficaces.',
      },
    ],
    [
      {
        jobTitle: 'Développeur Mobile iOS',
        jobDescription:
          'Nous recherchons un développeur Mobile iOS pour rejoindre notre équipe et travailler sur des applications mobiles pour iOS.',
      },
      {
        jobTitle: 'Développeur Front-End',
        jobDescription:
          'Nous recherchons un développeur Front-End pour rejoindre notre équipe et travailler sur la création d\'interfaces utilisateur pour le Web.',
      },
      {
        jobTitle: 'Analyste de Données',
        jobDescription:
          'Nous recherchons un analyste de données pour rejoindre notre équipe et aider à l\'analyse et l\'interprétation de données importantes pour l\'entreprise.',
      },
    ],
  ];

  const handlePrevClick = () => {
    setActiveCardGroup((activeCardGroup - 1 + cardGroups.length) % cardGroups.length);
  };

  const handleNextClick = () => {
    setActiveCardGroup((activeCardGroup + 1) % cardGroups.length);
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
        {cardGroups[activeCardGroup].map((card, index) => (
          <div key={index} className="carousel-card">
            <h2>{card.jobTitle}</h2>
            <p>{card.jobDescription}</p>
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
            
            <form  onSubmit={handleModalSubmit}>
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
    </div>
  );
}

export default Carousel;