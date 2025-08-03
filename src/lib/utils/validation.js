export function validateMessage(data) {
  const errors = {}

  if (!data.title || data.title.trim().length < 1) {
    errors.title = "标题不能为空"
  }

  if (!data.content || data.content.trim().length < 1) {
    errors.content = "内容不能为空"
  }

  if (!data.author?.name || data.author.name.trim().length < 1) {
    errors.authorName = "作者姓名不能为空"
  }

  if (!data.author?.email || !isValidEmail(data.author.email)) {
    errors.authorEmail = "请输入有效的邮箱地址"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateReply(data) {
  const errors = {}

  if (!data.content || data.content.trim().length < 1) {
    errors.content = "回复内容不能为空"
  }

  if (!data.author?.name || data.author.name.trim().length < 1) {
    errors.authorName = "作者姓名不能为空"
  }

  if (!data.author?.email || !isValidEmail(data.author.email)) {
    errors.authorEmail = "请输入有效的邮箱地址"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// XSS 防护 - 简单的HTML标签过滤
export function sanitizeContent(content) {
  return content
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}
