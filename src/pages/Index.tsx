import Hero from "@/components/Hero";
import Values from "@/components/Values";
import Mentoring from "@/components/Mentoring";
import Visionary from "@/components/VisionarySection"
import History from "@/components/History";
import NextMeeting from "@/components/NextMeeting";
const Index = () => {
    return (
        <div>
            <Hero />
            <NextMeeting />
            <Values />
            <Visionary />
            <Mentoring />
            <History />
        </div>
    );
};

export default Index;
