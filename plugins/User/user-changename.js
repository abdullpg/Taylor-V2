
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukkan nama baru!\n\nContoh: ${usedPrefix + command} John Doe`
  
  if (text.length > 30) throw 'Nama terlalu panjang! (Maksimal 30 karakter)'
  
  let user = db.data.users[m.sender]
  user.name = text.trim()
  
  m.reply(`✅ Nama berhasil diubah menjadi *${text}*`)
}

handler.help = ['changename', 'setname'].map(v => v + ' <nama baru>')
handler.tags = ['user']
handler.command = /^(change|set)name$/i
handler.register = true

export default handler
