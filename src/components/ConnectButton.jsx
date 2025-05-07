import { useDispatch } from "react-redux"

function ConnectButton({service}) {

    const handleConnect = async () => {
       window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${service}`;
    }

  return (
    <button onClick={handleConnect} className="bg-transparent px-4 py-2 rounded cursor-pointer hover:bg-purple-400 transition-colors border-2 border-purple-300 hover:text-purple-50 duration-300 
    hover:shadow-md shadow-blue-500

    hover:ring-blue-500 hover:ring-2 transition-ring
             transition-colors 
            hover:scale-105 transition-transform
    " >
        Connect {service}
    </button>
  )
}

export default ConnectButton
