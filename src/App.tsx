import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./AppRouter";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
