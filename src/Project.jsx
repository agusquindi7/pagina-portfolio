import React, { useState } from 'react';
import './Project.css';
import { TECH_OPTIONS } from './technologies.js';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

function Project({ project, handleDelete, deletingId }) {
    const { user } = useAuth()
    const navigate = useNavigate()
    const isDeveloperModeOn = !!user
    const isDeleting = deletingId === project.id

    const [isImageExpanded, setIsImageExpanded] = useState(false)

    const handleEdit = () => {
        navigate('/addProject', { state: project })
    }

    return (
        <div className="project-container">
            <div className="project-left">
                <h2 className='project-title'>{project.title}</h2>
                <p className="project-description">
                    {project.description}
                </p>
            </div>

            <div className="project-right">
                <p className="project-technologies">Technologies used:</p>
                <div className="tech-icon-grid">
                    {project.selectedTechs?.map((techName, index) => {
                        const techData = TECH_OPTIONS.find((t) => t.name === techName)
                        if (!techData) return null
                        const Icon = techData.icon
                        return (
                            <div key={index} className="tech-icon-item" title={techData.name}>
                                {Icon ? (
                                    <Icon size={48} color={techData.color} />
                                ) : (
                                    <span className="tech-fallback" style={{ color: techData.color }}>
                                        {techData.name.slice(0, 2).toUpperCase()}
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>

                <img
                    className='project-img'
                    src={project.imageUrl}
                    alt="Project Image"
                    onClick={() => setIsImageExpanded(true)}
                    style={{ cursor: 'zoom-in' }}
                />

                <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-link">
                    View Project
                </a>

                {isDeveloperModeOn && (
                    <button className="delete-button" onClick={() => handleDelete(project.id)} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : <FaTrashAlt size={18} color="#ff6b6b" />}
                    </button>
                )}
                {isDeveloperModeOn && (
                    <button className="delete-button" onClick={handleEdit}>
                        <FaEdit size={18} color="#ffcb6b" />
                    </button>
                )}
            </div>

            {isImageExpanded && (
                <div className="image-modal-overlay" onClick={() => setIsImageExpanded(false)}>
                    <img
                        className="image-modal-full"
                        src={project.imageUrl}
                        alt="Project Full View"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}

export default Project;