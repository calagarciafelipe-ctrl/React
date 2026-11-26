import ClipLoader from 'react-spinners/ClipLoader'

const Spinner = () => (
  <div className="flex justify-center py-16" role="status" aria-label="Cargando">
    <ClipLoader color="#312e81" size={48} />
  </div>
)

export default Spinner
