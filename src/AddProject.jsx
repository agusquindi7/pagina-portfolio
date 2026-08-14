import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' // ← agregar este import
import { TECH_OPTIONS } from './technologies.js'
import { saveProject, modifyProjectById } from './firebase.js'
import './AddProject.css'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async';

function AddProject() {
const location = useLocation()
  const project = location.state
  const navigate = useNavigate()
const isEditing = !!project // ← acá, derivado directo de `project`
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [selectedTechs, setSelectedTechs] = useState([])
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

const [section, setSection] = useState('')
const [startDate, setStartDate] = useState('')
const [endDate, setEndDate] = useState('')
const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleTech = (techName) => {
    setSelectedTechs((prev) =>
      prev.includes(techName)
        ? prev.filter((t) => t !== techName)
        : [...prev, techName]
    )
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file)) // genera una URL temporal para previsualizar
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setLink('')
    setSelectedTechs([])
    setImageFile(null)
    setImagePreview(null)
    setSection('')
    setStartDate('')
    setEndDate('')
  }

  const setProjectData = (project) => {
    setTitle(project.title || '')
    setDescription(project.description || '')
    setLink(project.link || '')
    setSelectedTechs(project.selectedTechs || [])
    setImageFile(null) // no se puede previsualizar la imagen desde la URL, así que dejamos el input vacío
    setImagePreview(project.imageUrl || null)
    setSection(project.section || '')
    setStartDate(project.startDate || '')
    setEndDate(project.endDate || '')
    console.log('Project data set:', { title, description, link, selectedTechs, section, startDate, endDate })
  }

  const handleSubmit = async (e) => {
    if (!isEditing)
    {e.preventDefault()
    setIsSubmitting(true)
    await saveProject({ title, description, link, selectedTechs, section, startDate, endDate }, imageFile)
    console.log({ title, description, link, selectedTechs, imageFile, startDate, endDate, section })
    resetForm()
    toast.success('Project added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    })
    setIsSubmitting(false)}
    else{
      e.preventDefault()
      setIsSubmitting(true)
      await modifyProjectById(project.id, { title, description, link, selectedTechs, section, startDate, endDate }, imageFile)
      console.log({ title, description, link, selectedTechs, imageFile, startDate, endDate, section })
      toast.success('Project modified successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
      setIsSubmitting(false)
      switch (section) {
        case 'fullstack':
          navigate('/fullstack')
          break
        case 'backend':
          navigate('/backend')
          break
        case 'gamedev':
          navigate('/gamedev')
          break
        default:
          navigate('/')
      }
    }
  }

  useEffect(() => {
    if (project) {
      setProjectData(project)
    }
    else
    {
      resetForm()
    }
  }, [project])

  return (
    <div className="add-project-wrapper">
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{isEditing ? 'Edit Project' : 'Add Project'}</title>
        <meta name="description" content={isEditing ? 'Edit your project in the portfolio' : 'Add a new project to the portfolio'} />
      </Helmet>
      <form className="add-project-form" onSubmit={handleSubmit}>
        {isEditing ? <h1 className="title">Edit Project</h1> : <h1 className="title">Add New Project</h1>}
        <p className="subtitle">Cargá un nuevo proyecto a tu portfolio</p>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Project Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
  <label>Sección</label>
  <select
    className="section-select"
    value={section}
    onChange={(e) => setSection(e.target.value)}
  >
    <option value="" disabled>Elegí una sección</option>
    <option value="fullstack">Full Stack</option>
    <option value="backend">Back End</option>
    <option value="gamedev">Game Dev</option>
  </select>
</div>

<div className="form-group">
  <label>Fecha de inicio</label>
  <input className="section-select" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
</div>

<div className="form-group">
  <label>Fecha de fin</label>
  <input className="section-select" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
  <p className="form-hint">Dejalo vacío si el proyecto sigue en desarrollo</p>
</div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Technologies</label>
          <div className="tech-selector">
            {TECH_OPTIONS.map((tech) => {
              const Icon = tech.icon
              const isSelected = selectedTechs.includes(tech.name)
              return (
                <div
                  key={tech.name}
                  className={isSelected ? 'tech-chip selected' : 'tech-chip'}
                  onClick={() => toggleTech(tech.name)}
                >
                  {Icon ? (
                    <Icon size={18} color={tech.color} />
                  ) : (
                    <span className="tech-fallback" style={{ color: tech.color }}>
                      {tech.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span>{tech.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="form-group image-upload-area">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div className={imagePreview ? 'image-preview-box has-image' : 'image-preview-box'}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="image-preview-img" />
            ) : (
              <span className="image-preview-placeholder">Sin imagen seleccionada</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Link del proyecto</label>
          <input
            type="url"
            placeholder="https://..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className={link ? 'form-hint' : 'form-hint error'}>
            Obligatorio — sin link no se puede publicar
          </p>
        </div>

        <button type="submit" disabled={!link || isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit project'}
        </button>
      </form>
    </div>
  )
}

export default AddProject