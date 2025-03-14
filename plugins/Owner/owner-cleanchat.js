
const handler = async (m, { conn, args, text }) => {
  if (m.quoted && !text) {
    await conn.sendMessage(m.chat, { delete: m.quoted.key })
    return
  }
  
  let group = m.chat
  let bot = conn.user.jid
  let chats = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us')).map(v => v[0])
  
  if (args[0] === 'all') {
    for (let id of chats) {
      await conn.modifyChat(id, 'clear')
    }
    await m.reply('Berhasil menghapus semua chat!')
  } else if (args[0] === 'group') {
    await conn.modifyChat(group, 'clear') 
    await m.reply('Berhasil menghapus chat group ini!')
  } else {
    await conn.modifyChat(bot, 'clear')
    await m.reply('Berhasil menghapus chat pribadi!')
  }
}

handler.help = ['cleanchat', 'cleanchat group', 'cleanchat all']
handler.tags = ['owner']
handler.command = /^(clear|clean)chat$/i
handler.owner = true
handler.group = true

export default handler
