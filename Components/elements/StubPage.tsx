// Сделал Андрей.
// Общая страница-заглушка для разделов, которые пока не готовы: меняется только заголовок и куда вести «назад».

import BackLink from './BackLink'

type StubPageProps = {
  title: string
  backTo: string
  backLabel: string
}

/** Универсальная страница-заглушка для разделов, которые ещё не сделаны */
function StubPage({ title, backTo, backLabel }: StubPageProps) {
  return (
    <main className="page">
      <h1>{title}</h1>
      <p>Здесь скоро появится содержимое.</p>
      <BackLink to={backTo} label={backLabel} />
    </main>
  )
}

export default StubPage
