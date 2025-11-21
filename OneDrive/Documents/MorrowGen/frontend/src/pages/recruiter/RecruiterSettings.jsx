import React from 'react'
import { Clock, Zap } from 'lucide-react';
import ComingSoonCard from '../../card/recruiter/ComingSoonCard';

const RecruiterSettings = () => {
  return (
   <ComingSoonCard
      title="Settings"
      description="Manage your account, preferences, and security"
      icon={Clock}
    />
  )
}

export default RecruiterSettings
