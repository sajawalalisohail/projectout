import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Merch",
  description: "Nextlex merchandise - coming soon.",
};

export default function MerchPage() {
  return (
    <section className="bg-white">
      <div className="flex min-h-[70vh] items-center justify-center py-24">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-[#1C1F26] md:text-5xl lg:text-6xl">
              Nextlex Merch
            </h1>
            <p className="mt-4 text-lg text-[#6B7280] md:text-xl">
              Coming Soon.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
