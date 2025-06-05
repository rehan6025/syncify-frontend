import React from 'react'

export default function PlaylistCard({ playlist, onSelect }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
        transform transition-all duration-300
        hover:shadow-xl hover:scale-105 hover:bg-slate-50"
      onClick={onSelect}
    >
      <div className="relative">
        {playlist.images?.length > 0 ? (
          <div className="overflow-hidden">
            <img 
              src={playlist.images[0].url} 
              alt={playlist.name}
              className="w-full h-48 object-cover transition-transform duration-500
                hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-slate-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate text-gray-800">{playlist.name}</h3>
        <p className="text-gray-600 text-sm mt-1">
          {playlist.tracks?.total || 0} tracks
        </p>
      </div>
    </div>
  )
}
