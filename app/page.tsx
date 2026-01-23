import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import ContactSection from "@/components/ContactSection";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#121212] text-[#e0e0e0]">
            {/* 
        The Scrollytelling container. 
        Height is set to ~600vh to allow for plenty of scroll distance 
        to scrub through the sequence.
      */}
            <div className="relative h-[1000vh]">
                <ScrollyCanvas />
                <Overlay />
            </div>

            {/* 
        After the scroll sequence ends, we flow naturally into the Contact Section.
      */}
            <ContactSection />
        </main>
    );
}
