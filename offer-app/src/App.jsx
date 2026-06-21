import { useHashRoute } from "./useHashRoute";
import OfferPage from "./pages/OfferPage";
import AdminDemoPage from "./pages/AdminDemoPage";
import MobileDemoPage from "./pages/MobileDemoPage";

export default function App() {
  const route = useHashRoute();

  if (route === "/demo/admin") return <AdminDemoPage />;
  if (route === "/demo/mobile") return <MobileDemoPage />;
  return <OfferPage />;
}
