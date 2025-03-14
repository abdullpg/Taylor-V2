
import _ from "lodash";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const counts = _.chain(Object.values(plugins))
      .flatMap((p) => (p.help ? p.tags : []))
      .filter((tag) => tag != null && tag.trim() !== "")
      .reduce((c, tag) => (_.set(c, tag, _.get(c, tag, 0) + 1), c), {})
      .value();

    const sections = [];
    let index = 0;
    for (const [tag, count] of Object.entries(counts)) {
      index++;
      sections.push({
        title: `Category ${index}: ${_.capitalize(tag)}`,
        rows: [{
          title: `${_.capitalize(tag)} Menu`,
          rowId: `${usedPrefix}menu ${tag}`,
          description: `Contains ${count} commands`
        }]
      });
    }

    const listMessage = {
      text: "🔍 *FEATURE LIST MENU*\n\n" + 
            "Here are all available feature categories.\n" +
            "Select one to see specific commands.",
      footer: `Total: ${_.sum(Object.values(counts))} Commands`,
      title: "📋 *LIST OF FEATURES*",
      buttonText: "Click Here!",
      sections
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "An error occurred while executing the command.", m);
  }
};

handler.help = ["totalfitur"];
handler.tags = ["main", "info"];
handler.command = /^(feature|totalfitur)$/i;
export default handler;
