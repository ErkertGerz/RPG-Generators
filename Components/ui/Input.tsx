// Сделал Андрей.
// Универсальное поле ввода: подпись + само поле + (по желанию) текст ошибки.
// Принимает все обычные атрибуты <input> (type, value, onChange, placeholder, disabled, ...),
// поэтому подходит и для текста, и для чисел, и для пароля — отдельные компоненты не нужны.
// Подпись связана с полем через id (useId), так клик по подписи ставит курсор в поле,
// а скринридер зачитывает и подпись, и ошибку.

import { useId } from 'react'
import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  /** Подпись над полем */
  label: string
  /** Текст ошибки: если передан — поле подсвечивается и ошибка показывается под ним */
  error?: string
}

function Input({ label, error, id, className, ...rest }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`

  return (
    <div className="field">
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>

      <input
        {...rest}
        id={inputId}
        className={className ? `field-input ${className}` : 'field-input'}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />

      {/* span, а не p: у `.page p` в index.css свой цвет текста, он бы перебил цвет ошибки */}
      {error && (
        <span id={errorId} className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

export default Input
