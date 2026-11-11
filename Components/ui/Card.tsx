// Сделал Андрей.
// Универсальная карточка: если передать `to`, она превращается в ссылку на страницу,
// если нет — остаётся обычным блоком. Используется на всех страницах вместо копипасты.

import type { ReactNode } from 'react'
import { Link } from 'react-router'

type CardProps = {
  title: string
  text: string
  /** Если передан — карточка становится ссылкой на страницу */
  to?: string
  children?: ReactNode
}

function Card({ title, text, to }: CardProps) {
  const content = (
    <>
      <h2>{title}</h2>
      <p>{text}</p>
    </>
  )

  if (to) {
    return (
      <Link to={to} className="nav-card">
        {content}
      </Link>
    )
  }

  return <div className="nav-card disabled-card">{content}</div>
}

export default Card
