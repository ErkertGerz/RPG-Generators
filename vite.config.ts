import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Сделал Андрей.
  // base = имя репозитория, иначе на GitHub Pages (erkertgerz.github.io/RPG-Generators/) не найдутся скрипты и стили.
  // Если репозиторий переименуют — поменять здесь тоже.
  base: '/RPG-Generators/',
})
