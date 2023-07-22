import React, { useState } from 'react';
import './Cards.css';

const Cards = () => {
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cin: '',
  });
  const [file, setFile] = useState(null);

  const handleInputChange = event => {

    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData.firstName);
  };

  const handleFileChange = event => {
    setFile(event.target.files[0]);
    
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file_upload', file);
    try {
      const endpoint = 'http://localhost:8000/uploadfile';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error(error);
    }
    console.log(formData);
    setShowModal(null);
    setFormData({
      firstName: '',
      lastName: '',
      cin: '',
    });
    setFile(null);
  };

  const jobs = [
    {
      id: 1,
      title: 'Web Developer',
      description: 'We are looking for a skilled web developer to join our team.',
    },
    {
      id: 2,
      title: 'Graphic Designer',
      description: 'We are seeking a talented graphic designer to create visual concepts.',
    },
    {
      id: 3,
      title: 'Marketing Manager',
      description: 'We need a marketing manager to develop strategies.',
    },
  ];

  return (
    <div className="jobs-container">
      {jobs.map(job => (
        <div key={job.id} className="job-card">
          <div className="company-info"></div>
          <h2 className="text">{job.title}</h2>
          <p className="text2">{job.description}</p>
          <button className="apply-button" onClick={() => setShowModal(job.id)}>Apply Now</button>
          {showModal === job.id && (
            <div className="modal-container">
              <div className="modal">
                <div className="modal-header">
                  <h2>Apply for {job.title}</h2>
                  <span className="close-button" onClick={() => setShowModal(null)}>×</span>
                </div>
                <form onSubmit={handleSubmit}>
                  <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </label>
                  <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </label>
                  <label>
                    CIN:
                    <input type="text" name="cin" value={formData.cin} onChange={handleInputChange} required />
                  </label>
                  <label>
                    Files:
                    <input type="file" name="file" onChange={handleFileChange} />
                  </label>
                  {file && <p>{file.name}</p>}
                  <button type="submit" className="submit-button">Deposer les fichiers</button>
                </form>
              </div>
              <span className="close-button" onClick={() => setShowModal(null)}>×</span> {/* Ajouter le bouton de fermeture ici */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cards;