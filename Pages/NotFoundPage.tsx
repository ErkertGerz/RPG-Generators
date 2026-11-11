
import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <main className="page">
      <h1>404</h1>

      <p>Такой страницы не существует.</p>

      <Link to="/" className="back-link">
        Вернуться на главную
      </Link>
    </main>
  )
}

export default NotFoundPage
