import { useFormStatus } from 'react-dom'

// Lee el estado del <form> padre: se deshabilita mientras se envía
const SubmitButton = ({ children, pendingText = 'Guardando...' }) => {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-indigo-800 text-white font-semibold rounded-lg px-5 py-2 hover:bg-indigo-700 disabled:opacity-60"
    >
      {pending ? pendingText : children}
    </button>
  )
}

export default SubmitButton
