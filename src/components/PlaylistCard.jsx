import React from 'react'

export default function PlaylistCard({ playlist, onSelect }) {
  return (
    <div 
      className="bg-slate-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative pb-3/4">
        {playlist.images?.length > 0 ? (
          <img 
            src={playlist.images[0].url} 
            alt={playlist.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-10000 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{playlist.name}</h3>
        <p className="text-gray-600 text-sm">
          {playlist.tracks?.total || 0} tracks
        </p>
      </div>
    </div>
  )
}