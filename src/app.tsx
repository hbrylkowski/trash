import {useState} from 'preact/hooks'
import trashTargets from './assets/targets.json'
import './app.css'
import Fuse from "fuse.js";
import black from "./assets/trashcans/black.png"
import blue from "./assets/trashcans/blue.png"
import yellow from "./assets/trashcans/yellow.png"
import green from "./assets/trashcans/green.png"
import brown from "./assets/trashcans/brown.png"
import recycle from "./assets/trashcans/recycle.png"

const fuse = new Fuse(trashTargets, {
    keys: ['name'],
    includeScore: true,
})

function nameToImage(name: string) {
    if (name.includes("zielony")) {
        return green
    }
    if (name.includes("niebieski")) {
        return blue
    }
    if (name.includes("żółty")) {
        return yellow
    }
    if (name.includes("brązowy")) {
        return brown
    }
    if (name.includes("czarny")) {
        return black
    }
    return recycle
}

export function App() {
    const [searchResults, setSearchResults] = useState([])

    function searchTrash(phrase: string) {
        const results = fuse.search(phrase)
        setSearchResults(results)
    }


    return (
        <>
            <div class="">
                <div class="text-center mb-6">
                    <h1 class="text-4xl sm:text-5xl md:text-6xl">Śmiecioszukajka</h1>
                </div>
                <div class="w-full">
                    <input type="text"
                           className="w-full p-3 bg-gray-900 border-2 border-gray-300 rounded bg-gray-100 text-lg focus:border-green-500 focus:bg-green-100 focus:text-gray-950 transition-colors duration-300 ease-in-out"
                           onInput={(a) => searchTrash(a.target.value)}/>

                </div>

                <div class="card">
                    <div>
                        {searchResults.map(result => {
                            const item = result.item
                            return (
                                <div key={item.id}
                                     class="bg-gray-900 max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                                    <div class="md:flex">
                                        <div class="hidden md:flex md:flex-shrink-0 items-center">
                                            <img class="max-w-0 md:max-w-36 p-4"
                                                 src={nameToImage(item.targets[0].name)}
                                                 alt={item.name}/>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div
                                                class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{item.name}</div>
                                            {item.targets.map(target => {
                                                if (target.id != "IMG") {
                                                    return (
                                                        <div key={target.id}
                                                             class="p-2 my-2 border-2 border-gray-300 rounded bg-gray-800 text-lg w-full">
                                                            {target.name}
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
