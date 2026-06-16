import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Solutions from './pages/Solutions.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import CaseStudyDetail from './pages/CaseStudyDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'case-studies', element: <CaseStudies /> },
      { path: 'case-studies/:slug', element: <CaseStudyDetail /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])
