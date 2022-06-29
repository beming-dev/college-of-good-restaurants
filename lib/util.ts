import { escapeRegExp } from "lodash";

function ch2pattern(ch: string) {
  const offset = 44032; /* '가'의 코드 */
  // 한국어 음절
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    // 종성이 있으면 문자 그대로를 찾는다.
    if (chCode % 28 > 0) {
      return ch;
    }
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 한글 자음
  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl: any = {
      ㄱ: "가".charCodeAt(0),
      ㄲ: "까".charCodeAt(0),
      ㄴ: "나".charCodeAt(0),
      ㄷ: "다".charCodeAt(0),
      ㄸ: "따".charCodeAt(0),
      ㄹ: "라".charCodeAt(0),
      ㅁ: "마".charCodeAt(0),
      ㅂ: "바".charCodeAt(0),
      ㅃ: "빠".charCodeAt(0),
      ㅅ: "사".charCodeAt(0),
    };
    const begin =
      con2syl[ch] ||
      (ch.charCodeAt(0) - 12613) /* 'ㅅ'의 코드 */ * 588 + con2syl["ㅅ"];
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }
  // 그 외엔 그대로 내보냄
  // escapeRegExp는 lodash에서 가져옴
  return escapeRegExp(ch);
}

export function createFuzzyMatcher(input: any) {
  const pattern = input.split("").map(ch2pattern).join(".*?");
  return new RegExp(pattern);
}

export function getJwtExp(jwt: string) {
  const s: string[] = jwt.split(".", 3);
  const a = JSON.parse(window.atob(s[1]));

  return a.exp;
}

export function getJwtUsername(jwt: string) {
  const s: string[] = jwt.split(".", 3);
  const a = JSON.parse(window.atob(s[1]));
  return a.username;
}

export function getJwtCollegeId(jwt: string) {
  const s: string[] = jwt.split(".", 3);
  const a = JSON.parse(window.atob(s[1]));
  return a["college_id"];
}

export function toStringByFormatting(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const m = month >= 10 ? month : "0" + month;
  const d = day >= 10 ? day : "0" + day;

  return date.getFullYear() + "-" + m + "-" + d + " ";
}

export function sleep(ms: number) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {
    console.log(1);
  }
}
