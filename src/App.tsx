import { Suspense, useEffect, useState } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import {
  testDatabaseConnection,
  testAuthConnection,
} from "./lib/testConnection";
import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import routes from "tempo-routes";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Test connections on app start
    const initializeApp = async () => {
      try {
        // Test auth connection
        const authTest = await testAuthConnection();
        if (!authTest.success) {
          console.error("Auth connection failed:", authTest.error);
        }

        // Test database connection
        const dbTest = await testDatabaseConnection();
        if (!dbTest.success) {
          console.warn("Database connection test failed:", dbTest.error);
        }

        // Get initial session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          console.error("Session error:", error);
        }
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("App initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={user ? <Home user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
