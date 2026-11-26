import { Outlet } from 'react-router-dom'

function SectionCatalogo() {
  return (
    <section>
      <h2>Vitrina de productos</h2>
      <Outlet />
    </section>
  )
}

export default SectionCatalogo
