/* БЫЛО:
import { Link } from "react-router";
*/
// Поправил вот это, ибо карточки копипастились на каждой странице — вынес их в один компонент Components/ui/Card, так проще менять. Твой Любимый.
import Card from '../Components/ui/Card'
import BackLink from '../Components/elements/BackLink'

function CharactersPage() {
  return (
    <main className="page">
      <h1>Генераторы персонажей</h1>

      <section className="page-links">
        {/* БЫЛО:
        <div className="nav-card">
          <h2>Космодесант</h2>
          <p>Раздел в разработке</p>
        </div>

        <div className="nav-card">
          <h2>Имперская гвардия</h2>
          <p>Раздел в разработке</p>
        </div>

        <div className="nav-card">
          <h2>Эльдары</h2>
          <p>Раздел в разработке</p>
        </div>
        */}
        {/* Поправил вот это, ибо карточки были просто блоками, на них нельзя было нажать — сделал из них ссылки (Card), которые ведут на страницы-заглушки. Твой Любимый. */}
        <Card
          to="/warhammer/characters/space-marine"
          title="Космодесант"
          text="Перейти"
        />
        <Card
          to="/warhammer/characters/imperial-guard"
          title="Имперская гвардия"
          text="Перейти"
        />
        <Card
          to="/warhammer/characters/eldar"
          title="Эльдары"
          text="Перейти"
        />
      </section>

      {/* БЫЛО:
      <Link to="/warhammer" className="back-link">
        ← Назад к Warhammer
      </Link>
      */}
      {/* Поправил вот это, ибо ссылка «назад» тоже копипастилась на каждой странице — вынес её в Components/elements/BackLink. Твой Любимый. */}
      <BackLink to="/warhammer" label="Назад к Warhammer" />
    </main>
  )
}

export default CharactersPage
