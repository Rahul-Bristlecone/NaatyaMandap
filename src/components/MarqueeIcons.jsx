export default function MarqueeIcons({ items }) {
  if (!items.length) {
    return null
  }

  const loopItems = [...items, ...items]

  return (
    <div className="marquee-shell" aria-label="Icons marquee">
      <div className="marquee-track">
        {loopItems.map((icon, index) => (
          <div className="marquee-item" key={`${icon.id}-${index}`}>
            <p className="marquee-name">{icon.name}</p>
            <p>{icon.era}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
