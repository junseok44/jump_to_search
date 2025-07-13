# 🔍 JumpToSearch

사용자가 선택한 사이트의 검색창으로 즉시 이동할 수 있는 검색 도우미 크롬 확장 프로그램입니다.

## ✨ 주요 기능

### 🔍 검색 실행

- 드롭다운에서 검색 대상 사이트 선택
- 검색어 입력 후 검색 버튼 클릭
- 새 탭 또는 현재 탭에서 열기 옵션

### 🏪 사이트 등록/관리

- 사용자가 직접 검색 엔진 추가 가능
- 사이트 이름과 URL 템플릿 설정
- `{query}` 키워드로 검색어 자동 삽입
- 등록한 사이트는 드롭다운에 즉시 반영
- 로컬스토리지 기반 저장

### ⚙️ 설정 옵션

- 새 탭 여부를 체크박스로 지정
- 등록한 검색 엔진 수정/삭제 가능
- 간단한 리스트 UI 제공

## 🚀 기본 제공 사이트

- **Google**: `https://www.google.com/search?q={query}`
- **YouTube**: `https://www.youtube.com/results?search_query={query}`
- **Naver**: `https://search.naver.com/search.naver?query={query}`
- **Stack Overflow**: `https://stackoverflow.com/search?q={query}`
- **GitHub**: `https://github.com/search?q={query}`

## 📦 설치 방법

### 1. 개발자 모드 활성화

1. Chrome 브라우저에서 `chrome://extensions/` 접속
2. 우측 상단의 "개발자 모드" 토글 활성화

### 2. 확장 프로그램 로드

1. "압축해제된 확장 프로그램을 로드합니다" 버튼 클릭
2. 이 프로젝트 폴더 선택
3. 확장 프로그램이 설치되면 브라우저 툴바에 아이콘 표시

## 🎯 사용 방법

### 기본 검색

1. 브라우저 툴바의 JumpToSearch 아이콘 클릭
2. 드롭다운에서 검색할 사이트 선택
3. 검색어 입력
4. "새 탭에서 열기" 옵션 확인/해제
5. "검색" 버튼 클릭

### 새 사이트 추가

1. 팝업에서 "+" 버튼 클릭
2. 사이트 이름 입력 (예: "StackOverflow")
3. 검색 URL 템플릿 입력 (예: `https://stackoverflow.com/search?q={query}`)
4. "저장" 버튼 클릭

### 사이트 관리

1. "설정" 버튼 클릭
2. 등록된 사이트 목록에서 "수정" 또는 "삭제" 버튼 사용

## 🛠️ 기술 스택

- **플랫폼**: Chrome Extension (Manifest v3)
- **언어**: JavaScript (ES6+)
- **UI**: HTML + CSS (모던 디자인)
- **저장 방식**: chrome.storage.local

## 📁 프로젝트 구조

```
jump-to-search/
├── manifest.json          # 확장 프로그램 설정
├── popup.html            # 팝업 UI
├── popup.css             # 스타일시트
├── popup.js              # 팝업 로직
├── background.js         # 백그라운드 서비스 워커
├── icons/                # 아이콘 파일들
└── README.md             # 프로젝트 문서
```

## 🔧 개발 환경 설정

1. 프로젝트 클론 또는 다운로드
2. Chrome 브라우저에서 개발자 모드 활성화
3. 확장 프로그램 로드
4. 코드 수정 후 확장 프로그램 새로고침

## 🎨 커스터마이징

### 새 사이트 추가 예시

```
사이트 이름: Reddit
URL 템플릿: https://www.reddit.com/search/?q={query}
```

### CSS 스타일 수정

`popup.css` 파일을 수정하여 UI 스타일 변경 가능

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

버그 리포트, 기능 제안, 풀 리퀘스트를 환영합니다!

---

**JumpToSearch**로 더 빠르고 효율적인 검색을 경험해보세요! 🚀
