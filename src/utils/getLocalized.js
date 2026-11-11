// UI 번역(t)은 기존 i18next를 사용하고, 스킬/프로젝트 콘텐츠는 이 함수로 번역합니다.
// 예: getLocalized(project, 'ja').summary
export function getLocalized(item, language = 'ko') {
  const code = typeof language === 'string'
    ? language.toLowerCase().split('-')[0]
    : 'ko'

  return item?.translations?.[code]
    ?? item?.translations?.ko
    ?? {}
}
