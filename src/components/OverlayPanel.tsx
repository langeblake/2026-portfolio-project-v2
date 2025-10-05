'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { X } from 'lucide-react';

const panelContent: Record<string, { title: string; description: string; details: string[] }> = {
  Music: {
    title: 'Music',
    description: 'Old recordings, projects, and tracks.',
    details: [
      'Experimental soundscapes and ambient compositions',
      'Collaborative projects with artists worldwide',
      'Live performance recordings',
      'Production and mixing work',
    ],
  },
  Projects: {
    title: 'Projects',
    description: 'Things I\'ve built.',
    details: [
      'Web applications with modern frameworks',
      'Interactive 3D experiences',
      'Creative coding experiments',
      'Open-source contributions',
    ],
  },
  Travel: {
    title: 'Travel',
    description: 'Places I\'ve been.',
    details: [
      'Seoul, South Korea - Current home base',
      'Tokyo, Japan - Cultural immersion',
      'Berlin, Germany - Creative exploration',
      'Bali, Indonesia - Natural beauty',
    ],
  },
  About: {
    title: 'About Me',
    description: 'I\'m a creative developer based in Seoul.',
    details: [
      'Passionate about blending art and technology',
      'Building immersive digital experiences',
      'Exploring the intersection of music and code',
      'Always learning, always creating',
    ],
  },
};

export default function OverlayPanel() {
  const { activeNode, setActiveNode } = useAppStore();

  const content = activeNode ? panelContent[activeNode] : null;

  return (
    <AnimatePresence>
      {activeNode && content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveNode(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative max-w-2xl w-full bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 pointer-events-none" />

            {/* Close button */}
            <button
              onClick={() => setActiveNode(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label="Close panel"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Content */}
            <div className="relative p-8 md:p-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {content.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-8"
              >
                {content.description}
              </motion.p>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {content.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-400"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
