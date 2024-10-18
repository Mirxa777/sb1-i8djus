import React, { useState } from 'react';
   import { Link, useNavigate } from 'react-router-dom';
   import { API_URL } from '../config';

   // ... (keep the existing code)

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setError('');

     if (password !== confirmPassword) {
       setError('Las contraseñas no coinciden');
       return;
     }

     try {
       const response = await fetch(`${API_URL}/api/auth/register`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name, email, password }),
       });

       const data = await response.json();

       if (!response.ok) {
         throw new Error(data.message || 'Error al registrar usuario');
       }

       navigate('/login');
     } catch (err) {
       setError(err.message);
     }
   };

   // ... (keep the rest of the existing code)