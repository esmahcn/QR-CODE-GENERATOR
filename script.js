const input = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrContainer = document.getElementById("qr-image");
const downloadBtn = document.getElementById("download-btn");
const shareBtn = document.getElementById("share-btn");

// Generate QR Code
generateBtn.addEventListener("click", () => {
  const url = input.value.trim();

  if (!url) {
    alert("Please enter a valid URL.");
    return;
  }

  // Clear previous QR code
  qrContainer.innerHTML = "";

  // Create new QR code
  new QRCode(qrContainer, {
    text: url,
    width: 220,
    height: 220,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Enable buttons after QR is generated
  setTimeout(() => {
    downloadBtn.disabled = false;
    shareBtn.disabled = false;
  }, 100);
});

// Download QR Code as image
downloadBtn.addEventListener("click", () => {
  const canvas = qrContainer.querySelector("canvas");
  if (!canvas) {
    alert("Please generate a QR code first!");
    return;
  }

  const imgData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = imgData;
  link.download = "qr-code.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Share button copies the QR code image to clipboard
shareBtn.addEventListener("click", async () => {
  const canvas = qrContainer.querySelector("canvas");
  if (!canvas) {
    alert("Please generate a QR code first!");
    return;
  }

  try {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));

    if (!navigator.clipboard) {
      alert("Clipboard API not supported.");
      return;
    }

    const clipboardItem = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([clipboardItem]);

    alert("QR code image copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy image:", error);
    alert("Copying image failed or is not supported on this browser.");
  }
});