"use client"

import React, { useState, useEffect } from 'react'
import data from '../../shared/Data'

function GameList() {
    const [games, setGames] = useState();

    useEffect(() => {
        setGames(data.GameList);
    }, []);

    return (
        <div className='container mx-auto px-4'>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
                {games && games.map((game, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-5 cursor-pointer items-center hover:animate-bounce transition-all duration-150">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold">{game.name}</h2>
                                <p className="text-gray-500 text-xs">{game.players} Players</p>
                            </div>
                            <div>
                                <img src={game.image} alt={game.name} className="w-16 h-16" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-gray-500">{game.description}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default GameList
