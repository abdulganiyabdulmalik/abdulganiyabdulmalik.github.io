const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/*
  Health check
  Open /api/health to confirm the backend is running.
*/
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Pi Wallet Scanner Backend",
    message: "Backend is running"
  });
});

/*
  Payment approval endpoint

  IMPORTANT:
  The Pi Server API key will be added through an environment
  variable later. NEVER put the API key directly in this file.
*/
app.post("/api/payments/approve", async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({
        ok: false,
        message: "paymentId is required"
      });
    }

    /*
      Pi Server API approval will be connected here
      after we configure the backend environment.
    */

    console.log("Approval requested:", paymentId);

    return res.json({
      ok: true,
      message: "Payment approval endpoint is ready",
      paymentId
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Payment approval failed"
    });
  }
});

/*
  Payment completion endpoint
*/
app.post("/api/payments/complete", async (req, res) => {
  try {
    const { paymentId, txid } = req.body;

    if (!paymentId || !txid) {
      return res.status(400).json({
        ok: false,
        message: "paymentId and txid are required"
      });
    }

    /*
      Pi Server API completion will be connected here.
    */

    console.log("Completion requested:", {
      paymentId,
      txid
    });

    return res.json({
      ok: true,
      message: "Payment completion endpoint is ready",
      paymentId,
      txid
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: "Payment completion failed"
    });
  }
});

/*
  Start server
*/
app.listen(PORT, () => {
  console.log(
    `Pi Wallet Scanner backend running on port ${PORT}`
  );
});
