import React, { useState } from 'react';
   import { Link, useNavigate } from 'react-router-dom';
   import { API_URL } from '../config';

   // ... (keep the existing code)

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setError('');

     try {
       const response = await fetch(`${API_URL}/api/auth/login`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
       });

       const data = await response.json();

       if (!response.ok) {
         throw new Error(data.message || 'Error al iniciar sesión');
       }

       localStorage.setItem('token', data.token);
       navigate('/dashboard');
     } catch (err) {
       setError(err.message);
     }
   };

   // ... (keep the rest of the existing code)