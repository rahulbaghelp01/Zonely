import Navbar from "../components/navbar.jsx"
import {Cards} from "../components/main-content.jsx"
import FavouritesContext from "../contexts/FavouritesContext.jsx"
import { useContext } from "react"


export default function Favourites(){
    const {favourites} = useContext(FavouritesContext )

    

    return ( <div className="home bg-[var(--background)]">
        <Navbar/>
        <main>
            <div className="grid
            grid-cols-1 
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            mt-6
            w-full">

        {
           favourites.map((place)=>{
            return (
                
                 <div >
                    <Cards place={place}/>
                 </div>
            )
           }) 
        }
        </div>
        </main>

    </div> )
}