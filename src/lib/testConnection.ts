import { supabase } from "./supabaseClient";

export const testDatabaseConnection = async () => {
  try {
    console.log("Testing Supabase connection...");

    // Test basic connection
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(1);

    if (error) {
      console.error("Database connection error:", error);
      return { success: false, error: error.message };
    }

    console.log("Database connection successful!");
    return { success: true, data };
  } catch (err) {
    console.error("Connection test failed:", err);
    return { success: false, error: "Connection test failed" };
  }
};

export const testAuthConnection = async () => {
  try {
    console.log("Testing Supabase auth connection...");

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Auth connection error:", error);
      return { success: false, error: error.message };
    }

    console.log("Auth connection successful!");
    return { success: true, session };
  } catch (err) {
    console.error("Auth test failed:", err);
    return { success: false, error: "Auth test failed" };
  }
};
