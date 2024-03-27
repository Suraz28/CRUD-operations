import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
    deafaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
    <App />
    {/* <ReactQueryDevtools initialIsOpen={false}/> */}
    </QueryClientProvider>
    
)
