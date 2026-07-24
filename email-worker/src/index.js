export default {
  async email(message, env, ctx) {
    const key = `${Date.now()}-${crypto.randomUUID()}.eml`;
    await env.INBOX.put(key, message.raw, {
      customMetadata: { from: message.from, to: message.to.join(",") },
    });
  },

  async fetch(request, env, ctx) {
    const auth = request.headers.get("x-auth");
    if (!auth || auth !== env.POLL_SECRET) {
      return new Response("unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    if (key) {
      const obj = await env.INBOX.get(key);
      if (!obj) return new Response("not found", { status: 404 });
      return new Response(obj.body, {
        headers: { "content-type": "message/rfc822" },
      });
    }

    const listed = await env.INBOX.list({ limit: 100 });
    const items = listed.objects
      .sort((a, b) => b.uploaded - a.uploaded)
      .map((o) => ({
        key: o.key,
        size: o.size,
        uploaded: o.uploaded,
        from: o.customMetadata?.from,
        to: o.customMetadata?.to,
      }));
    return new Response(JSON.stringify(items, null, 2), {
      headers: { "content-type": "application/json" },
    });
  },
};
