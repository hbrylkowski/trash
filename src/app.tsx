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


export function App() {
    const fuse = new Fuse(trashTargets, {
        keys: ['name'],
        includeScore: true,
    })
    const [searchResults, setSearchResults] = useState([])

    function searchTrash(phrase: string) {
        const results = fuse.search(phrase)
        setSearchResults(results)
    }

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

    return (
        <>
            <h1>Śmiecioszukajka</h1>
            <div class="card">
                <input type="text"
                       class="bg-gray-900 w-full p-3 m-2 border-2 border-gray-300 rounded bg-gray-100 text-lg focus:border-green-500 focus:bg-green-100 transition-colors duration-300 ease-in-out"
                       onInput={(a) => searchTrash(a.target.value)}/>
                <div>
                    {searchResults.map(result => {
                        const item = result.item
                        return (
                            <div key={item.id}
                                 class="bg-gray-900 max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                                <div class="md:flex">
                                    <div class="md:flex-shrink-0">
                                        <img class="h-24 h-full object-cover md:w-36"
                                             src={nameToImage(item.targets[0].name)}
                                             alt={item.name}/>
                                    </div>
                                    <div class="p-8">
                                        <div
                                            class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{item.name}</div>
                                        {item.targets.map(target => {
                                            if (target.id != "IMG") {
                                                return (
                                                    <div key={target.id}
                                                         class="p-2 m-2 border-2 border-gray-300 rounded bg-gray-800 text-lg">
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
        </>
    )
}
