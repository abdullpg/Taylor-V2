
let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `Masukkan nama baru!\n\nContoh: ${usedPrefix + command} John Doe`;
    }

    if (text.length > 30) {
      throw "Nama terlalu panjang! (Maksimal 30 karakter)";
    }

    if (!db.data.users[m.sender]) {
      db.data.users[m.sender] = {};
    }

    db.data.users[m.sender].name = text.trim();
    await db.write(); // Save to database

    m.reply(`✅ Nama berhasil diubah menjadi *${text}*`);
  } catch (error) {
    m.reply(`❌ Error: ${error}`);
  }
};

handler.help = ["changename", "setname"].map((v) => v + " <nama baru>");
handler.tags = ["user"];
handler.command = /^(change|set)name$/i;
handler.register = true;

export default handler;
