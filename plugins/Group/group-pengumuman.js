import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
const handler = async (m, { conn, text, participants }) => {
  let users = participants.map((u) => conn.decodeJid(u.id)),
    q = m.quoted ? m.quoted : m,
    c = m.quoted ? m.quoted : m.msg;
  const msg = conn.cMod(
    m.chat,
    generateWAMessageFromContent(
      m.chat,
      {
        [c.toJSON ? q.mtype : "extendedTextMessage"]: c.toJSON
          ? c.toJSON()
          : {
              text: c || "",
            },
      },
      {
        quoted: m,
        userJid: conn.user.id,
      },
    ),
    text || q.text,
    conn.user.jid,
    {
      mentions: users,
    },
  );
  await conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id,
  });
};
(handler.help = ["pengumuman", "announce", "hidetag"].map(
  (v) => v + " [teks]",
)),
  (handler.tags = ["group"]),
  (handler.command = ["pengumuman", "announce", "hidetag"]),
  (handler.group = !0),
  (handler.admin = !0);
export default handler;
