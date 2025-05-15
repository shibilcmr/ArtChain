function copyWallet() {
  const walletText = document.getElementById("walletAddress").innerText;
  navigator.clipboard.writeText(walletText).then(() => {
    alert("Wallet address copied!");
  });
}

function generateArtFromTx() {
  const txid = document.getElementById("txid").value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (txid.length < 10) {
    alert("Please enter a valid TXID (at least 10 characters).");
    return;
  }

  // Just for demo: draw colored rectangles based on txid hash
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < txid.length; i++) {
    const color = "#" + ((txid.charCodeAt(i) * 1234567) % 0xffffff).toString(16).padStart(6, "0");
    ctx.fillStyle = color;
    ctx.fillRect((i * 50) % 500, Math.floor(i / 10) * 50, 50, 50);
  }
}

function downloadArt() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "ai-art.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function submitRating() {
  const file = document.getElementById("artUpload").files[0];
  const upi = document.getElementById("upiAddress").value;

  if (!file || !upi) {
    alert("Please upload art and enter your UPI address.");
    return;
  }

  alert("Thank you! Your submission has been received.");
}

// Tab switching
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});
