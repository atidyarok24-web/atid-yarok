interface SectionHeaderProps {
  label: string
  heading: string
  body?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({ label, heading, body, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center mx-auto' : ''} max-w-[700px] ${centered ? '' : 'mb-8'}`}>
      <span className={`font-label block mb-3 ${light ? 'text-green-400' : 'text-green-700'}`}>
        <span className="text-green-500 mr-1">&#9679;</span> {label}
      </span>
      <h2 className={`font-heading-xl mb-4 ${light ? 'text-white' : 'text-green-900'}`}>
        {heading}
      </h2>
      {body && (
        <p className={`font-body ${light ? 'text-green-300' : 'text-stone-500'}`}>
          {body}
        </p>
      )}
    </div>
  )
}
