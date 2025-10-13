import './TricksAndAdvicesList.css'

const tips = [
  {
    id: 1,
    title: 'Riega tus plantas por la mañana',
    description: 'El mejor momento para regar tus plantas es temprano en la mañana, cuando las temperaturas son más frescas y la evaporación es menor.',
  },
  {
    id: 2,
    title: 'Usa agua a temperatura ambiente',
    description: 'El agua fría puede sorprender a las raíces de tus plantas. Usa agua a temperatura ambiente para evitar el choque térmico.',
  },
  {
    id: 3,
    title: 'No riegues en exceso',
    description: 'Demasiada agua puede ser perjudicial para tus plantas. Asegúrate de que el suelo esté seco al tacto antes de volver a regar.',
  },
  {
    id: 4,
    title: 'Revisa las hojas',
    description: 'Las hojas caídas o amarillentas pueden ser una señal de que tu planta está recibiendo demasiada o muy poca agua.',
  }
]

export function TricksAndAdvicesList() {
    return (
        <section className="my-4 container tricks-wrapper">
            <h2>Consejos para el cuidado de tus plantas</h2>
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

