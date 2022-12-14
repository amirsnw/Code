// www.passwordmeter.com/
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-password-meter',
  templateUrl: './password-meter.component.html',
  styleUrls: ['./password-meter.component.css']
})
export class PasswordMeterComponent implements OnInit {
  @ViewChild('score') score: ElementRef;
  @ViewChild('scorebar') scorebar: ElementRef;
  @ViewChild('complexity') complexity: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  checkPassword(pwd: string) {
    const oScore = this.score.nativeElement;
    const oScorebar = this.scorebar.nativeElement;
    const oComplexity = this.complexity.nativeElement;
    let nScore = 0,
      nLength = 0,
      nAlphaUC = 0,
      nAlphaLC = 0,
      nNumber = 0,
      nSymbol = 0,
      nMidChar = 0,
      nRequirements = 0,
      nAlphasOnly = 0,
      nNumbersOnly = 0,
      nUnqChar = 0,
      nRepChar = 0,
      nRepInc = 0,
      nConsecAlphaUC = 0,
      nConsecAlphaLC = 0,
      nConsecNumber = 0,
      nConsecSymbol = 0,
      nConsecCharType = 0,
      nSeqAlpha = 0,
      nSeqNumber = 0,
      nSeqSymbol = 0,
      nSeqChar = 0,
      nReqChar = 0;
    // nMultConsecCharType = 0;
    const nMultRepChar = 1, nMultConsecSymbol = 1;
    const nMultMidChar = 2, nMultRequirements = 2, nMultConsecAlphaUC = 2, nMultConsecAlphaLC = 2, nMultConsecNumber = 2;
    const nReqCharType = 3, nMultAlphaUC = 3, nMultAlphaLC = 3, nMultSeqAlpha = 3, nMultSeqNumber = 3, nMultSeqSymbol = 3;
    const nMultLength = 4, nMultNumber = 4;
    const nMultSymbol = 6;
    let nTmpAlphaUC = '', nTmpAlphaLC = '', nTmpNumber = '', nTmpSymbol = '';
    let sAlphaUC = '0',
      sAlphaLC = '0',
      sNumber = '0',
      sSymbol = '0',
      sMidChar = '0',
      // sRequirements = '0',
      sAlphasOnly = '0',
      sNumbersOnly = '0',
      sRepChar = '0',
      sConsecAlphaUC = '0',
      sConsecAlphaLC = '0',
      sConsecNumber = '0',
      sSeqAlpha = '0',
      sSeqNumber = '0',
      sSeqSymbol = '0';
    const sAlphas = 'abcdefghijklmnopqrstuvwxyz';
    const sNumerics = '01234567890';
    const sSymbols = ')!@#$%^&*()';
    let sComplexity = '';
    const sStandards = 'Below';
    const nMinPwdLen = 8;
    if (document.all) {
      const nd = 0;
    } else {
      const nd = 1;
    }
    if (pwd) {
      nScore = Number(pwd.length * nMultLength);
      nLength = pwd.length;
      const arrPwd = pwd.replace(/\s+/g, '').split(/\s*/);
      const arrPwdLen = arrPwd.length;

      for (let a = 0; a < arrPwdLen; a++) {
        if (arrPwd[a].match(/[A-Z]/g)) {
          if (nTmpAlphaUC !== '') {
            if (Number(nTmpAlphaUC + 1) === a) {
              nConsecAlphaUC++;
              nConsecCharType++;
            }
          }
          nTmpAlphaUC = a.toString();
          nAlphaUC++;
        } else if (arrPwd[a].match(/[a-z]/g)) {
          if (nTmpAlphaLC !== '') {
            if (Number(nTmpAlphaLC + 1) === a) {
              nConsecAlphaLC++;
              nConsecCharType++;
            }
          }
          nTmpAlphaLC = a.toString();
          nAlphaLC++;
        } else if (arrPwd[a].match(/[0-9]/g)) {
          if (a > 0 && a < (arrPwdLen - 1)) {
            nMidChar++;
          }
          if (nTmpNumber !== '') {
            if (Number(nTmpNumber + 1) === a) {
              nConsecNumber++;
              nConsecCharType++;
            }
          }
          nTmpNumber = a.toString();
          nNumber++;
        } else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) {
          if (a > 0 && a < (arrPwdLen - 1)) {
            nMidChar++;
          }
          if (nTmpSymbol !== '') {
            if (Number(nTmpSymbol + 1) === a) {
              nConsecSymbol++;
              nConsecCharType++;
            }
          }
          nTmpSymbol = a.toString();
          nSymbol++;
        }
        let bCharExists = false;
        for (let b = 0; b < arrPwdLen; b++) {
          if (arrPwd[a] === arrPwd[b] && a !== b) { /* repeat character exists */
            bCharExists = true;
            nRepInc += Math.abs(arrPwdLen / (b - a));
          }
        }
        if (bCharExists) {
          nRepChar++;
          nUnqChar = arrPwdLen - nRepChar;
          nRepInc = (nUnqChar) ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
        }
      }

      /* Check for sequential alpha string patterns (forward and reverse) */
      for (let s = 0; s < 23; s++) {
        const sFwd = sAlphas.substring(s, Number(s + 3));
        const sRev = this.strReverse(sFwd);
        if (pwd.toLowerCase().indexOf(sFwd) !== -1 || pwd.toLowerCase().indexOf(sRev) !== -1) {
          nSeqAlpha++;
          nSeqChar++;
        }
      }

      for (let s = 0; s < 8; s++) {
        const sFwd = sNumerics.substring(s, Number(s + 3));
        const sRev = this.strReverse(sFwd);
        if (pwd.toLowerCase().indexOf(sFwd) !== -1 || pwd.toLowerCase().indexOf(sRev) !== -1) {
          nSeqNumber++;
          nSeqChar++;
        }
      }

      for (let s = 0; s < 8; s++) {
        const sFwd = sSymbols.substring(s, Number(s + 3));
        const sRev = this.strReverse(sFwd);
        if (pwd.toLowerCase().indexOf(sFwd) !== -1 || pwd.toLowerCase().indexOf(sRev) !== -1) {
          nSeqSymbol++;
          nSeqChar++;
        }
      }

      if (nAlphaUC > 0 && nAlphaUC < nLength) {
        nScore = Number(nScore + ((nLength - nAlphaUC) * 2));
        sAlphaUC = '+ ' + Number((nLength - nAlphaUC) * 2);
      }
      if (nAlphaLC > 0 && nAlphaLC < nLength) {
        nScore = Number(nScore + ((nLength - nAlphaLC) * 2));
        sAlphaLC = '+ ' + Number((nLength - nAlphaLC) * 2);
      }
      if (nNumber > 0 && nNumber < nLength) {
        nScore = Number(nScore + (nNumber * nMultNumber));
        sNumber = '+ ' + Number(nNumber * nMultNumber);
      }
      if (nSymbol > 0) {
        nScore = Number(nScore + (nSymbol * nMultSymbol));
        sSymbol = '+ ' + Number(nSymbol * nMultSymbol);
      }
      if (nMidChar > 0) {
        nScore = Number(nScore + (nMidChar * nMultMidChar));
        sMidChar = '+ ' + Number(nMidChar * nMultMidChar);
      }

      if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
        nScore = Number(nScore - nLength);
        nAlphasOnly = nLength;
        sAlphasOnly = '- ' + nLength;
      }
      if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
        nScore = Number(nScore - nLength);
        nNumbersOnly = nLength;
        sNumbersOnly = '- ' + nLength;
      }
      if (nRepChar > 0) {  // Same character exists more than once
        nScore = Number(nScore - nRepInc);
        sRepChar = '- ' + nRepInc;
      }
      if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
        nScore = Number(nScore - (nConsecAlphaUC * nMultConsecAlphaUC));
        sConsecAlphaUC = '- ' + Number(nConsecAlphaUC * nMultConsecAlphaUC);
      }
      if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
        nScore = Number(nScore - (nConsecAlphaLC * nMultConsecAlphaLC));
        sConsecAlphaLC = '- ' + Number(nConsecAlphaLC * nMultConsecAlphaLC);
      }
      if (nConsecNumber > 0) {  // Consecutive Numbers exist
        nScore = Number(nScore - (nConsecNumber * nMultConsecNumber));
        sConsecNumber = '- ' + Number(nConsecNumber * nMultConsecNumber);
      }
      if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
        nScore = Number(nScore - (nSeqAlpha * nMultSeqAlpha));
        sSeqAlpha = '- ' + Number(nSeqAlpha * nMultSeqAlpha);
      }
      if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
        nScore = Number(nScore - (nSeqNumber * nMultSeqNumber));
        sSeqNumber = '- ' + Number(nSeqNumber * nMultSeqNumber);
      }
      if (nSeqSymbol > 0) {  // Sequential symbol strings exist (3 characters or more)
        nScore = Number(nScore - (nSeqSymbol * nMultSeqSymbol));
        sSeqSymbol = '- ' + Number(nSeqSymbol * nMultSeqSymbol);
      }

      let arrChars = [nLength, nAlphaUC, nAlphaLC, nNumber, nSymbol];
      let arrCharsIds = ['nLength', 'nAlphaUC', 'nAlphaLC', 'nNumber', 'nSymbol'];
      let arrCharsLen = arrChars.length;
      let minVal;
      for (let c = 0; c < arrCharsLen; c++) {
        // let oImg = $('div_' + arrCharsIds[c]);
        // let oBonus = $(arrCharsIds[c] + 'Bonus');
        // $(arrCharsIds[c]).innerHTML = arrChars[c];
        if (arrCharsIds[c] === 'nLength') {
          minVal = Number(nMinPwdLen - 1);
        } else {
          minVal = 0;
        }
        if (arrChars[c] === Number(minVal + 1)) {
          nReqChar++;
        } else if (arrChars[c] > Number(minVal + 1)) {
          nReqChar++;
        }
      }
      nRequirements = nReqChar;
      let nMinReqChars;
      if (pwd.length >= nMinPwdLen) {
        nMinReqChars = 3;
      } else {
        nMinReqChars = 4;
      }
      if (nRequirements > nMinReqChars) {  // One or more required characters exist
        nScore = Number(nScore + (nRequirements * 2));
      }

      arrChars = [nMidChar, nRequirements];
      arrCharsIds = ['nMidChar', 'nRequirements'];
      arrCharsLen = arrChars.length;
      for (let c = 0; c < arrCharsLen; c++) {
        if (arrCharsIds[c] === 'nRequirements') {
          minVal = nMinReqChars;
        } else {
          minVal = 0;
        }
      }

      arrChars = [nAlphasOnly, nNumbersOnly, nRepChar, nConsecAlphaUC, nConsecAlphaLC, nConsecNumber, nSeqAlpha, nSeqNumber, nSeqSymbol];
      arrCharsIds = ['nAlphasOnly', 'nNumbersOnly', 'nRepChar', 'nConsecAlphaUC', 'nConsecAlphaLC', 'nConsecNumber', 'nSeqAlpha', 'nSeqNumber', 'nSeqSymbol'];
      arrCharsLen = arrChars.length;
      for (let c = 0; c < arrCharsLen; c++) {
        // const oImg = $('div_' + arrCharsIds[c]);
        // const oBonus = $(arrCharsIds[c] + 'Bonus');
        // $(arrCharsIds[c]).innerHTML = arrChars[c];
        if (arrChars[c] > 0) {
          // oImg.className = 'warn';
          // oBonus.parentNode.className = 'warn';
        } else {
          // oImg.className = 'pass';
          // oBonus.parentNode.className = 'pass';
        }
      }

      if (nScore > 100) {
        nScore = 100;
      } else if (nScore < 0) {
        nScore = 0;
      }

      if (nScore >= 0 && nScore < 20) {
        sComplexity = 'خیلی ضعیف';
        oScorebar.style.backgroundColor = 'red';
      } else if (nScore >= 20 && nScore < 40) {
        oScorebar.style.backgroundColor = '#ff8a8a';
        sComplexity = 'ضعیف';
      } else if (nScore >= 40 && nScore < 60) {
        oScorebar.style.backgroundColor = 'silver';
        sComplexity = 'خوب';
      } else if (nScore >= 60 && nScore < 80) {
        oScorebar.style.backgroundColor = '#0fd41c';
        sComplexity = 'قوی';
      } else if (nScore >= 80 && nScore <= 100) {
        oScorebar.style.backgroundColor = 'green';
        sComplexity = 'خیلی قوی';
      }

      oScore.innerHTML = nScore + '%';
      oComplexity.innerHTML = sComplexity;
    } else {
      this.initPwdChk();
      oScore.innerHTML = nScore + '%';
      oComplexity.innerHTML = sComplexity;
    }
  }

  strReverse(str) {
    let newstring = '';
    for (let s = 0; s < str.length; s++) {
      newstring = str.charAt(s) + newstring;
    }
    return newstring;
  }

  initPwdChk() {
    this.scorebar.nativeElement.style.backgroundPosition = '0';
  }

}
