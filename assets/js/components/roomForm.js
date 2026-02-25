export function initRoomForm() {
  const form = document.getElementById("roomForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const type = document.getElementById("type").value;

    const data = { name, price, type };

    console.log("Data kamar:", data);

    document.getElementById("result").innerHTML =
      `<p>Kamar ${name} berhasil ditambahkan 🎉</p>`;

    form.reset();
  });
}