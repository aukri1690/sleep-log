import LogoText from "@/components/LogoText";
import InputTimeCard from "@/components/InputTimeCard";

const Home = () => {
  return(
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <LogoText />
      <InputTimeCard />
    </div>
  );
};

export default Home;
