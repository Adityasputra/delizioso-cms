const app = require("./src/app");
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ [SERVER ERROR]:", err);
});

const shutdown = () => {
  console.log("\n🔴 Shutting down server...");
  server.close(() => {
    console.log("✅ Server closed. Cleanup complete.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
