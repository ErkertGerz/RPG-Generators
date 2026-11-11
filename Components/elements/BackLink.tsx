// Сделал Андрей.
// Ссылка «← Назад», чтобы не писать её руками на каждой странице.

import { Link } from 'react-router'

type BackLinkProps = {
  to: string
  label: string
}

function BackLink({ to, label }: BackLinkProps) {
  return (
    <Link to={to} className="back-link">
      ← {label}
    </Link>
  )
}

export default BackLink
