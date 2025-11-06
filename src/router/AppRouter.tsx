import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes";
import { lazy, Suspense } from "react";

const DashboardPage= lazy(() => import('../pages/DashboardPage'))
const MainPage = lazy(() => import('../pages/MainPage'))

const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

export function AppRouter() {
    return (
        <RouterProvider router={createBrowserRouter(
            createRoutesFromElements(
                <Route>
                    <Route 
                        path={ROUTES.AUTH} 
                        element={
                            <Suspense fallback={<LoadingFallback />}>
                                <MainPage />
                            </Suspense>
                        }
                    />
                    <Route 
                        path={ROUTES.DASHBOARD} 
                        element={
                            <Suspense fallback={<LoadingFallback />}>
                                <DashboardPage />
                            </Suspense>
                        }
                    />
                </Route>
            )
        )} />
    )
}