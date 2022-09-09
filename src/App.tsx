import { Link, Outlet } from "react-router-dom";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function App() {
  const { isConnected } = useAccount();
  const {
    connect,
    connectors,
    isLoading: connectLoading,
    pendingConnector,
  } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect, isLoading: disconnectLoading } = useDisconnect();

  const handleLoginClick = (connector: Connector) => () => {
    connect({ connector });
  };

  const handleLogoutClick = () => {
    disconnect();
  };

  return (
    <div className="px-12 pt-6">
      <div className="flex items-center justify-between mb-8">
        <Link className="text-4xl" to="/">
          Luaga staking
        </Link>
        <div>
          {isConnected ? (
            <button
              className="bg-red-400 text-white p-2"
              onClick={handleLogoutClick}
              disabled={disconnectLoading}
            >
              Disconnect
            </button>
          ) : (
            connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={handleLoginClick(connector)}
                className="bg-green-400 text-white p-2"
              >
                Connect with {connector.name}
                {connectLoading &&
                  pendingConnector?.id === connector.id &&
                  " (connecting)"}
              </button>
            ))
          )}
        </div>
      </div>
      <div>
        {!isConnected ? <div>Please connect to continue</div> : <Outlet />}
      </div>
    </div>
  );
}

export default App;
