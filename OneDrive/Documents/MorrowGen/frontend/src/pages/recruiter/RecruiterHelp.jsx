import React from 'react'
import { Clock, Zap } from 'lucide-react';
import ComingSoonCard from '../../card/recruiter/ComingSoonCard';



const RecruiterHelp = () => {
  return (
    <ComingSoonCard
      title="Help & Support"
      description="Get assistance with your questions and technical issues"
      icon={Clock}
    />
  )
}

export default RecruiterHelp
