import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

import { ToastMessages, useToast } from '../../../hooks/toast'

import { Container } from './styles'

interface ToastProps {
  data: ToastMessages
  style: object
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Toast: React.FC<ToastProps> = ({ data, style }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(data.id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [data.id, removeToast])

  return (
    <Container
      type={data.type}
      hasdescription={Number(!!data.description)}
      style={style}
    >
      {icons[data.type || 'info']}
      <div>
        <strong>{data.title}</strong>
        {data.description && <p>{data.description}</p>}
      </div>
      <button onClick={() => removeToast(data.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast
