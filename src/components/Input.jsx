// React 19: "ref" llega como una prop normal, sin forwardRef
const Input = ({ label, id, error, ref, as: Tag = 'input', children, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold mb-1">
      {label}
    </label>
    <Tag
      id={id}
      ref={ref}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-lg border px-3 py-2 bg-white ${error ? 'border-red-500' : 'border-stone-300'}`}
      {...props}
    >
      {children}
    </Tag>
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-600 mt-1">
        {error}
      </p>
    )}
  </div>
)

export default Input
