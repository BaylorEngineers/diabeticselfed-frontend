import { useState, useCallback } from 'react';
import environment from '../../environment';

export const useContentAreas = () => {
  const [contentAreas, setContentAreas] = useState([]);

  const fetchContentAreas = useCallback(async () => {
    try {
      const response = await fetch(`${environment.baseUrl}/api/content-areas`);
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      const data = await response.json();
      setContentAreas(data);
      console.log('Content areas fetched:', data); 
    } catch (error) {
      console.error('Error fetching content areas:', error);
    }
  }, []);

  return { contentAreas, fetchContentAreas };
};
