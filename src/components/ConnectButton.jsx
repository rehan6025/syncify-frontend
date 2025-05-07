import { useDispatch } from "react-redux"

function ConnectButton({service}) {

    const handleConnect = async () => {
       window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${service}`;
    }

  return (
    <button onClick={handleConnect} className="bg-transparent px-4 py-2 rounded cursor-pointer hover:bg-purple-400 transition-colors border-2 border-purple-300 hover:text-yellow-200 duration-300  " >
        Connect {service}
    </button>
  )
}

export default ConnectButton
