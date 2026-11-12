export const projectCategories = [
  {
    "id": "all",
    "label": "All"
  },
  {
    "id": "web",
    "label": "Web"
  },
  {
    "id": "systems",
    "label": "Systems"
  }
]

export const projects = [
  {
    "id": "minios",
    "title": "miniOS",
    "category": "systems",
    "technologies": [
      "C",
      "Linux",
      "Scheduling"
    ],
    "githubUrl": null,
    "translations": {
      "ko": {
        "summary": "운영체제 스케줄링 및 동기화 구현",
        "description": "운영체제의 내부 동작을 이해하기 위해 스케줄링과 동기화 기능을 구현한 학습 프로젝트입니다.",
        "highlights": [
          "Round-Robin 스케줄러 및 READY 큐 구현",
          "FCFS와 RR 스케줄링 방식 비교",
          "세마포어와 뮤텍스를 활용한 동기화",
          "테스트를 통한 기능 검증"
        ],
        "caseStudy": [
          {
            "title": "목표",
            "body": "운영체제 수업에서 배운 프로세스 스케줄링과 동기화를 실제 C 코드로 구현하고, 동작을 테스트로 확인하는 것을 목표로 했습니다."
          },
          {
            "title": "직접 구현한 부분",
            "body": "FIFO READY 큐를 기반으로 Round-Robin 스케줄러를 구현하고, time slice와 종료된 PID·중복 등록을 처리했습니다. 세마포어와 뮤텍스의 대기·소유자 관리 및 BLOCKED→READY 전환도 구현했습니다."
          },
          {
            "title": "검증 결과",
            "body": "miniOS Lab03 테스트 13/13, Lab04 테스트 16/16을 통과했습니다. FCFS와 RR 스케줄링 동작을 비교하는 실습도 진행했습니다."
          },
          {
            "title": "배운 점",
            "body": "스케줄링 정책만 구현하는 것보다 프로세스 상태와 큐의 일관성을 지키는 일이 중요하다는 점을 배웠습니다."
          }
        ],
        "workType": "구현 프로젝트"
      },
      "en": {
        "summary": "Operating system scheduling and synchronization",
        "description": "A learning project implementing scheduling and synchronization mechanisms to better understand operating system internals.",
        "highlights": [
          "Implemented a Round-Robin scheduler and READY queue",
          "Compared FCFS and RR scheduling",
          "Implemented semaphore and mutex synchronization",
          "Verified functionality through tests"
        ],
        "caseStudy": [
          {
            "title": "Goal",
            "body": "Implement the scheduling and synchronization concepts learned in operating systems using C, and verify their behavior with tests."
          },
          {
            "title": "My implementation",
            "body": "Built a Round-Robin scheduler with a FIFO ready queue, time slices, and handling of terminated and duplicate PIDs. Also implemented semaphore and mutex wait queues, ownership tracking, and BLOCKED-to-READY transitions."
          },
          {
            "title": "Verification",
            "body": "Passed all 13/13 tests in miniOS Lab03 and 16/16 tests in Lab04. Also completed an exercise comparing FCFS and RR scheduling."
          },
          {
            "title": "What I learned",
            "body": "Keeping process states and queue contents consistent is just as important as implementing the scheduling policy itself."
          }
        ],
        "workType": "Implementation project"
      },
      "ja": {
        "summary": "OSのスケジューリングと同期処理の実装",
        "description": "オペレーティングシステムの内部動作を理解するために、スケジューリングと同期機構を実装した学習プロジェクトです。",
        "highlights": [
          "Round-RobinスケジューラとREADYキューを実装",
          "FCFSとRRスケジューリング方式を比較",
          "セマフォとミューテックスによる同期処理を実装",
          "テストによる機能検証"
        ],
        "caseStudy": [
          {
            "title": "目的",
            "body": "OSの授業で学んだスケジューリングと同期処理をC言語で実装し、テストで動作を検証することを目指しました。"
          },
          {
            "title": "担当した実装",
            "body": "FIFOのREADYキューを用いたRound-Robinスケジューラ、タイムスライス、終了済み・重複PIDの処理を実装。セマフォとミューテックスの待機・所有者管理、BLOCKED→READY遷移も実装しました。"
          },
          {
            "title": "検証結果",
            "body": "miniOS Lab03で13/13件、Lab04で16/16件のテストに合格しました。FCFSとRRの動作比較も行いました。"
          },
          {
            "title": "学んだこと",
            "body": "スケジューリング方式だけでなく、プロセス状態とキューの整合性を維持する重要性を学びました。"
          }
        ],
        "workType": "実装プロジェクト"
      }
    },
    "subtitle": "Operating System Simulator",
    "kind": "implementation"
  },
  {
    "id": "portfolio-exe",
    "title": "Portfolio.exe",
    "subtitle": "Interactive Developer Portfolio",
    "kind": "implementation",
    "category": "web",
    "technologies": [
      "React",
      "Vite",
      "Tailwind CSS",
      "i18next",
      "GitHub REST API"
    ],
    "githubUrl": "https://github.com/ooxygen0v0/portfolio-exe",
    "liveUrl": "https://ooxygen0v0.github.io/portfolio-exe/",
    "translations": {
      "ko": {
        "workType": "구현·배포 프로젝트",
        "summary": "터미널 콘셉트의 3개 언어 개발자 포트폴리오",
        "description": "React와 Vite로 제작하고 GitHub Pages에 배포한 개인 포트폴리오입니다. 학습 경험을 콘텐츠로 구성하고, 컴포넌트와 상태 관리로 탐색 기능을 구현했습니다.",
        "highlights": [
          "한국어·영어·일본어 및 라이트·다크 모드",
          "명령 처리 로직을 분리한 인터랙티브 터미널",
          "GitHub REST API 연동과 조회 상태 처리",
          "반응형 UI, 프로젝트 검색·필터와 상세 페이지",
          "Git/GitHub 버전 관리와 GitHub Pages 배포"
        ],
        "caseStudy": [
          {
            "title": "목표",
            "body": "학습과 구현 경험을 한곳에 정리하고, 방문자가 대표 작업과 연락처를 탐색할 수 있는 사이트를 만들었습니다."
          },
          {
            "title": "직접 수행한 작업",
            "body": "React 컴포넌트, 페이지 라우팅, 상태 관리에 다국어와 테마를 결합했습니다. 터미널 명령 처리와 GitHub 통신 로직을 UI에서 분리했습니다."
          },
          {
            "title": "확인한 결과",
            "body": "GitHub Pages에 배포했습니다. 소스코드와 실제 사이트를 아래 링크에서 확인할 수 있습니다."
          },
          {
            "title": "배운 점",
            "body": "개별 기능의 동작뿐 아니라 다국어 콘텐츠, 화면 크기, 탐색 흐름을 함께 고려하며 기능과 콘텐츠를 구성하는 경험을 했습니다."
          }
        ]
      },
      "en": {
        "workType": "Built and deployed project",
        "summary": "A developer portfolio with a terminal concept and three languages",
        "description": "A personal portfolio built with React and Vite and deployed on GitHub Pages. I organized learning experiences as content and used components and state to implement navigation and discovery.",
        "highlights": [
          "Korean, English, and Japanese; light and dark themes",
          "Interactive terminal with a separate command engine",
          "GitHub REST API integration and request states",
          "Responsive UI, project search, filters, and detail pages",
          "Git/GitHub version control and GitHub Pages deployment"
        ],
        "caseStudy": [
          {
            "title": "Goal",
            "body": "Create one place for learning and implementation experiences, with routes to representative work and contact information."
          },
          {
            "title": "My work",
            "body": "Combined React components, routing, and state with localization and themes. Separated terminal commands and GitHub requests from UI."
          },
          {
            "title": "Results",
            "body": "Deployed on GitHub Pages. The source and live website are linked below."
          },
          {
            "title": "What I learned",
            "body": "Practiced organizing features and content together, considering languages, screen sizes, and navigation as well as individual features."
          }
        ]
      },
      "ja": {
        "workType": "実装・公開プロジェクト",
        "summary": "ターミナルをモチーフにした3言語のポートフォリオ",
        "description": "ReactとViteで制作しGitHub Pagesに公開した個人ポートフォリオです。学習経験をコンテンツに整理し、コンポーネントと状態管理で閲覧機能を実装しました。",
        "highlights": [
          "韓国語・英語・日本語とライト・ダークモード",
          "コマンド処理を分離した対話型ターミナル",
          "GitHub REST API連携と取得状態の処理",
          "レスポンシブUI、検索・フィルターと詳細ページ",
          "Git/GitHubでの変更管理とGitHub Pages公開"
        ],
        "caseStudy": [
          {
            "title": "目的",
            "body": "学習・実装経験をまとめ、代表的な取り組みと連絡先を探せるサイトを目指しました。"
          },
          {
            "title": "取り組んだ内容",
            "body": "Reactのコンポーネント、ルーティング、状態管理に多言語とテーマを組み合わせ、コマンド処理とAPI通信をUIから分離しました。"
          },
          {
            "title": "結果",
            "body": "GitHub Pagesに公開しました。以下のリンクからソースとサイトを確認できます。"
          },
          {
            "title": "学んだこと",
            "body": "機能だけでなく言語、画面サイズ、閲覧の流れも考え、機能とコンテンツを共に構成する経験を得ました。"
          }
        ]
      }
    }
  },
  {
    "id": "linux-kernel-analysis",
    "title": "Linux Kernel Analysis",
    "subtitle": "Kernel Study & Experiments",
    "kind": "analysis",
    "category": "systems",
    "technologies": [
      "Linux",
      "C",
      "Scheduling",
      "nice"
    ],
    "githubUrl": null,
    "translations": {
      "ko": {
        "workType": "기술 분석·실험",
        "summary": "실제 Linux 커널의 스케줄링 흐름과 동작 탐구",
        "description": "직접 개발한 소프트웨어가 아닌 커널 소스 분석·실험 사례입니다. 학습용 miniOS 구현과 구분하여 실제 Linux의 스케줄링·프로세스·동기화 코드를 조사했습니다.",
        "highlights": [
          "스케줄링 흐름과 관련 자료구조 분석",
          "프로세스 및 동기화 관련 코드 조사",
          "스케줄링 정책과 nice 값 관련 실험"
        ],
        "caseStudy": [
          {
            "title": "목표",
            "body": "운영체제 이론이 실제 Linux 커널에서 어떻게 표현되는지 소스와 실험을 통해 살펴보았습니다."
          },
          {
            "title": "직접 수행한 작업",
            "body": "스케줄링 흐름과 자료구조를 분석하고 프로세스·동기화 관련 코드를 조사했습니다. 스케줄링 정책과 nice 값에 관한 실험을 진행했습니다."
          },
          {
            "title": "확인한 결과",
            "body": "실험 결과를 바탕으로 시스템 동작을 관찰했습니다. 성능 개선을 구현한 프로젝트로 제시하지 않으며, 별도의 정량적 성능 수치는 기재하지 않았습니다."
          },
          {
            "title": "배운 점",
            "body": "학습용 구현과 실제 커널의 코드를 함께 살펴보며 이론적 개념, 코드의 흐름, 관찰 결과를 연결하는 연습을 했습니다."
          }
        ]
      },
      "en": {
        "workType": "Technical analysis and experiments",
        "summary": "Exploring scheduling flow and behavior in the Linux kernel",
        "description": "A kernel source study and experiment case, not software I developed. Distinct from my miniOS implementation, this work investigates scheduling, process, and synchronization code in Linux.",
        "highlights": [
          "Analysis of scheduling flow and related data structures",
          "Investigation of process and synchronization code",
          "Experiments with scheduling policies and nice values"
        ],
        "caseStudy": [
          {
            "title": "Goal",
            "body": "Examine how operating systems concepts appear in the Linux kernel through source analysis and experiments."
          },
          {
            "title": "My work",
            "body": "Analyzed scheduling flow and data structures, investigated process and synchronization code, and conducted experiments involving scheduling policies and nice values."
          },
          {
            "title": "Results",
            "body": "Observed system behavior through experiment results. This is not presented as a performance optimization implementation, and no quantitative improvement is claimed."
          },
          {
            "title": "What I learned",
            "body": "Practiced connecting theoretical concepts, code flow, and observations by studying both a learning implementation and a real kernel."
          }
        ]
      },
      "ja": {
        "workType": "技術分析・実験",
        "summary": "Linuxカーネルのスケジューリングと動作を探究",
        "description": "自作ソフトウェアではなく、カーネルソースの分析・実験事例です。miniOS実装と区別し、実際のLinuxのスケジューリング・プロセス・同期コードを調査しました。",
        "highlights": [
          "スケジューリングの流れと関連データ構造の分析",
          "プロセス・同期関連コードの調査",
          "スケジューリング方針とnice値の実験"
        ],
        "caseStudy": [
          {
            "title": "目的",
            "body": "OSの理論がLinuxカーネルにどう表現されるかを、ソースと実験から調べました。"
          },
          {
            "title": "取り組んだ内容",
            "body": "スケジューリングと関連構造を分析し、プロセス・同期コードを調査。方針やnice値の実験を行いました。"
          },
          {
            "title": "結果",
            "body": "実験結果を通じてシステム動作を観察しました。性能改善の実装としては扱わず、定量的な改善値も記載していません。"
          },
          {
            "title": "学んだこと",
            "body": "学習用実装と実際のカーネルを見比べ、理論、コードの流れ、観察結果を結び付ける練習をしました。"
          }
        ]
      }
    }
  }
]

