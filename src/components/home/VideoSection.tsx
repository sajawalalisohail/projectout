import { Container } from "@/components/ui/Container";

export function VideoSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full"
          >
            <source src="/video/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>
    </section>
  );
}
