/* БЫЛО:
import { Link } from 'react-router'
*/
// Поправил вот это, ибо карточки копипастились на каждой странице — вынес их в один компонент Components/ui/Card, так проще менять. Твой Любимый.
import Card from '../Components/ui/Card'
import BackLink from '../Components/elements/BackLink'

function WarhammerPage() {
  return (
    <main className="page">
      <h1>Warhammer 40,000</h1>

      <p>Выберите категорию генераторов.</p>

      <section className="page-links">
        {/* БЫЛО:
        <Link
          to="/warhammer/characters"
          className="nav-card"
        >
          <h2>Персонажи</h2>
          <p>Генераторы персонажей</p>
        </Link>

        <Link
          to="/warhammer/equipment"
          className="nav-card"
        >
          <h2>Снаряжение</h2>
          <p>Генераторы оружия и экипировки</p>
        </Link>
        */}
        {/* Поправил вот это, ибо карточки копипастились на каждой странице — вынес их в один компонент Components/ui/Card, так проще менять. Твой Любимый. */}
        <Card
          to="/warhammer/characters"
          title="Персонажи"
          text="Генераторы персонажей"
        />
        <Card
          to="/warhammer/equipment"
          title="Снаряжение"
          text="Генераторы оружия и экипировки"
        />
      </section>

      {/* БЫЛО:
      <Link to="/" className="back-link">
        ← На главную
      </Link>
      */}
      {/* Поправил вот это, ибо ссылка «назад» тоже копипастилась на каждой странице — вынес её в Components/elements/BackLink. Твой Любимый. */}
      <BackLink to="/" label="На главную" />
    </main>
  )
}

export default WarhammerPage
