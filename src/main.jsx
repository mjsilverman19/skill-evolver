import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SkillEvolver from './SkillEvolver.jsx'

// Polyfill window.storage (used by the Artifact environment)
if (!window.storage) {
  window.storage = {
    async get(key) {
      const val = localStorage.getItem(key);
      return val !== null ? { value: val } : null;
    },
    async set(key, value) {
      localStorage.setItem(key, value);
    },
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SkillEvolver />
  </StrictMode>,
)
