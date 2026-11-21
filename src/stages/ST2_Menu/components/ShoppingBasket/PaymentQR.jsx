
import { useMemo, useState } from "react";

// Hiển thị mã VietQR theo tổng tiền của giỏ hàng
function PaymentQR({ amount, orderCode }) {
  const [imageError, setImageError] = useState(false);

  // Thông tin tài khoản nhận tiền của quán
  const bankId = import.meta.env.VITE_TANCA_BANK_ID;
  const accountNo = import.meta.env.VITE_TANCA_BANK_ACCOUNT;
  const accountName = import.meta.env.VITE_TANCA_BANK_NAME;

  // Mã tạm để thử nghiệm frontend.
  // Khi có backend, sử dụng mã đơn do server tạo.
  const [temporaryCode] = useState(
    () => `TANCA${Date.now().toString(36).toUpperCase()}`
  );

  const transferNote = String(
    orderCode || temporaryCode
  )
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 50);

  const total = Number(amount);

  const isConfigured = Boolean(
    bankId && accountNo && accountName
  );

  const isValidAmount =
    Number.isSafeInteger(total) && total > 0;

  // Tạo URL QR chứa tài khoản, số tiền, nội dung CK
  const qrUrl = useMemo(() => {
    if (!isConfigured || !isValidAmount) return "";

    const params = new URLSearchParams({
      amount: String(total),
      addInfo: transferNote,
      accountName,
    });

    return (
      `https://img.vietqr.io/image/` +
      `${encodeURIComponent(bankId)}-` +
      `${encodeURIComponent(accountNo)}-compact2.png?` +
      params.toString()
    );
  }, [
    bankId,
    accountNo,
    accountName,
    total,
    transferNote,
    isConfigured,
    isValidAmount,
  ]);

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number.isFinite(total) ? total : 0);

  if (!isConfigured) {
    return (
      <div className="mt-4 rounded-2xl bg-white/70 p-4 text-center text-[#6B4F3A]">
        <p className="font-semibold">
          Chưa cấu hình tài khoản ngân hàng
        </p>
        <p className="mt-2 text-sm">
          Vui lòng thiết lập thông tin nhận chuyển khoản
          của TANCA COFFEE.
        </p>
      </div>
    );
  }

  if (!isValidAmount) {
    return (
      <p className="mt-3 text-center text-sm text-red-600">
        Tổng tiền đơn hàng không hợp lệ.
      </p>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-[#E0CDB8] bg-[#FFF9F1] p-4 text-[#6B4F3A]">
      <h3 className="text-center font-handwritten text-3xl font-bold">
        Quét mã thanh toán
      </h3>

      <p className="mt-1 text-center text-xs text-[#9B816C]">
        Sử dụng ứng dụng ngân hàng để quét mã VietQR
      </p>

      {/* Ảnh QR được tạo theo đúng số tiền */}
      <div className="mt-3 flex justify-center">
        {!imageError ? (
          <img
            key={qrUrl}
            src={qrUrl}
            alt={`Mã QR chuyển khoản ${formattedAmount}`}
            draggable={false}
            onError={() => setImageError(true)}
            className="w-full max-w-[260px] rounded-xl bg-white"
          />
        ) : (
          <p className="py-6 text-center text-sm text-red-600">
            Không tải được mã QR. Hãy kiểm tra thông tin
            ngân hàng hoặc kết nối Internet.
          </p>
        )}
      </div>

      {/* Thông tin để khách đối chiếu */}
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <span>Ngân hàng</span>
          <strong>{bankId}</strong>
        </div>

        <div className="flex justify-between gap-3">
          <span>Chủ tài khoản</span>
          <strong className="text-right">{accountName}</strong>
        </div>

        <div className="flex justify-between gap-3">
          <span>Số tài khoản</span>
          <strong>{accountNo}</strong>
        </div>

        <div className="flex justify-between gap-3">
          <span>Số tiền</span>
          <strong>{formattedAmount}</strong>
        </div>

        <div className="flex justify-between gap-3">
          <span>Nội dung CK</span>
          <strong>{transferNote}</strong>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#F1E3D4] p-3 text-center text-xs">
        Sau khi chuyển khoản, vui lòng chờ quán xác nhận
        đã nhận tiền. Không tự động đánh dấu đơn đã thanh toán.
      </div>
    </div>
  );
}

export default PaymentQR;
