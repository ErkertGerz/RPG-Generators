import { Routes, Route } from 'react-router'

import HomePage from '../Pages/HomePage'
import WarhammerPage from '../Pages/WarhammerPage'
import CharactersPage from '../Pages/CharactersPage'
import EquipmentPage from '../Pages/EquipmentPage'
import NotFoundPage from '../Pages/NotFoundPage'
// Тут я подключил StubPage — это одна общая страница-заглушка, чтобы не плодить кучу одинаковых файлов. Твой Любимый.
import StubPage from '../Components/elements/StubPage'

{/* Поправил все руты, добавил маршрут на страницу-заглушку, чтобы по кнопке было куда перейти. Твой Любимый. */}
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/other-systems"
        element={<StubPage title="Другие системы" backTo="/" backLabel="На главную" />}
      />

      <Route
        path="/warhammer"
        element={<WarhammerPage />}
      />

      <Route
        path="/warhammer/characters"
        element={<CharactersPage />}
      />
      <Route
        path="/warhammer/characters/space-marine"
        element={<StubPage title="Космодесант" backTo="/warhammer/characters" backLabel="К персонажам" />}
      />
      <Route
        path="/warhammer/characters/imperial-guard"
        element={<StubPage title="Имперская гвардия" backTo="/warhammer/characters" backLabel="К персонажам" />}
      />
      <Route
        path="/warhammer/characters/eldar"
        element={<StubPage title="Эльдары" backTo="/warhammer/characters" backLabel="К персонажам" />}
      />
      <Route
        path="/warhammer/equipment"
        element={<EquipmentPage />}
      />
      <Route
        path="/warhammer/equipment/weapons"
        element={<StubPage title="Оружие" backTo="/warhammer/equipment" backLabel="К снаряжению" />}
      />
      <Route
        path="/warhammer/equipment/armor"
        element={<StubPage title="Броня" backTo="/warhammer/equipment" backLabel="К снаряжению" />}
      />
      <Route
        path="/warhammer/equipment/gear"
        element={<StubPage title="Прочее снаряжение" backTo="/warhammer/equipment" backLabel="К снаряжению" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
