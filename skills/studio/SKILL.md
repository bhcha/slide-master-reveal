---
description: Slide Master Studio 에디터 열기
---

# Studio

브라우저에서 Slide Master Studio 에디터를 엽니다. 마스터 설정과 덱 구성 후 프로젝트 파일(.json)로 저장합니다.

## 사용법

```
/slide-master-reveal:studio
```

## 실행

1. 포트 확인 (4173이 사용 중인지 체크):
   ```bash
   lsof -ti:4173
   ```
   - **출력이 있으면**: 이미 실행 중. `open http://localhost:4173`으로 바로 열기
   - **출력이 없으면**: 아래 서버 실행

2. 서버 실행:
   ```bash
   npx serve ${CLAUDE_SKILL_DIR}/dist -l 4173 --single &
   sleep 1 && open http://localhost:4173
   ```

종료 시 `kill %1` 또는 Ctrl+C.

## 에디터 기능

### 파일 메뉴

| 메뉴 | 동작 |
|------|------|
| **New** | 새 프로젝트 생성 (dirty면 확인 다이얼로그) |
| **Open** | 프로젝트 파일(.json) 열기 (File System Access API) |
| **Save** (Ctrl+S) | 현재 파일에 저장. 파일 핸들 없으면 Save As |
| **Save As** | 새 파일로 저장 |

- Chrome 또는 Edge 전용 (File System Access API 필요)
- 파일명 + dirty 표시(•)가 상단에 표시됨
- 프로젝트 파일 포맷: `{ version: 2, master, deck, css }` — Save 시 CSS 자동 생성 포함

### Master 탭

- **레이아웃 선택**: HeaderBodyFooter, TitleOnly, TwoColumn, BlankCanvas
- **Frame 설정**: Header/Footer의 visibility, align 설정
- **Tokens 설정**: Colors(11종), Typography(6 role), Spacing(9종), Radius(3종)
- **레이아웃별 오버라이드**: 글로벌 → 레이아웃 기본 → 사용자 오버라이드 캐스케이드

### Deck 탭

- 슬라이드 추가/삭제/복제/순서 변경
- 레이아웃 선택 후 구조 슬롯 입력 (headerTag, headerTitle 등)
- Body와 나레이션은 `/fill`과 `/enhance`에서 채움 (프리뷰에 placeholder 표시)
- 실시간 구조 프리뷰

## 실행 후 반드시 안내할 내용

서버 실행 후 사용자에게 아래 내용을 **모두** 출력한다:

1. Master 탭 — 레이아웃, 토큰(색상/타이포/간격), 프레임 설정
2. Deck 탭 — 슬라이드 추가/편집, 슬롯별 콘텐츠 입력
3. Save (Ctrl+S) — 프로젝트 파일(.json) 저장
4. **⚠️ 프로젝트 파일은 현재 작업 디렉토리에 저장하세요. scaffold에서 경로를 지정해야 합니다.**

다음 단계:
```
/slide-master-reveal:scaffold <프로젝트파일>.json 출력은 ./presentation/
```
