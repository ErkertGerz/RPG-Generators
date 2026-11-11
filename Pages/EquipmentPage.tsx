/* БЫЛО:
import { Link } from 'react-router'
*/
// Поправил вот это, ибо карточки копипастились на каждой странице — вынес их в один компонент Components/ui/Card, так проще менять. Твой Любимый.
import Card from '../Components/ui/Card'
import BackLink from '../Components/elements/BackLink'

function EquipmentPage() {
  return (
    <main className="page">
      <h1>Снаряжение</h1>

      {/* БЫЛО:
      <p>Раздел в разработке</p>
      */}
      {/* Поправил вот это, ибо там была одна надпись «Раздел в разработке» и больше ничего — сделал карточки-ссылки (Card), которые ведут на страницы-заглушки. Твой Любимый. */}
      <section className="page-links">
        <Card
          to="/warhammer/equipment/weapons"
          title="Оружие"
          text="Перейти"
        />
        <Card
          to="/warhammer/equipment/armor"
          title="Броня"
          text="Перейти"
        />
        <Card
          to="/warhammer/equipment/gear"
          title="Прочее снаряжение"
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

export default EquipmentPage
