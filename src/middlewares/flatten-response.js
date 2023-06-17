function flattenArray(obj) {
  return obj.map((e) => flatten(e));
}

function flattenData(obj) {
  return flatten(obj.data);
}

function flattenAttrs(obj) {
  let attrs = {};
  for (let key in obj.attributes) {
    attrs[key] = flatten(obj.attributes[key]);
  }
  return {
    id: obj.id,
    ...attrs,
  };
}

function flatten(obj) {
  if (Array.isArray(obj)) {
    return flattenArray(obj);
  }
  if (obj && obj.data) {
    return flattenData(obj);
  }
  if (obj && obj.attributes) {
    return flattenAttrs(obj);
  }
  for (let k in obj) {
    if (typeof obj[k] == "object") {
      obj[k] = flatten(obj[k]);
    }
  }
  return obj;
}

async function respond(ctx, next) {
  await next();
  let ignorePaths = ["auth", "users"]; // >> Set ignore pathes here... e.g: /api/users/* OR /api/auth/*
  let isUrlIgnored = ignorePaths.some((path) => {
    let pattern = new RegExp(`\/${path}\/`, "gi");
    let bool = pattern.test(ctx.url);
    return bool;
  });

  if (!ctx.url.startsWith("/api") || isUrlIgnored) {
    return;
  }
  if (ctx?.request?.url?.includes("meta=true") && ctx?.response?.body?.meta) {
    ctx.response.body.meta = ctx.response.body.meta || null;
    if (ctx?.response?.body)
      ctx.response.body.data = flatten(ctx.response.body.data);
  } else {
    if (ctx?.response?.body)
      ctx.response.body = flatten(ctx.response.body.data);
  }
}

module.exports = () => respond;
