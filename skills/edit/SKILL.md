---
description: 브라우저에서 텍스트 직접 편집 서버 실행
---

# Edit

브라우저에서 프레젠테이션 텍스트를 직접 클릭하여 편집할 수 있는 서버를 실행합니다.

> **주의: body-separation 아키텍처**
> edit는 assembled `index.html`을 직접 수정합니다.
> 다음 assemble 실행 시 body 파일 기준으로 재생성되므로, **edit 후 변경사항을 body 파일에 반영해야 합니다.**

## 사용법

```
/slide-master-reveal:edit
```

## 실행 순서

1. assemble 실행 (최신 상태 확인):
   ```bash
   node ${CLAUDE_SKILL_DIR}/../scaffold/assemble.js --dir <프레젠테이션 디렉토리>
   ```

2. 편집 서버 실행:
   ```bash
   node ${CLAUDE_SKILL_DIR}/edit-html.js <프레젠테이션>/index.html
   ```

3. 사용자에게 안내:
   - 브라우저에서 텍스트 클릭 → 편집
   - Escape → 선택 해제
   - Save 클릭 → 파일 저장
   - Ctrl+C → 서버 종료

4. **[필수] 편집 완료 후 body 파일 동기화:**
   - 서버 종료 후, 수정된 `index.html`의 해당 슬라이드 `.slide-body` 내용을 확인
   - 변경된 내용을 `slides/slide-N-body.html`에 반영 (Read로 index.html 확인 → Edit로 body 파일 수정)
   - 동기화하지 않으면 다음 assemble 시 변경이 유실됨

## 참고

- 오타 수정, 문구 미세 조정에 적합
- 구조나 레이아웃 변경은 body 파일 직접 편집 → assemble로 처리
