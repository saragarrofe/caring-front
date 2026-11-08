import { SegmentedProgress } from '@/components/SegmentProgress';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function PlantDetail() {
  return (
    <main className="mx-auto max-w-7xl px-40 py-12">
      <a href="/garden" className="inline-flex">
        ← Al jardín
      </a>
      <div className="mt-10 grid grid-cols- md:grid-cols-[280px_1fr] items-start gap-12">
        <img
          src="/images/luna.png"
          alt="Ilustración de Luna, una Calathea orbifolia en una maceta"
          className="w-full object-contain"
        />

        <div className="flex flex-col text-left">
          <header>
            <p className="italic">Calathea orbifolia</p>
            <h1 className="text-6xl font-bold font-display">Luna</h1>
            <p className="text-md font-semibold">Sensible y nocturna</p>
          </header>

          <div>
            <Card className="mt-6">
              <CardContent>Está radiante. Ha estirado una hoja nueva esta mañana.</CardContent>
            </Card>

            <div className="mt-6">
              <div className="flex justify-between text-sm text-stone-600">
                <span>Amistad</span>
                <span>98 días juntos</span>
              </div>
              <Progress value={70} aria-label="Amistad con Luna" className="mt-2 h-3" />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16" aria-labelledby="care-heading">
        <div className="text-left">
          <h2 id="care-heading" className="text-2xl font-display">
            Guía de cuidados
          </h2>
          <p className="mt-2 tex-xs">Toca una tarjeta para ver el truco.</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-xl shadow-sm border-none">
            <CardContent className="flex flex-col items-start gap-2">
              <h3 className="font-semibold">DIFICULTAD</h3>
              <p>Exigente, para manos pacientes</p>
              <SegmentedProgress activeColor="var(--chart-2)" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-start gap-2">
              <h3 className="font-semibold">LUZ</h3>
              <p>Luz suave o media, sin sol directo</p>
              <SegmentedProgress activeColor="var(--chart-3)" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-start gap-2">
              <h3 className="font-semibold">RIEGO</h3>
              <p>Cada 4–5 días, sustrato húmedo</p>
              <SegmentedProgress activeColor="var(--chart-4)" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-start gap-2">
              <h3 className="font-semibold">HUMEDAD</h3>
              <p>Alta, por encima del 60%</p>
              <SegmentedProgress activeColor="var(--chart-1)" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-start gap-2">
              <h3 className="font-semibold">MASCOTAS</h3>
              <p>Convive sin riesgo</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
