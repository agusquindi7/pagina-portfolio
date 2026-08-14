# Agustín Quindimil — Developer Portfolio

A personal portfolio website built to showcase my work as a Full Stack Developer, Back End Developer, and Game Developer. Recruiters and visitors can browse projects organized by category, each with a description, tech stack, and a live project link.

**[Live site →](https://agusquindi7.github.io/pagina-portfolio)**

## What this is

This isn't just a static portfolio — it's a small full-stack application in itself. As the site owner, I can log in through a hidden admin mode and manage my project catalog directly from the browser: add new projects, edit existing ones, or remove them, with changes reflected instantly across the site. No redeploys needed to update content.

## Features

- **Category-based project browsing** — Full Stack, Back End, and Game Dev sections, each pulling only the relevant projects from the database
- **Admin mode** — authenticated project management (create, edit, delete) restricted to the site owner
- **Dynamic backgrounds** — animated gradient that shifts color per section and rotates continuously
- **Tech stack icons** — each project displays icons for the technologies used, pulled from a shared catalog
- **Responsive design** — adapts from desktop down to mobile
- **SEO-friendly** — per-page titles and meta tags via React Helmet

## Tech Stack

**Frontend**

- React 19 + Vite
- React Router for client-side routing
- React Helmet Async for per-page metadata
- React Icons (Simple Icons set) for technology badges
- React Toastify for notifications

**Backend / Data**

- Firebase Authentication — admin login
- Firebase Firestore — project data storage
- Cloudinary — image hosting for project screenshots

**Deployment**

- GitHub Pages

## Project Structure

```
src/
├── assets/              # Static images and icons
├── Navbar.jsx           # Site navigation
├── Project.jsx          # Individual project card component
├── Home.jsx             # Landing page
├── FullStackPage.jsx    # Full Stack projects section
├── BackEndPage.jsx      # Back End projects section
├── GameDevPage.jsx      # Game Dev projects section
├── AddProject.jsx       # Admin form — create and edit projects
├── Login.jsx            # Admin authentication
├── useAuth.js           # Auth state hook
├── technologies.js      # Tech icon catalog used across the app
├── firebase.js          # Firebase config and data-layer functions
└── App.jsx              # Root component, routing, and global background logic
```

## Running Locally

```bash
git clone https://github.com/agusquindi7/pagina-portfolio.git
cd pagina-portfolio
npm install
npm run dev
```

You'll need your own Firebase project and Cloudinary account configured in `src/firebase.js` and the upload preset used in `saveProject`/`updateProjectById`.

## About Me

I'm a Full Stack Development student based in Buenos Aires, Argentina, currently working at HTS Espacios Inteligentes on AV/home automation integration, and building an indie game (TFOT) as my university thesis project. This portfolio is both a showcase of that work and a learning project in its own right — built from scratch to practice React, Firebase, and full-stack thinking end to end.
