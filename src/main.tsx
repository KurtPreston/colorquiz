import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ColorQuiz} from './ColorQuiz.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorQuiz />
  </StrictMode>,
)
