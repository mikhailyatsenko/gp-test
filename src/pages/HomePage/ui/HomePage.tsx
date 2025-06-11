import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //TODO: check auth here
    navigate('/auth');
  }, [navigate]);

  return <div>HOME PAGE</div>;
};
