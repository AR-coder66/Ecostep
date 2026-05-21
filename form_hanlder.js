// Change these placeholders to match your real credentials from Supabase API dashboard!
const SUPABASE_URL = "https://cjojqgdefddztfpzyizx.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqb2pxZ2RlZmRkenRmcHp5aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMjAyMTAsImV4cCI6MjA5NDg5NjIxMH0._VMv4TMhQCTAhEnObCjHrtLb_BUi6whgFWpVil0naRU";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const statusDiv = document.getElementById("formStatusMessage");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        statusDiv.style.color = "rgba(255, 255, 255, 0.6)";
        statusDiv.textContent = "Establishing transmission vector stream to cloud engine...";

        const nameVal = document.getElementById("formName").value.trim();
        const emailVal = document.getElementById("formEmail").value.trim();
        const messageVal = document.getElementById("formMessage").value.trim();

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([
                    { 
                        user_name: nameVal, 
                        user_email: emailVal, 
                        user_message: messageVal 
                    }
                ]);

            if (error) throw error;

            statusDiv.style.color = "#8ebd6e";
            statusDiv.textContent = "✔ Handshake verified! Form submission saved securely to your cloud database table.";
            contactForm.reset();

        } catch (err) {
            console.error("Database connection catch array hit:", err);
            statusDiv.style.color = "#ff6b6b";
            statusDiv.textContent = "❌ Connection failed: Unable to write data logs to cloud infrastructure tracks.";
        }
    });
});
