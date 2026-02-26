import './DiscoverList.css'

const tips = [
  {
    id: 1,
    title: 'Water your plants in the morning',
    description: 'The best time to water your plants is early in the morning, when temperatures are cooler and evaporation is lower.',
  },
  {
    id: 2,
    title: 'Use room-temperature water',
    description: 'Cold water can shock your plant roots. Use room-temperature water to avoid thermal stress.',
  },
  {
    id: 3,
    title: "Don't overwater",
    description: 'Too much water can harm your plants. Make sure the soil is dry to the touch before watering again.',
  },
  {
    id: 4,
    title: 'Check the leaves',
    description: 'Drooping or yellowing leaves can be a sign that your plant is getting too much or too little water.',
  },
]

export function DiscoverList() {
    return (
        <section className="my-4 container tricks-wrapper">
            <h2>Plant care tips</h2>
            <div className="row">
                {tips.map((tip) => {
                return (
                    <div key={tip.id} className="col-12 col-md-6 mb-3">
                    <div className="card h-100">
                        <div className="card-body">
                        <h5 className="card-title">{tip.title}</h5>
                        <p className="card-text">{tip.description}</p>
                        </div>
                    </div>
                    </div>
                )
                })}
            </div>
        </section>
    )
}

