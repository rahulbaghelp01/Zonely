import MainContent from "../components/main-content";
import Navbar from "../components/navbar";

export default function Home (){
    return (
        <div className="home bg-[var(--background)]">
            <Navbar/>
            <MainContent/> 
        </div>
    )
}