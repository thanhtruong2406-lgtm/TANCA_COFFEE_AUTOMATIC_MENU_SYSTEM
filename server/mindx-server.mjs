
import express from "express";
import dotenv from "dotenv";
import { randomBytes } from "node:crypto";
import { fileURLToPath } from "node:url";

dotenv.config({
  path: fileURLToPath(new URL("./.env", import.meta.url)),
});

const app = express();
app.use(express.json({ limit: "100kb" }));

const PORT = Number(process.env.PORT || 4000);
const API_KEY = process.env.MINDX_API_KEY;

const MINDX_URL =
  "https://mindx-mockup-server.vercel.app/api/resources/order";

if (!API_KEY) {
  throw new Error("Thiếu MINDX_API_KEY trong server/.env");
}

// Kiểm tra API TANCA
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "TANCA API" });
});

// Nhận đơn từ React và lưu sang MindX
app.post("/api/orders", async (req, res) => {
  try {
    const {
      customer,
      items,
      total,
      paymentMethod,
    } = req.body;

    const name = customer?.name?.trim();
    const serving = customer?.serving;

    if (
      !name ||
      !["dinein", "takeaway"].includes(serving) ||
      !["counter", "qr"].includes(paymentMethod) ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !Number.isSafeInteger(total) ||
      total <= 0
    ) {
      return res.status(400).json({
        message: "Thông tin đơn hàng không hợp lệ",
      });
    }

    // Máy chủ tạo mã đơn
    const orderCode =
      "TANCA" +
      Date.now().toString(36).toUpperCase() +
      randomBytes(3).toString("hex").toUpperCase();

    // Dữ liệu theo resource order đã tạo
    const order = {
      orderCode,
      customerName: name,
      phone: customer.phone?.trim() || "",
      servingType: serving,
      items,
      total,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "new",
      note: customer.note?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    // Gửi bản ghi lên MindX
    const url = new URL(MINDX_URL);
    url.searchParams.set("apiKey", API_KEY);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("MindX POST status:", response.status);

      return res.status(502).json({
        message: "Máy chủ MindX chưa nhận được đơn hàng",
      });
    }

    // Chỉ thông báo thành công khi MindX trả về thành công
    return res.status(201).json({
      success: true,
      order: {
        id: orderCode,
        total,
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "new",
      },
    });
  } catch (error) {
    console.error("Lỗi lưu đơn:", error.message);

    res.status(500).json({
      message: "Không thể kết nối máy chủ lưu đơn",
    });
  }
});

app.listen(PORT, () => {
  console.log(`TANCA API: http://localhost:${PORT}`);
});
