// InterviewGuard.js
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function usePreventNavigation(shouldBlock) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shouldBlock) return;

    const unblock = navigate.block?.((tx) => {
      const confirmLeave = window.confirm("You're in an interview. Do you really want to leave?");
      if (confirmLeave) {
        unblock();
        tx.retry();
      }
    });

    return () => {
      if (unblock) unblock();
    };
  }, [navigate, location, shouldBlock]);
}
