// components/meet/PeoplePanel.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Crown } from 'lucide-react';
import Pill from '../../../../ui/learnhubUi/Pill';

const theme = {
  primary: '#0097B2',
  secondary: '#00B2A9',
  tertiary: '#F2F2F2',
  skeleton: '#D9D9D9',
  primary100: '#E0F2F5',
};

export default function PeoplePanel({ people, close }) {
  // Sort people to show host first, then current user, then others
  const sortedPeople = [...people].sort((a, b) => {
    if (a.role === "Host" && b.role !== "Host") return -1;
    if (b.role === "Host" && a.role !== "Host") return 1;
    if (a.isCurrentUser && !b.isCurrentUser) return -1;
    if (b.isCurrentUser && !a.isCurrentUser) return 1;
    return 0;
  });

  console.log("peeple",people)
  return (
    <AnimatePresence>
      <motion.aside
        key="people-panel"
        initial={{ x: 360, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 360, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="w-[360px] h-full border-l flex flex-col shadow-xl"
        style={{
          borderColor: theme.skeleton,
          backgroundColor: theme.tertiary
        }}
      >
        <div 
          className="p-4 flex items-center justify-between border-b"
          style={{ borderColor: theme.skeleton }}
        >
          <div className="flex items-center gap-2">
            <Users size={20} style={{ color: theme.primary }} />
            <h3 className="font-semibold text-gray-800">
              People ({people.length})
            </h3>
          </div>
          <button 
            onClick={close}
            className="text-sm px-3 py-1 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: theme.primary100,
              color: theme.primary
            }}
          >
            Close
          </button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto">
          {sortedPeople.map(person => (
            <div 
              key={person.id || person.userId}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/60 transition-colors"
            >
              <div className="relative">
                <img 
                  src={person.avatar}
                  alt={person.name || person.username || `User ${person.userId}`}
                  className="h-10 w-10 rounded-full"
                />
                {person.role === "Host" && (
                  <div 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full grid place-content-center"
                    style={{ backgroundColor: theme.secondary }}
                  >
                    <Crown size={12} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {person.name || person.username || `User ${person.userId}`}
                  {person.isCurrentUser && " (You)"}
                </div>
                <div className="text-xs text-gray-600">
                  {person.role === "Host" ? "Host" : person.isCurrentUser ? "You" : "Participant"}
                </div>
                {person.joinedAt && (
                  <div className="text-xs text-gray-500">
                    Joined {new Date(person.joinedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <Pill variant="success">Online</Pill>
                {person.role === "Host" && (
                  <Pill 
                    variant="secondary" 
                    className="text-xs"
                    style={{ 
                      backgroundColor: theme.secondary + '20',
                      color: theme.secondary 
                    }}
                  >
                    Host
                  </Pill>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}