const qrcode = require("qrcode-terminal");
const { Client, MessageMedia } = require("whatsapp-web.js");

const client = new Client({
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message_create", async (msg) => {
  if (msg.body == "!s" && msg.hasMedia) {
    const media = await msg.downloadMedia();
    const sticker = new MessageMedia(media.mimetype, media.data);
    client
      .sendMessage(msg.from, sticker, {
        sendMediaAsSticker: true,
        stickerAuthor: "--",
        stickerName: "--",
      })
      .then(() => console.log("Sticker sent!"))
      .catch((e) => console.log(e));
  }
});

client.on("message", async (msg) => {
  if (msg.body == "!s" && msg.hasMedia) {
    const media = await msg.downloadMedia();
    const sticker = new MessageMedia(media.mimetype, media.data);
    client
      .sendMessage(msg.from, sticker, {
        sendMediaAsSticker: true,
        stickerAuthor: "--",
        stickerName: "--",
      })
      .then(() => console.log("Sticker sent!"))
      .catch((e) => console.log(e));
  }
});

client.initialize();
