const handler = async (m, { conn, usedPrefix, command, args }) => {
  const features = [
    // Chat & Message Features
    "autoChat", "autoAi", "autoGpt", "autochatGpt", "autoReply", "autoVn", "cmdVn",
    "getmsg", "simi", "alicia", "gptvoice", "characterai",

    // Auto Functions
    "autolevelup", "autoBio", "autoJoin", "autoPresence", "autoClose", "autoSticker",
    "autoread", "viewStory", "autoGempa",

    // Anti Spam & Protection
    "antiSpam", "antibot", "antirpg",

    // Anti Media
    "antiFoto", "antiVideo", "antiAudio", "antiSticker",

    // Anti Links
    "antiLink", "antiLinkFb", "antiLinkHttp", "antiLinkIg", "antiLinkTel", 
    "antiLinkTik", "antiLinkWa", "antiLinkYt",

    // Other Protections  
    "antiCall", "antiDelete", "antiHidetag", "antiSatir", "antiVirtex",
    "antiToxic", "antibule",

    // Auto Downloads
    "autodlTiktok", "autodlFacebook", "autodlInstagram", "autodlYoutube",

    // Group Features
    "welcome", "detect", "gconly",

    // System Features
    "self", "pconly", "swonly", "nsfw",

    // Update Features  
    "updateAnime", "updateAnimeNews", "lastAnime", "latestNews", "wabetainfo"
  ].sort();

  if (!args[0]) {
    const sections = [];
    let category = '';
    let items = [];

    features.forEach((feature, index) => {
      const isActive = ["self", "pconly", "gconly", "swonly", "antirpg", "autoread"]
        .includes(feature) ? db.data.settings[conn.user.jid][feature] 
        : db.data.chats[m.chat][feature];

      const status = isActive ? "ON" : "OFF";

      // Detect category from feature name
      let currentCategory = '';
      if (feature.startsWith('auto')) currentCategory = '🤖 Auto Features';
      else if (feature.startsWith('anti')) currentCategory = '🛡️ Protection';
      else if (feature.includes('dl')) currentCategory = '📥 Downloads';
      else if (feature.includes('gpt') || feature.includes('chat')) currentCategory = '💭 Chat & AI';
      else currentCategory = '⚙️ Other Features';

      if (currentCategory !== category) {
        if (items.length > 0) {
          sections.push({
            title: category,
            rows: items
          });
          items = [];
        }
        category = currentCategory;
      }

      items.push({
        title: `${index + 1}. ${feature}`,
        rowId: `${usedPrefix}${command} ${feature}`,
        description: `Status: ${status}`
      });
    });

    // Add remaining items
    if (items.length > 0) {
      sections.push({
        title: category,
        rows: items
      });
    }

    const listMessage = {
      text: "🛠️ *DAFTAR FITUR BOT*\n\n" +
            "Cara menggunakan:\n" +
            `→ ${usedPrefix + command} [nomor/nama fitur]\n` +
            `→ Contoh: ${usedPrefix + command} welcome\n\n` +
            `Total Fitur: ${features.length}`,
      footer: "Pilih fitur untuk mengaktifkan/menonaktifkan",
      title: "📋 Daftar Fitur",
      buttonText: "Daftar Fitur",
      sections
    };

    return await conn.sendMessage(m.chat, listMessage);
  }

  const input = args[0];
  const isEnable = !/false|disable|(turn)?off|0/i.test(command);
  const feature = !isNaN(input) ? features[parseInt(input) - 1] : input;

  if (!features.includes(feature)) {
    return await conn.reply(m.chat, `
🚫 Fitur "${feature}" tidak ditemukan
📝 Daftar fitur yang tersedia:
${features.map((feat, i) => `${i + 1}. ${feat}`).join('\n')}
`.trim(), m);
  }

  if (["autoChat"].includes(feature)) {
    conn.autochat = conn.autochat || {};
    conn.autochat.status = isEnable;
  } else if (["self", "pconly", "gconly", "swonly", "antirpg", "autoread"].includes(feature)) {
    db.data.settings[conn.user.jid][feature] = isEnable;
    opts[feature] = isEnable;
  } else {
    db.data.chats[m.chat][feature] = isEnable;
  }

  await conn.reply(
    m.chat,
    `✅ Fitur *${feature}* berhasil di${isEnable ? 'aktifkan' : 'nonaktifkan'}!`,
    m
  );
};

handler.help = ["en", "dis"].map((v) => v + "able <nomor/nama fitur>");
handler.tags = ["group", "owner"];
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff))$/i;
handler.owner = true;
handler.rowner = true;

export default handler;