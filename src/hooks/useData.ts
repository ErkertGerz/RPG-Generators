// Сделал Андрей.
// Загрузка JSON из public/Data. Путь строится от BASE_URL (в vite.config.ts это '/RPG-Generators/'),
// иначе на GitHub Pages запрос на '/Data/...' вернёт 404.
//
// Пример:
//   const { data, loading, error } = useData<SpaceMarineData>('Akhetyps/space_marine.json')

import { useEffect, useState } from 'react'

type DataState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

/** Полный URL файла из public/Data с учётом base-пути проекта */
export function dataUrl(path: string): string {
  return `${import.meta.env.BASE_URL}Data/${path.replace(/^\/+/, '')}`
}

/** Загружает JSON по пути относительно public/Data. Сам отменяет запрос при смене пути или уходе со страницы. */
export function useData<T>(path: string): DataState<T> {
  const [state, setState] = useState<DataState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    const url = dataUrl(path)

    setState({ data: null, loading: true, error: null })

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Не удалось загрузить ${url} (HTTP ${res.status})`)
        return res.json() as Promise<T>
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        const message = err instanceof Error ? err.message : String(err)
        setState({ data: null, loading: false, error: message })
      })

    return () => controller.abort()
  }, [path])

  return state
}
