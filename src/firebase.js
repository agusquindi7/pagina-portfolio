import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDogZhsXRGVn6CJu5uK5IzsZQDz9B4YzHE",
  authDomain: "pagina-portfolio-1d41b.firebaseapp.com",
  projectId: "pagina-portfolio-1d41b",
  storageBucket: "pagina-portfolio-1d41b.firebasestorage.app",
  messagingSenderId: "220934159708",
  appId: "1:220934159708:web:2810c5e43bd62963af5599",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const saveProject = async (project, imageFile) => {
  const imageUrl = await uploadImageToCloudinary(imageFile);

  const docRef = await addDoc(collection(db, "projects"), {
    ...project,
    imageUrl,
  });

  return docRef.id;
};

export const deleteById = async (id) => {
  const docRef = doc(db, "projects", id);
  await deleteDoc(docRef);
};

// funcion para modificar un proyecto por su id, si se pasa un archivo de imagen, se sube a cloudinary y se actualiza la url en el proyecto
// si no se pasa un archivo de imagen, solo se actualizan los datos del proyecto
export const modifyProjectById = async (id, updatedProject, imageFile) => {
  const docRef = doc(db, "projects", id); // referencia al documento del proyecto a modificar

  if (imageFile) {
    const imageUrl = await uploadImageToCloudinary(imageFile);
    await updateDoc(docRef, { ...updatedProject, imageUrl }); // actualiza el proyecto con la nueva url de la imagen
  } else {
    await updateDoc(docRef, updatedProject); // actualiza el proyecto sin cambiar la url de la imagen
  }
};

export const uploadImageToCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "portfolio_unsigned"); // el preset que creaste

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/u0qjueik/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();
  return data.secure_url; // esta es la URL pública de la imagen ya subida
};
