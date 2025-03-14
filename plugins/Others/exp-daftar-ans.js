export async function before(m) {
  if (!m || !m.sender) return;

  let user = global.db.data.users[m.sender];
  if (!user) return;

  if (user.registered === true) {
    await this.reply(m.chat, `Kamu sudah terdaftar! Mau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`, m);
    return true;
  }
  return false;
}