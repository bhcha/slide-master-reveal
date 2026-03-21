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

```bash
npx serve ~/workspace/slide-master-reveal/editor -l 4173 --single &
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
- 프로젝트 파일 포맷: `{ master, deck, css }` — Save 시 CSS 자동 생성 포함

### Master 탭

- **레이아웃 선택**: HeaderBodyFooter, TitleOnly, TwoColumn, BlankCanvas
- **Frame 설정**: Header/Footer/Narration Bar의 visibility, align 설정
- **Tokens 설정**: Colors(11종), Typography(6 role), Spacing(9종), Radius(3종)
- **레이아웃별 오버라이드**: 글로벌 → 레이아웃 기본 → 사용자 오버라이드 캐스케이드

### Deck 탭

- 슬라이드 추가/삭제/복제/순서 변경
- 레이아웃 선택 후 슬롯별 입력
- **Content**: 확정 텍스트 (headerTag, headerTitle 등)
- **Prompt**: AI 생성용 프롬프트 (bodyPrompt, leftPrompt 등)
- **Narration**: 나레이션 텍스트
- 실시간 구조 프리뷰

## 다음 단계

에디터에서 Save로 프로젝트 파일을 저장한 후:
```
/slide-master-reveal:scaffold slide-project.json 출력은 ./presentation/
```
