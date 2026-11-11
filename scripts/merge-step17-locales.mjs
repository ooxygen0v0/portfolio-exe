import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// STEP 15 이후 추가한 contact 번역을 보존하면서 메뉴 접근성 문구만 병합합니다.
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const labels = {
  ko: {
    navigation: '주 메뉴',
    mobileNavigation: '모바일 메뉴',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
  },
  en: {
    navigation: 'Main navigation',
    mobileNavigation: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  ja: {
    navigation: 'メインナビゲーション',
    mobileNavigation: 'モバイルメニュー',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
  },
}

for (const [language, responsive] of Object.entries(labels)) {
  const filePath = join(projectRoot, 'src', 'locales', `${language}-extra.json`)
  const original = JSON.parse(await readFile(filePath, 'utf8'))
  original.responsive = { ...(original.responsive ?? {}), ...responsive }
  await writeFile(filePath, `${JSON.stringify(original, null, 2)}\n`, 'utf8')
  console.log(`Merged responsive translations: ${language}-extra.json`)
}
