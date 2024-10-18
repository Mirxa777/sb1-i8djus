import React, { useState, useEffect } from 'react';
   import { PlusCircle, Edit, Trash2, CheckCircle } from 'lucide-react';
   import { API_URL } from '../config';

   // ... (keep the existing code)

   const fetchHabits = async () => {
     try {
       const response = await fetch(`${API_URL}/api/habits`, {
         headers: {
           'x-auth-token': localStorage.getItem('token') || '',
         },
       });
       if (!response.ok) throw new Error('Error al obtener hábitos');
       const data = await response.json();
       setHabits(data);
     } catch (error) {
       console.error('Error:', error);
     }
   };

   const fetchCategories = async () => {
     try {
       const response = await fetch(`${API_URL}/api/categories`, {
         headers: {
           'x-auth-token': localStorage.getItem('token') || '',
         },
       });
       if (!response.ok) throw new Error('Error al obtener categorías');
       const data = await response.json();
       setCategories(data);
     } catch (error) {
       console.error('Error:', error);
     }
   };

   const handleAddHabit = async (e: React.FormEvent) => {
     e.preventDefault();
     try {
       const response = await fetch(`${API_URL}/api/habits`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'x-auth-token': localStorage.getItem('token') || '',
         },
         body: JSON.stringify(newHabit),
       });
       if (!response.ok) throw new Error('Error al añadir hábito');
       const data = await response.json();
       setHabits([...habits, data]);
       setNewHabit({ nombre: '', descripcion: '', categoria_id: '' });
       setIsAdding(false);
     } catch (error) {
       console.error('Error:', error);
     }
   };

   const handleDeleteHabit = async (id: number) => {
     try {
       const response = await fetch(`${API_URL}/api/habits/${id}`, {
         method: 'DELETE',
         headers: {
           'x-auth-token': localStorage.getItem('token') || '',
         },
       });
       if (!response.ok) throw new Error('Error al eliminar hábito');
       setHabits(habits.filter(habit => habit.id !== id));
     } catch (error) {
       console.error('Error:', error);
     }
   };

   // ... (keep the rest of the existing code)