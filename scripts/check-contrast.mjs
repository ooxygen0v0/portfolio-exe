// 사용 중인 Tailwind 색상 토큰의 일반 텍스트 대비 검사.
// 실제 화면의 합성 배경·투명도·hover 상태 검사는 별도로 수행해야 합니다.
import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

const theme = await readFile(new URL('../node_modules/tailwindcss/theme.css', import.meta.url), 'utf8')
function rgb(name) {
  if (name === 'white') return [1, 1, 1]
  const token = theme.match(new RegExp(`--color-${name}: oklch\\(([\\d.]+)% ([\\d.]+) ([\\d.]+)\\)`))
  assert.ok(token, `Missing color ${name}`)
  const l = Number(token[1]) / 100
  const c = Number(token[2])
  const h = Number(token[3]) * Math.PI / 180
  const a = c * Math.cos(h), b = c * Math.sin(h)
  const ll = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const mm = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const ss = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [4.0767416621 * ll - 3.3077115913 * mm + 0.2309699292 * ss, -1.2684380046 * ll + 2.6097574011 * mm - 0.3413193965 * ss, -0.0041960863 * ll - 0.7034186147 * mm + 1.707614701 * ss].map(v => Math.min(1, Math.max(0, v)))
}
function luminance(color) { return rgb(color).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0) }
const pairs = [
  ['slate-900', 'slate-50'], ['slate-700', 'white'], ['slate-600', 'slate-50'],
  ['slate-600', 'slate-100'], ['sky-700', 'slate-50'], ['sky-800', 'sky-50'],
  ['slate-300', 'slate-900'], ['slate-400', 'slate-800'], ['slate-400', 'slate-900'],
  ['cyan-400', 'slate-900'], ['cyan-300', 'slate-900'], ['slate-950', 'cyan-400'],
]
for (const [foreground, background] of pairs) {
  const a = luminance(foreground), b = luminance(background)
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  console.log(`${foreground} / ${background}: ${ratio.toFixed(2)}:1`)
  assert.ok(ratio >= 4.5, `Contrast below 4.5:1: ${foreground} / ${background}`)
}