export const archivedProjects = [
  {
    "id": "campus-scheduler",
    "title": "Campus Scheduler",
    "category": "java",
    "technologies": [
      "Java",
      "Arrays",
      "Scanner"
    ],
    "githubUrl": null,
    "translations": {
      "ko": {
        "summary": "대학생을 위한 수강 시간표 관리 프로그램",
        "description": "수업 시간, 건물 간 이동시간, 학점 제한 등을 고려해 시간표를 관리하는 Java 콘솔 프로그램입니다.",
        "highlights": [
          "과목 및 시간표 데이터 관리",
          "수업 시간 충돌 검사",
          "건물 간 이동시간 반영",
          "최대 학점 및 연강 조건 검사"
        ],
        "caseStudy": [
          {
            "title": "목표",
            "body": "수업 시간, 건물 간 이동 시간, 신청 학점 등을 함께 고려할 수 있는 Java 콘솔 시간표 관리 프로그램을 제작했습니다."
          },
          {
            "title": "직접 구현한 부분",
            "body": "Scanner 입력, String[][] 과목 정보와 int[][] 시간표 데이터를 사용했습니다. 시간 충돌, 건물 간 이동 시간, 18학점 제한, 연강 조건을 검사하도록 구성했습니다."
          },
          {
            "title": "확인 및 보완할 점",
            "body": "조건 판정과 요약 출력 기능을 구현했습니다. 공개용 상세 페이지에는 콘솔 실행 캡처와 입력 예시를 추가할 예정입니다."
          },
          {
            "title": "배운 점",
            "body": "여러 제한 조건을 프로그램으로 옮기면서 입력 검증과 판정 순서를 명확히 설계하는 연습을 했습니다."
          }
        ]
      },
      "en": {
        "summary": "Course schedule management application",
        "description": "A Java console application that manages course schedules while considering class times, travel times between buildings, and credit limits.",
        "highlights": [
          "Managed course and timetable data",
          "Detected scheduling conflicts",
          "Considered travel times between buildings",
          "Checked credit limits and consecutive classes"
        ],
        "caseStudy": [
          {
            "title": "Goal",
            "body": "Create a Java console scheduler that considers class times, travel time between buildings, and course credit limits together."
          },
          {
            "title": "My implementation",
            "body": "Used Scanner for input, String[][] for course data, and int[][] for timetable data. Added checks for time conflicts, travel time, an 18-credit limit, and consecutive-class rules."
          },
          {
            "title": "Verification and next steps",
            "body": "Implemented rule checks and summary output. Console screenshots and representative input cases will be added to the public project page."
          },
          {
            "title": "What I learned",
            "body": "Practiced translating multiple constraints into clear input validation and decision logic."
          }
        ]
      },
      "ja": {
        "summary": "大学の履修時間割管理プログラム",
        "description": "授業時間、校舎間の移動時間、履修単位数の上限などを考慮して時間割を管理するJavaコンソールアプリです。",
        "highlights": [
          "科目と時間割データの管理",
          "授業時間の重複チェック",
          "校舎間の移動時間を考慮",
          "単位数上限と連続授業の条件を確認"
        ],
        "caseStudy": [
          {
            "title": "目的",
            "body": "授業時間、校舎間の移動時間、履修単位数の制限を考慮するJavaのコンソール時間割管理プログラムを作成しました。"
          },
          {
            "title": "担当した実装",
            "body": "Scannerによる入力、String[][]の科目データ、int[][]の時間割データを使用。時間の重複、移動時間、18単位の上限、連続授業の条件を判定するようにしました。"
          },
          {
            "title": "確認事項と今後の改善",
            "body": "条件判定と一覧出力を実装しました。公開用の詳細ページにはコンソールの実行画面と入力例を追加する予定です。"
          },
          {
            "title": "学んだこと",
            "body": "複数の制約をプログラムに落とし込む過程で、入力チェックと判定の順序を明確にする重要性を学びました。"
          }
        ]
      }
    }
  },
  {
    "id": "nodebird",
    "title": "Nodebird",
    "category": "web",
    "technologies": [
      "Node.js",
      "Express",
      "Sequelize",
      "SQLite"
    ],
    "githubUrl": null,
    "translations": {
      "ko": {
        "summary": "SNS 웹 애플리케이션 실습",
        "description": "Node.js 교재를 기반으로 Express와 SQLite를 활용하여 게시글, 해시태그, 팔로우 기능을 실습한 프로젝트입니다.",
        "highlights": [
          "Express 기반 웹 서버 실행",
          "Sequelize를 활용한 데이터 관리",
          "게시글과 해시태그 기능 실습",
          "사용자 팔로우 기능 실습"
        ],
        "caseStudy": [
          {
            "title": "프로젝트 성격",
            "body": "Node.js 교재의 예제를 기반으로 진행한 SNS 웹 애플리케이션 실습입니다. 독자적으로 처음부터 설계한 서비스가 아니라는 점을 명확히 밝힙니다."
          },
          {
            "title": "실습 및 구현 내용",
            "body": "Express 서버와 Sequelize·SQLite 관계형 데이터를 구성하고, 게시글 작성, 해시태그, 사용자 팔로우 기능을 실행하며 동작을 확인했습니다."
          },
          {
            "title": "검증 결과",
            "body": "로컬 8001번 포트에서 웹 서버를 실행하고 curl로 HTTP 200 응답을 확인했습니다. 브라우저에서 해시태그와 팔로우 기능도 확인했습니다."
          },
          {
            "title": "배운 점",
            "body": "서버 라우팅과 ORM 모델, 테이블 관계가 SNS 기능으로 연결되는 과정을 익혔습니다. 실행 환경과 네트워크 접근 문제를 점검하는 경험도 했습니다."
          }
        ]
      },
      "en": {
        "summary": "Social networking application exercise",
        "description": "A textbook-based Node.js project using Express and SQLite to practice posts, hashtags, and following features.",
        "highlights": [
          "Ran an Express web server",
          "Practiced data management with Sequelize",
          "Practiced posts and hashtags",
          "Practiced user following functionality"
        ],
        "caseStudy": [
          {
            "title": "Project context",
            "body": "A guided SNS application exercise based on a Node.js textbook, not an independently designed production service."
          },
          {
            "title": "Implementation and practice",
            "body": "Configured an Express server with Sequelize and SQLite relational data. Exercised posts, hashtags, and user-follow features."
          },
          {
            "title": "Verification",
            "body": "Started the local server on port 8001 and verified an HTTP 200 response using curl. Also checked hashtag and follow behavior in the browser."
          },
          {
            "title": "What I learned",
            "body": "Learned how routing, ORM models, and relational tables connect to SNS features, and gained experience troubleshooting local server and network access."
          }
        ]
      },
      "ja": {
        "summary": "SNS Webアプリケーションの実習",
        "description": "Node.jsの教材をもとに、ExpressとSQLiteを使用して投稿、ハッシュタグ、フォロー機能を学んだプロジェクトです。",
        "highlights": [
          "ExpressによるWebサーバーの起動",
          "Sequelizeを用いたデータ管理の実習",
          "投稿とハッシュタグ機能の実習",
          "ユーザーフォロー機能の実習"
        ],
        "caseStudy": [
          {
            "title": "プロジェクトの位置づけ",
            "body": "Node.jsの教材に基づくSNSアプリケーションの実習です。最初から独自設計した本番サービスではないことを明記します。"
          },
          {
            "title": "実習・実装内容",
            "body": "ExpressサーバーとSequelize・SQLiteのリレーショナルデータを構成し、投稿、ハッシュタグ、ユーザーフォロー機能を実行・確認しました。"
          },
          {
            "title": "検証結果",
            "body": "ローカルの8001番ポートでサーバーを起動し、curlでHTTP 200を確認しました。ブラウザでもハッシュタグとフォロー機能を確認しました。"
          },
          {
            "title": "学んだこと",
            "body": "ルーティング、ORMモデル、テーブル間の関係がSNS機能に結びつく仕組みを学び、ローカル環境やネットワークの問題を調査する経験も得ました。"
          }
        ]
      }
    }
  }
]
