import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HeaderFormulario from './Componentes/HeaderFormulario'
import Header from './Componentes/Header'
import FormularioSolicitud from './Componentes/FormularioSolicitud'
import Sidebar from './Componentes/Sidebar'
import Botones from './Componentes/Botones'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header></Header>
    <Sidebar></Sidebar>
    <HeaderFormulario></HeaderFormulario>
    <FormularioSolicitud></FormularioSolicitud>
    <Botones></Botones>
  </StrictMode>,
)
