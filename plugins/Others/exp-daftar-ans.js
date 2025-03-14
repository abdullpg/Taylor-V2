
export async function before(m) {
  if (!m || !m.sender) return;

  let user = global.db.data.users[m.sender];
  if (!user) return;

  db.data.database.registrasi = db.data.database.registrasi || {};
  
  if (!db.data.database.registrasi[m.sender]) return;
  
  if (!m.quoted || m.quoted.id !== db.data.database.registrasi[m.sender].MSG.key.id) return;

  let txt = m.msg?.selectedDisplayText || m.text || "";
  console.log("User Input:", txt);
  console.log("Expected OTP:", db.data.database.registrasi[m.sender]?.OTP);

  if (!txt) {
    return await this.reply(m.chat, "Masukkan input OTP!", m);
  }

  if (txt === db.data.database.registrasi[m.sender].OTP) {
    user.name = db.data.database.registrasi[m.sender].NAME.trim();
    user.age = db.data.database.registrasi[m.sender].AGE;
    user.regTime = +new Date();
    user.registered = true;
    
    let benar = `✨ OTP Benar!\n@${m.sender.split("@")[0]} telah diverifikasi!\n\n`;
    await this.sendMessage(
      m.chat,
      {
        image: db.data.database.registrasi[m.sender].VERIFIED,
        caption: benar + db.data.database.registrasi[m.sender].CAPTION,
        mentions: [m.sender],
      },
      { quoted: m }
    );

    clearTimeout(db.data.database.registrasi[m.sender].timeout);
    await this.sendMessage(m.chat, {
      delete: db.data.database.registrasi[m.sender].MSG.key,
    });
    delete db.data.database.registrasi[m.sender];
  } else {
    let salah = `✖️ OTP Salah!\n@${m.sender.split("@")[0]} tidak diverifikasi!`;
    await this.sendMessage(
      m.chat,
      {
        text: salah,
        mentions: [m.sender],
      },
      { quoted: m }
    );

    clearTimeout(db.data.database.registrasi[m.sender].timeout);
    await this.sendMessage(m.chat, {
      delete: db.data.database.registrasi[m.sender].MSG.key,
    });
    delete db.data.database.registrasi[m.sender];
  }
  return true;
}
