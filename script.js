const input = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrImage = document.getElementById("qr-image");
const qrBar = document.querySelector(".qr-bar");

generateBtn.addEventListener("click", () => {
    const url = input.value.trim();

    if (!url) {
        alert("Please enter a valid URL.");
        return;
    }

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=220x220`;

    // Display QR code
    qrImage.src = qrUrl;
    qrImage.style.display = "block";
    qrBar.style.display = "block";
});