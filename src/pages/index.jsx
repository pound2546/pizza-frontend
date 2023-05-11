import About from "@/components/About";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";

export default function Home() {
    return (
        <main>
            <Navbar />
            <div id="Home" className="pt-[4.5rem] bg-[#f5f5f5] w-full h-full">
                <Banner />
                <Menu />
                <About />
            </div>
        </main>
    );
}
