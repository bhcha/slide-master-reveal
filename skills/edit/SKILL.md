---
description: 브라우저에서 텍스트 직접 편집 서버 실행
---

# Edit

브라우저에서 프레젠테이션 텍스트를 직접 클릭하여 편집할 수 있는 서버를 실행합니다.

## 사용법

```
/slide-master-reveal:edit
```

## 실행 순서

1. 편집 서버 실행:
   ```bash
   node ${CLAUDE_SKILL_DIR}/../../upstream/scripts/edit-html.js <프레젠테이션>/index.html
   ```

2. 사용자에게 안내:
   - 브라우저에서 텍스트 클릭 → 편집
   - Escape → 선택 해제
   - Save 클릭 → 파일 저장
   - Ctrl+C → 서버 종료

## 참고

- 로컬 서버로 실행되어 변경사항이 HTML 파일에 직접 저장됨
- 오타 수정, 문구 미세 조정에 적합
- 레이아웃이나 구조 변경은 직접 HTML 편집 필요
