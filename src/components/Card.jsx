const Card = ({ children, bg = 'bg-white', className = '' }) => (
  <div className={`${bg} rounded-2xl p-6 shadow ${className}`}>{children}</div>
)

export default Card
