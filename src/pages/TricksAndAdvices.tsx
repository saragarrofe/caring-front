import TricksAndAdvicesList from "@components/TricksAndAdvicesList/TricksAndAdvicesList";

export default function TricksAndAdvices() {
  return (
    <main className="container py-4">
      <h1>Tricks and Advices</h1>
      <p>Here you will find various tips and advice to take care of your plants.</p>
      <TricksAndAdvicesList />
    </main>
  );
}