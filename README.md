# Portfolio.exe

컴퓨터공학 학습 과정과 개발 경험을 소개하는 **React 기반 다국어 개발자 포트폴리오**입니다. 웹 페이지와 상호작용하는 모의 Linux 터미널을 결합했습니다.

## 주요 기능

- **5개 페이지:** Home, About, Skills, Projects, Contact
- **프로젝트 탐색:** 카테고리 필터, 텍스트 검색, 상세 페이지
- **기술 스택 탐색:** 분야별 필터
- **인터랙티브 터미널:** `help`, `ls`, `cd`, `cat`, `whoami` 등 미리 정의한 명령어 실행 (실제 운영체제 명령은 실행하지 않습니다)
- **다국어:** 한국어, 영어, 일본어
- **테마:** 다크 / 라이트 모드 및 사용자 설정 저장
- **애니메이션:** 스크롤 등장 및 페이지 전환
- **GitHub 연동:** GitHub 공개 프로필과 공개 저장소 조회 (GitHub REST API)
- **반응형 UI:** 모바일 / 태블릿 / 데스크톱 대응

## 기술 스택

- React, Vite
- JavaScript (JSX)
- Tailwind CSS v4
- React Router
- Motion for React
- i18next / react-i18next
- GitHub REST API

## 프로젝트 소개

| 프로젝트 | 요약 |
| --- | --- |
| miniOS | 운영체제 스케줄링·동기화 구현 및 테스트 |
| Campus Scheduler | Java 기반 시간표 관리, 충돌·이동 시간·학점 제한 검사 |
| Nodebird | 교재 기반 Node.js/Express/SQLite 소셜 서비스 실습 |

> 위 항목들은 포트폴리오에서 **소개하는 프로젝트**입니다. 소스코드가 모두 이 저장소에 포함되는 것은 아닙니다.

## 로컬 실행

요구 환경: Node.js 및 npm

```bash
npm install
npm run dev
```

터미널에 표시되는 로컬 URL(일반적으로 `http://localhost:5173`)로 접속합니다.

검사 및 빌드:

```bash
npm run lint
npm run build
```

Windows PowerShell에서 npm 실행 정책 문제가 있는 경우 `npm` 대신 `npm.cmd`를 사용해도 됩니다.

## 설정

- `src/config/github.js`: 표시할 공개 GitHub 사용자 이름
- `src/config/contact.js`: 연락처 이메일 (비워 두면 이메일 카드 숨김)
- `src/data/projects.js`: 프로젝트 콘텐츠와 언어별 설명
- `src/data/skills.js`: 기술 스택 콘텐츠와 언어별 설명
- `src/data/profile.js`: 소개, 학습·활동·자격증 콘텐츠

**주의:** 이 저장소는 브라우저에서 실행하는 프런트엔드 프로젝트입니다. `src`에 작성한 값은 사용자에게 노출될 수 있으므로 비밀번호, 비밀 토큰, 개인 API 키를 저장하지 마세요. GitHub 공개 API 조회에 별도 개인 토큰을 넣지 않습니다.

## 개발 현황

**Prototype v1.0** — 핵심 페이지 및 기능을 구현하고 정적 검사·ESLint·프로덕션 빌드를 통과한 단계입니다. 브라우저 통합 테스트와 접근성·성능 최적화는 이후에도 계속 진행합니다.

## 향후 개선 계획

- 모바일/데스크톱 브라우저 전반의 회귀 테스트
- 페이지 단위 코드 분할 및 성능 개선
- 프로젝트별 실제 실행 화면과 기술적 회고 보강
- 접근성 점검과 배포

---

본 프로젝트는 컴퓨터공학 학습 및 포트폴리오 제작을 목적으로 개발 중입니다.