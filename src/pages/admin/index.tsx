import { AdminPanel } from "@/components/AdminPanel";
import { DefaultLayout } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { usePriceConfig } from "@/hooks/usePriceConfig";
import Link from "next/link";
import { useState } from "react";
import { FaUser, FaLock, FaKey, FaLockOpen, FaHome } from "react-icons/fa";

const Admin = () => {
  const {
    priceConfig,
    updatePrice,
    addPriceItem,
    removePriceItem,
    resetToDefault,
  } = usePriceConfig();

  const { isAuthenticated, login, logout } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const success = login(credentials.username, credentials.password);
      if (!success) {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsRedirecting(true); // Set redirecting state to true
    logout(); // Call the logout function
  };

  if (isRedirecting) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="text-center p-8">
            <div className="flex flex-col items-center">
              <FaLockOpen className="text-6xl text-blue-500 mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Logging out...
              </h2>
              <p className="text-gray-600">Redirecting to home page...</p>
            </div>
          </Card>
        </div>
      </DefaultLayout>
    );
  }

  if (isAuthenticated) {
    return (
      <DefaultLayout>
        <div className="w-full max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="floating-animation">
                <img
                  src="/images/logo-02.png"
                  alt="OIM Logo"
                  className="w-auto h-16 lg:h-24 drop-shadow-2xl"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Link href={"/"}>
                  <button className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                    <FaHome size={16} className="text-white" />
                  </button>
                </Link>
                <button
                  onClick={handleLogout} // Use the new handleLogout function
                  className="group relative w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 backdrop-blur-sm border border-purple-300/30 hover:border-purple-300/50 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/20 group-hover:to-pink-400/20 transition-all duration-300"></div>

                  {/* Icon with conditional styling */}
                  <FaLockOpen
                    size={16}
                    className="text-white relative z-10 group-hover:rotate-90 transition-transform duration-300"
                  />

                  {/* Tooltip */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Administration
                  </div>
                </button>
              </div>
            </div>
            <div className="mb-8">
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                OIM Price Calculator
              </h1>
              <p className="text-blue-100 text-lg lg:text-xl">
                Organisation Internationale pour les Migrations
              </p>
            </div>
            <div className="w-full">
              <AdminPanel
                priceConfig={priceConfig}
                onUpdatePrice={updatePrice}
                onAddItem={addPriceItem}
                onRemoveItem={removePriceItem}
                onResetToDefault={resetToDefault}
              />
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="w-full max-w-md mx-auto relative z-10">
        <Card>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Admin Login
            </h2>
            <p className="text-gray-600">
              Enter your credentials to access the administration panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser size={16} className="inline mr-2" />
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaKey size={16} className="inline mr-2" />
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Credentials:</strong>
              <br />
              Username: admin
              <br />
              Password: iom2025
            </p>
          </div>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default Admin;
