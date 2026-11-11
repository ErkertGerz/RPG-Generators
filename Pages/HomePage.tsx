/* БЫЛО:
import { Link } from "react-router";
*/
// Поправил вот это, ибо карточки копипастились на каждой странице — вынес их в один компонент Components/ui/Card, так проще менять. Твой Любимый.
import Card from '../Components/ui/Card'

function HomePage() {
  return (
    <main className="page">
      <h1>RPG Generator</h1>

      <p>Игровые системы</p>

      <section className="page-links">
        {/* БЫЛО:
        <Link to="/warhammer" className="nav-card">
          <h2>Warhammer 40,000</h2>
          <p>Перейти к генераторам</p>
        </Link>

        <div className="nav-card disabled-card">
          <h2>Другие системы</h2>
          <p>Раздел в разработке</p>
        </div>
        */}
        {/* Поправил вот это, ибо карточки копипастились на каждой странице, а это и скучно, и легко накосячить — вынес их в один компонент Components/ui/Card. А «Другие системы» была просто мёртвым блоком, теперь она нормально ведёт на страницу-заглушку. Твой Любимый. */}
        <Card
          to="/warhammer"
          title="Warhammer 40,000"
          text="Перейти к генераторам"
        />
        <Card
          to="/other-systems"
          title="Другие системы"
          text="Перейти"
        />
      </section>
    </main>
  )
}

export default HomePage
