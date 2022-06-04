import {wordlist as cet4Wordlist} from "../data/wordlists/cet4"
import {wordlist as cet6Wordlist} from "../data/wordlists/cet6"
import {wordlist as gmatWordlist} from "../data/wordlists/gmat"
import {wordlist as greWordlist} from "../data/wordlists/gre"
import {wordlist as npeeWordlist} from "../data/wordlists/npee"
import {wordlist as oeltsWordlist} from "../data/wordlists/oelts"
import {wordlist as satWordlist} from "../data/wordlists/sat"
import {wordlist as tem4Wordlist} from "../data/wordlists/tem4"
import {wordlist as tem8Wordlist} from "../data/wordlists/tem8"
import {wordlist as tofelWordlist} from "../data/wordlists/tofel"

const wordBookDataMap: Map<string,Array<WordData>> = new Map([
  ["cet4",cet4Wordlist],
  ["cet6",cet6Wordlist],
  ["tem4",tem4Wordlist],
  ["tem8",tem8Wordlist],
  ["npee",npeeWordlist],
  ["tofel",tofelWordlist],
  ["oelts",oeltsWordlist],
  ["sat",satWordlist],
  ["gre",greWordlist],
  ["gmat",gmatWordlist],
])

export const wordBookMap = {
  "cet4":"四级单词",
  "cet6":"六级单词",
  "tem4": "专四单词",
  "tem8": "专八单词",
  "npee":"考研单词",
  "tofel":"托福单词",
  "oelts":"雅思单词",
  "sat":"SAT单词",
  "gre":"GRE单词",
  "gmat":"GMAT单词",
}

export interface WordData{
  content: string,
  meaning: string
}

// 带有固定数量的错误解释的单词数据
export interface ShuffledWordData{
  content: string,
  anwserCollection: Array<string>,
  correctAnswerPosition: number
}

// 单词集合
// 你总不能一次性把所有单词都塞进 globalData 里面吧？
export class WordDataSet{
  data: Array<WordData>;
  constructor(data: Array<WordData>){
    this.data = data;
  }

  /**
   * Roll 一个带有固定数量的随机错误解释的单词数据出来
   * @param serial 该单词在单词集里面的位置
   * @param size 包含答案词条的数量，包括正确答案
   */
  public roll(serial: number,size: number): ShuffledWordData{
    let anwsers: Array<string> = [this.data[serial]["meaning"]]
    let a = 1;
    while(a<size){
      const randomElement: WordData = this.data[Math.floor(Math.random() *  this.data.length)];
      if(this.data.indexOf(randomElement)!=serial){
        if(anwsers.indexOf(randomElement["meaning"])==-1){
          anwsers.push(randomElement["meaning"]);
          a++;
        }
      }
    }
    anwsers = shuffleAnswer(anwsers)
    return {
      content: this.data[serial]["content"],
      anwserCollection: anwsers,
      correctAnswerPosition: anwsers.indexOf(this.data[serial]["meaning"])
    };
  }
  
}

// 创建固定大小的随机单词集
export function createWordDataSet(type: string, size: number): WordDataSet| null{
  let datas: Array<WordData> = [];
  const temp: Array<WordData> | undefined = wordBookDataMap.get(type);
  if(temp==undefined){
    return null
  }
  let a = 0;
  while(a<size){
    const randomElement = temp[Math.floor(Math.random() * temp.length)];
    if(datas.indexOf(randomElement)==-1){
      a = datas.push(randomElement)
    }
  }
  return new WordDataSet(datas);
}


function shuffleAnswer(array: Array<string>): Array<string> {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}