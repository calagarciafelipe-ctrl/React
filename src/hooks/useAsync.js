import { useEffect, useState } from 'react'

// Ejecuta una función asíncrona al montar y expone data, loading y error
const useAsync = (asyncFn) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    asyncFn()
      .then((result) => active && setData(result))
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [asyncFn])

  return { data, setData, loading, error }
}

export default useAsync
