import { useDispatch } from "react-redux"

function ConnectButton({service}) {

    const handleConnect = async () => {
       window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/${service}`;
    }

  return (
    <button onClick={handleConnect} className="bg-green-500 px-4 py-2 rounded" >
        Connect {service}
    </button>
  )
}

export default ConnectButton
