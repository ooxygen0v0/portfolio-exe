# 콘텐츠 명확화 검토 — 2026-11-12

작업 브랜치: `feature/content-clarity`

기존 `feature/final-ux`의 미커밋 변경을 보존하여 작업했습니다. main 병합·커밋·원격 배포는 수행하지 않았습니다.

## 변경 전후 — 한국어

| 영역 | 변경 전 | 변경 후 |
| --- | --- | --- |
| Home Hero | 카투사 IT 실무를 경험하고, miniOS 스케줄러·동기화를 구현해 Lab03 13/13·Lab04 16/16 테스트를 통과했습니다. | 카투사에서 IT 실무를 경험한 뒤 컴퓨터공학을 공부하며, 운영체제의 동작과 웹 서비스를 직접 구현하고 있습니다. |
| miniOS 카드 제목 | miniOS | 운영체제의 작업 실행과 동기화 구현 (miniOS는 보조 이름으로 유지) |
| miniOS 카드 설명 | 운영체제 스케줄링 및 동기화 구현 | 여러 작업에 CPU 실행 순서를 배분하고, 공유 자원에 대한 접근을 조정하는 운영체제의 동작을 코드로 구현했습니다. |
| Portfolio.exe 카드 제목 | Portfolio.exe | 학습과 개발 경험을 탐색하는 포트폴리오 |
| Linux 카드 제목 | Linux Kernel Analysis | Linux가 작업을 실행하는 방식 탐구 |
| About 경험 요약 | miniOS · 구현과 검증 / Lab03 13/13 · Lab04 16/16 | 운영체제 · 직접 구현 / 작업 실행 순서와 동기화 학습 |
| 카드 보조 정보 | 카테고리·slug·작업 유형·프로젝트명·영문 부제·결과·기술 태그 | 설명형 제목 → 탐구 내용 → 프로젝트명·작업 유형 → 간결한 기술 목록 |
| 상세 | 기술 스택·기능 목록 → 4개 카드, 테스트 결과는 상단 | 문제와 목표 → 구현 및 분석 과정 → 결과와 검증 → 배운 점, 기술 스택은 하단 |

## Home — 영어·일본어

| 언어 | 변경 전 | 변경 후 |
| --- | --- | --- |
| English | After practical IT work as a KATUSA, I implemented miniOS scheduling and synchronization, passing 13/13 Lab03 and 16/16 Lab04 tests. | With practical IT experience from my KATUSA service, I now study Computer Engineering and build operating-system exercises and web applications. |
| 日本語 | KATUSAでIT実務を経験し、miniOSのスケジューリングと同期処理を実装。Lab03で13/13件、Lab04で16/16件のテストに合格しました。 | KATUSAでのIT実務経験を経てコンピュータ工学を学び、OSの動作やWebアプリケーションを実装しています。 |

## miniOS検証の範囲

- 기존 기록의 Lab03 13/13, Lab04 16/16은 유지하고 상세 검증 섹션으로 모았습니다.
- 수치는 통과 테스트 수 / 전체 테스트 수임을 설명했습니다. 성능 향상률은 주장하지 않습니다.
- 실습에서 다룬 스케줄링·프로세스 상태 관리·공유 자원 동기화의 맥락을 제공합니다.
- 개별 테스트의 항목 목록과 Lab별 세부 기능 대응은 원본 자료가 없으므로 임의로 지정하지 않았습니다.
- 테스트 원본 캡처나 실제 구현 구조도는 추가하지 않았습니다. 원본 제공이 필요합니다.
- Linux Kernel Analysis는 여전히 소스 분석·실험 사례이며, 직접 개발 소프트웨어나 성능 개선으로 소개하지 않습니다.

## 실제 자료 추가 방법

`src/data/projects.js`에서 각 언어의 `caseStudy`는 `goal`, `process`, `verification`, `learning` 순서입니다.
각 단계의 `media` 배열은 현재 비어 있으며, 실제 자료가 있을 때만 `{ src, alt, caption }` 항목을 추가합니다.

- `src`: 실제 이미지 파일을 Vite asset import로 가져온 URL 사용을 권장합니다. GitHub Pages 하위 경로에서 유효해야 합니다.
- `alt`: 해당 언어로 작성한 이미지 대체 텍스트
- `caption`: 해당 언어로 작성한 자료 설명과 필요한 경우 실행 환경·출처
- 테스트 화면은 `verification`, 구현 구조도는 해당 내용에 따라 `process` 또는 `verification`에 배치합니다.
- 빈 media는 이미지나 가짜 자리표시자를 렌더링하지 않습니다.

## 이번 작업의 변경 파일

- `src/data/projects.js`: 설명형 제목·쉬운 요약·상세 단계 ID·검증 맥락·자료 슬롯
- `src/data/profile.js`: About 학습 문단에서 테스트 수치를 제거하고 기술 용어의 역할 설명
- `src/locales/{ko,en,ja}-extra.json`: Home 문장·About 요약·검증 설명
- `src/components/ProjectCard.jsx`: 목적 우선 정보 계층과 메타데이터 축소
- `src/components/ProfileStory.jsx`: 상세로 검증 안내를 연결하고 중복 수치 제거
- `src/components/TestResults.jsx`: 테스트 수치의 단위와 의미 설명
- `src/pages/Projects.jsx`: 설명형 제목도 검색 대상에 포함
- `src/pages/ProjectDetail.jsx`: 4단계 서사 구조와 실제 자료 렌더링 지원
- `scripts/step18-check.mjs`, `scripts/check-render.mjs`: 새 데이터 구조와 정보 계층 검사

Home JSX는 기존 번역 키를 재사용하므로 이 작업에서 추가 수정하지 않았습니다.

## 검증 결과

- ESLint: 통과
- 프로덕션 빌드: 통과 (기존 500kB 초과 번들 경고는 남음)
- 기존 콘텐츠 검사 2종: 통과
- 세 언어 렌더링: Home / About / Contact / Skills / Projects / 상세 3개 / 미존재 ID 안내 통과
- Home·About·목록에 Lab명과 테스트 수치가 없는지 검사: 통과
- 상세 4단계 순서, 검증 구간 내 테스트 수치 배치 검사: 통과
- 기존 색상 토큰 대비 검사 12개: 통과

실제 브라우저의 검색 조작, 모바일 줄바꿈, 라이트·다크 화면과 이미지가 추가된 경우의 실제 배치는 이번 작업에서 검증하지 않았습니다. 정적·서버 렌더링 검사가 이를 대체하지는 않습니다.
