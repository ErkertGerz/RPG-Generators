# RPG Generator (KitoGerz)

Веб-приложение с генераторами для настольных ролевых игр. Сейчас в работе раздел Warhammer 40,000 Roleplay: генератор персонажей (Астартес).

Стек: React 19, React Router, TypeScript, Vite.

> Сделал Андрей: миграция на Vite + React, автодеплой через GitHub Actions, вынос данных в `public/Data`.

## Запуск локально

Нужен Node.js 22+.

```bash
npm install
npm run dev
```

Откройте адрес, который покажет Vite (обычно `http://localhost:5173/RPG-Generators/`).

Другие команды:

```bash
npm run build     # проверка типов (tsc) + сборка в dist/
npm run preview   # посмотреть собранную версию локально
```

## Публикация на GitHub Pages

Сайт публикуется автоматически через GitHub Actions (`.github/workflows/deploy.yml`):

- **push в `main`** — сборка и публикация;
- **Pull Request в `main`** — только проверка сборки, без публикации;
- **ручной запуск** — вкладка Actions → Deploy to GitHub Pages → Run workflow.

Единоразовая настройка: **Settings → Pages → Source → GitHub Actions**.

Адрес сайта: `https://erkertgerz.github.io/RPG-Generators/`

Если репозиторий переименуют, нужно поменять `base` в `vite.config.ts`.

## Структура проекта

```text
RPG-Generators/
├── .github/workflows/deploy.yml   # автодеплой
├── public/
│   └── Data/                      # JSON с данными, копируется в сборку как есть
│       ├── Akhetyps/space_marine.json
│       ├── Gears/
│       └── Misc/
├── src/
│   ├── main.tsx, App.tsx          # точка входа, HashRouter
│   ├── hooks/useData.ts           # загрузка JSON из public/Data
│   └── types/spaceMarine.ts       # типы для space_marine.json
├── Routes/AppRoutes.tsx           # маршруты
├── Pages/                         # страницы
├── Components/
│   ├── ui/                        # универсальные компоненты: Card, Input (готовы); Button, Modal (у Олеси)
│   └── elements/                  # составные элементы: BackLink, StubPage (готовы); Header, Navigation, CharacterCard (у Олеси)
├── index.html
└── vite.config.ts
```

## Данные

JSON лежат в `public/Data/`. Читать их нужно через хук `useData`: он сам подставляет base-путь проекта, без которого на GitHub Pages файл не найдётся.

```tsx
import { useData } from '../src/hooks/useData'
import type { SpaceMarineData } from '../src/types/spaceMarine'

const { data, loading, error } = useData<SpaceMarineData>('Akhetyps/space_marine.json')
```

`space_marine.json` содержит таблицы уровней, архетипов, характеристик, списков снаряжения, навыков, талантов и трейтов.

## Текущее состояние

- Работают главная страница, раздел Warhammer 40,000, страницы «Персонажи» и «Снаряжение».
- Остальные разделы — страницы-заглушки (`StubPage`).
- Готовые компоненты: `Card`, `Input` (ui), `BackLink`, `StubPage` (elements).
- `Button`, `Modal` (ui) и `Header`, `Navigation`, `CharacterCard` (elements) — заготовки с пометкой «Отдан на работу Олесе», в работе у неё.
- Логика генерации персонажа из первой версии на чистом JS ещё не перенесена в React. Старый `app.js` можно посмотреть в истории git: `git show e7720cc:app.js`.

## Экспорт в Roll20 и Foundry VTT

Планируются два переносимых варианта:

- **JSON** — структурированные данные персонажа для хранения, обработки и дальнейшей конвертации.
- **Текстовая карточка** — её можно скопировать в Bio/Notes или описание персонажа в VTT.

Это пока не полноценный прямой импорт в лист персонажа. Roll20 поддерживает импорт только там, где его предусматривает конкретный лист персонажа или дополнительный инструмент. Foundry VTT позволяет импортировать JSON экспортированных актёров, но поля внутри `system` зависят от установленной игровой системы и её модели данных. Поэтому для прямого импорта нужно выбрать конкретную систему/лист, а затем написать адаптер, который сопоставит поля генератора с нужными полями листа.

Официальные материалы:

- Roll20 — [Character Sheet Import](https://wiki.roll20.net/Character_Sheets/Import)
- Foundry VTT — [Actors: import and export JSON](https://foundryvtt.com/article/actors/)
- Foundry VTT — [System Data Models](https://foundryvtt.com/article/system-data-models/)

## Примечание к игровым правилам

В `space_marine.json` используются архетипы и расширенные таблицы снаряжения из Excel-прототипа «Генератор Астартес Врагов». В них есть хаоситские/ренегатские варианты. Если проект должен создавать только лоялистов, эти варианты стоит отделить в самостоятельный JSON.
